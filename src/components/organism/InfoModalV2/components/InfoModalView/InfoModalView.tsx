/*===================================================================
=       Info Modal View                =
====================================================================*/
/**
 * 
 */

import { View, Text, Pressable, StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { InfoModalViewProps } from '../InfoModal/InfoModalV2' 

import * as Progress from 'react-native-progress';

//ICON 
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Animated, { Easing, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { iconType } from '../../context/infoModalV2Context' 
import { ActivityIndicator } from 'react-native-paper'
import Button from '../../../../atoms/Button/Button'
import { useThemeMJB } from '../../../../../ThemeProvider/ThemeProvider'



export const SendingIcomAnimated = () => {
    const duration = 2000;
    const easing = Easing.inOut(Easing.quad)
    const opacity = useSharedValue(0);
    const slideX = useSharedValue(-20);
    const slideY = useSharedValue(20);
    useEffect(() => {
        opacity.value = withRepeat(withTiming(1, { duration, easing }), -1);
        slideX.value = withRepeat(withTiming(20, { duration, easing }), -1);
        slideY.value = withRepeat(withTiming(-20, { duration, easing }), -1);
    },[])

    return (<Animated.View style={{
        opacity: opacity,
        transform: [{translateX:  slideX }, {translateY:  slideY }]
    }}>
        <FontAwesome name="send" size={50} color="black" />
    </Animated.View >)
}

const iconSlector = (type: iconType ) => {

    switch (type) {
        case 'good':
            return () => <AntDesign name="checkcircleo" size={60} color="black" />
        case 'bad':
            return () => <MaterialIcons name="error-outline" size={60} color="black" />
        case 'question':
            return () => <AntDesign name="questioncircleo" size={60} color="black" />
        case 'neutral':
            return () => <Ionicons name="ios-information-circle-outline" size={60} color="black" />
        case 'sending':
            return () => <SendingIcomAnimated/>
        default: 
            return () => <Ionicons name="ios-information-circle-outline" size={60} color="black" />

    }
}



/**
 * 
 * @param param0 
 * @returns 
 */
const InfoModalView = ({handleClose,
    title,
    contentText,
    buttonLabel,
    iconType,
    noCloseButton,
    progressBarvalue,
    loaderMode,
    onClickBtnAccept,
    onClickBtnCancel,
    buttonAcceptLabel = 'OK', 
    buttonCancelLabel = 'Annuler'}: InfoModalViewProps) => {
    const {
        theme: { color, fontFamily },
      } = useThemeMJB();

      const styles = StyleSheet.create({
        ['modal-info']:{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center'
        },
        ['modal-info__bg']:{
    
        },
        ['modal-info__modal']:{
            backgroundColor: 'white',
            height: 400,
            width: 300,
            zIndex: 100,
            shadowColor: 'black',
            borderRadius:50,
            padding: 50,
            marginBottom: 50,
            elevation: 10,
            shadowOpacity: 0.2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
            
            
            
            
        },
        ['modal-info__modal__icon-container']:{
            marginVertical: 5
        },
        ['modal-info__modal__title']:{
            fontFamily: fontFamily.primary.regular,
            fontSize: 23,
            textAlign: 'center',
            marginVertical: 5,
            lineHeight: 32
        },
        ['modal-info__modal__content-text']:{
            fontFamily: fontFamily.primary.regular,
            fontSize: 15,
            textAlign: 'center',
            lineHeight: 22,
            marginVertical: 5
        },
        ['modal-info__modal__progressbar']:{
    
        },
        ['modal-info__modal__btn-container']:{
            marginVertical: 5
    
        },


        ['modal-info__modal__loader']:{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    const Icon = iconSlector((iconType) as iconType || 'neutral')

    if(loaderMode){
        return (
            <View style={styles['modal-info']}>
                <View style={styles['modal-info__modal']}>               
                    <View style={styles['modal-info__modal__loader']}>
                        <ActivityIndicator animating={true} color={color.secondary.normal} size={60}/>
                    </View>
                </View>
            </View>
        )
    }
  return (
    <View style={styles['modal-info']}>
   
        <View style={styles['modal-info__modal']}>

 
    
            <View  style={styles['modal-info__modal__icon-container']}>
            { iconType === 'sending' ? 
                <SendingIcomAnimated/> : 
                <Icon/>
            }
            </View>
            {
                title &&
                <Text style={styles['modal-info__modal__title']}>{title}</Text>
            }
            {
                 progressBarvalue !== undefined &&
                <View style={styles['modal-info__modal__progressbar']}>
                    <Progress.Bar progress={progressBarvalue} color={color.primary.dark} />
                </View>
            }
            {
                contentText &&
                <Text style={styles['modal-info__modal__content-text']}>{contentText}</Text>
            }

            {
                !noCloseButton && !onClickBtnAccept &&
                <View style={styles['modal-info__modal__btn-container']}>
                    <Button name={buttonLabel || 'OK'} onPress={handleClose}/>
                </View>
            }

            { onClickBtnAccept &&
                <View style={styles['modal-info__modal__btn-container']}>
                    <Button name={buttonAcceptLabel} onPress={() => {onClickBtnAccept({closeModal: handleClose})}}/>
                </View>
            }

            { onClickBtnCancel &&
                <View style={[styles['modal-info__modal__btn-container'], styles['modal-info__modal__btn-container']]}>
                    <Button name={buttonCancelLabel} onPress={() => {onClickBtnCancel({closeModal: handleClose})}} styleType={'secondary'}/>
                </View>
            }

            {
                loaderMode &&
           
                     <View style={styles['modal-info__modal__loader']}>
                        <ActivityIndicator animating={true} color={color.secondary.normal} size={'large'}/>
                    </View>
              
            }


        </View>
    </View>
  )
}

export default InfoModalView