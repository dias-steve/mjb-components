/*===================================================================
=       CARD ROW DRAWER CONTAINER      =
====================================================================*/
/**
 * Container for the card row drawer.
 */

import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';



//===============TYPE========================
export interface InfoItemProps {
    title?: string,
    subtitle?: string,
    fontColor?: string,
    lineThrough?: boolean,

}
export interface NotificationItemProps {
    infoItemList?: InfoItemProps[],
    primaryButtonLabel?: string,
    onPressPrimaryButton?: (handleCloseDrawer?: () => void) => void,
    secondaryButtonLabel?: string,
    onPressSecondaryButton?:(handleCloseDrawer?: () => void)  => void,
}
export interface DrawerContainerCardRowProps  {
    primaryButtonLabel?: string | number,
    onPressPrimaryButton?:(handleCloseDrawer: () => void)  => void,
    secondaryButtonLabel?: string | number,
    onPressSecondaryButton?:(handleCloseDrawer: () => void)  => void,
    notificationList?:  NotificationItemProps[],
    handleCloseDrawer?: () => void;
 }




/**
 * Internal Button component for the card row drawer.
 * @param param0 
 * @returns 
 */
const Button = ({onPress, label, styleType}:{onPress?: () => void, label?:string | number, styleType?: 'primary' | 'secondary' | 'tertiary'}) => {
    const {
        theme: { color, fontFamily },
      } = useThemeMJB();

      const styles : any = StyleSheet.create({
        //==================BTN STYLE====================
        ['btn']:{
            borderRadius: 100,
            paddingHorizontal:20,
            paddingVertical:10,
            display: 'flex',
            alignItems: 'center',
            maxWidth:300
    
        },
        ['btn--primary']:{
            backgroundColor: color.otherColor.white.dark,
        },
        ['btn--secondary']:{
            backgroundColor: color.otherColor.black.dark,
        },
        ['btn--tertiary']:{
            backgroundColor: color.otherColor.black.light,
        },
        ['btn__label']:{
           fontFamily: fontFamily.primary.regular,
           fontSize: 14,
           textTransform:'uppercase'
        },
        ['btn__label--primary']:{
            color: 'black'
        },
        ['btn__label--secondary']:{
            color: 'white',
            fontSize: 12,
            
        },
        ['btn__label--tertiary']:{
            color: 'white',
            fontSize: 12,
        }
    })
    const className = styleType ? styleType : 'primary'
    return (
        <Pressable style={[styles['btn'], styles['btn--'+className]]} onPress={onPress}>
            <Text style={[styles['btn__label'], styles['btn__label--'+className]]}>{label}</Text>
        </Pressable>
    )
}


const InfoItem= ({title, subtitle, fontColor, lineThrough}:InfoItemProps ) => {

    const {
        theme: { color, fontFamily },
      } = useThemeMJB();


      const styles : any = StyleSheet.create({
        //==================Info Item style====================
        ['info-item']:{
    
        },
        ['info-item__title']:{
            fontSize: 15,
            fontFamily: fontFamily.primary.regular,
    
    
      
        },
    
        ['info-item__title--line-through']:{
            textDecorationLine: 'line-through'
        },
        ['info-item__subtitle']:{
            marginTop:3,
            fontSize: 12,
            fontFamily: fontFamily.primary.light,
        },
    
        ['info-item__subtitle--line-through']:{
            textDecorationLine: 'line-through'
        }
    
    })
    const dynamicStyle = StyleSheet.create({
        text: {
            color: fontColor ? fontColor : 'white'
        }
    })
    return (
        <View style={styles['info-item']}>
            <Text style={[styles['info-item__title'],  dynamicStyle.text, lineThrough && styles['info-item__title--line-through']]}>{title}</Text>
            <Text style={[styles['info-item__subtitle'],  dynamicStyle.text, lineThrough && styles['info-item__subtitle--line-through']]}>{subtitle}</Text>
        </View>
    )
}

const NotificationItem = ({infoItemList, primaryButtonLabel, onPressPrimaryButton, onPressSecondaryButton, secondaryButtonLabel}: NotificationItemProps ) => {

    const {
        theme: { color, fontFamily },
      } = useThemeMJB();
      const styles : any = StyleSheet.create({    
        //==================Notification Item style====================
        ['notification-item']:{
            backgroundColor: color.otherColor.black.dark,
            borderRadius: 15,
            paddingHorizontal: 17,
            paddingVertical: 17,
    
        },
        ['notification-item__info-list']:{
            
        },
        ['notification-item__info-list__item']:{
    
        },
        ['notification-item__info-list__item__separator']:{
            backgroundColor: color.otherColor.black.light,
            width:'100%',
            height:2,
            marginVertical: 8,
            borderRadius: 100
        },
        ['notification-item__buttons-container']:{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'flex-end',
             
        },
        ['notification-item__buttons-container__btn']:{
            marginTop:15
        },
    
    
    })
    return (
        <View style={styles['notification-item']}>
            <View style={styles['notification-item__info-list']}>
                {infoItemList &&
                     infoItemList.map((item, index) => (
                    <View style={styles['notification-item__info-list__item']} key={index}>
                        <InfoItem {...item} />
                        {
                            (index !== infoItemList.length - 1 ) &&
                            <View style={styles['notification-item__info-list__item__separator']} />
                        }
                    </View>
                ))}
            </View>
            {(primaryButtonLabel || secondaryButtonLabel)&&
                <View style={styles['notification-item__buttons-container']}>
                 
                    <View style={styles['notification-item__buttons-container__btn']}><Button onPress={onPressSecondaryButton} label={secondaryButtonLabel} styleType='secondary' /></View>
                    <View style={styles['notification-item__buttons-container__btn']}><Button onPress={onPressPrimaryButton} label={primaryButtonLabel} styleType='primary' /></View>
                </View>
            }
        </View>

   
    )
}

/**
 * Drawer Container Card Row
 * Container for the card row drawer.
 * @returns 
 */
export const DrawerContainerCardRow = ({
    primaryButtonLabel,
    onPressPrimaryButton,
    secondaryButtonLabel,
    onPressSecondaryButton,
    notificationList,
    handleCloseDrawer
}:DrawerContainerCardRowProps) => {

    const handleOnPress = (onPress:((handleCloseModal: () => void) => void )| undefined )=> {
        if(onPress){
      
            if(handleCloseDrawer){
                onPress(handleCloseDrawer)
            }else{
                onPress(()=> {})
            }

        }
    }

    const {
        theme: { color, fontFamily },
      } = useThemeMJB();

    const styles : any = StyleSheet.create({
        ['drawer']:{
    
        },
        ['drawer__notification-list']:{
    
        },
        ['drawer__notification-list__notification-item-wrapper']:{
            marginVertical:10,
        },
        ['drawer__btn-container']:{
            marginTop:15,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
    
        },
        ['drawer__btn-container__btn']:{
    
            marginVertical:6
        },
    })

  return (
    <View style={styles['drawer']}>
        { notificationList&&
            <View style={styles['drawer__notification-list']}>
               { notificationList.map((notification, index) => (

                <View key={index} style={styles['drawer__notification-list__notification-item-wrapper']}>
                    <NotificationItem
                        infoItemList={notification.infoItemList}
                        primaryButtonLabel={notification.primaryButtonLabel}
                        secondaryButtonLabel={notification.secondaryButtonLabel}
                        onPressPrimaryButton={
                            () => {
                                handleOnPress(notification.onPressPrimaryButton)
                            }
                            }
                        onPressSecondaryButton={
                            () => {
                                handleOnPress(notification.onPressSecondaryButton)
                            }
                            
                           
                        }
                    />
                </View>
               ))}
            </View>
        }
        {(primaryButtonLabel || secondaryButtonLabel)&&
            <View style={styles['drawer__btn-container']}>
                {primaryButtonLabel &&
                           <View style={styles['drawer__btn-container__btn']}><Button label={primaryButtonLabel} onPress={() =>{handleOnPress(onPressPrimaryButton)}} /></View>
                }
                {secondaryButtonLabel &&
                     <View style={styles['drawer__btn-container__btn']}><Button label={secondaryButtonLabel} onPress={() => { handleOnPress(onPressSecondaryButton)}} styleType='secondary'/></View>
                }
            </View>
        }
    </View>
  )
}

export default DrawerContainerCardRow