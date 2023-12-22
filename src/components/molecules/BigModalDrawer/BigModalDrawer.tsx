/*===================================================================
=      BIG MODAL DRAWER   =
====================================================================*/
/**
 * Display a modal drawer
 * 
 * 
 */

import { View, Text, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';


//============ TYPE ==================
export interface BigModalDrawerProps {
    handleCloseModal?: () => void,
    children: ReactNode,
    title?: string,
    headerTitle?: string,
    modeLigth?: boolean,
}

/**
 * Big Modal drawer
 * 
 * This component display a modal drawer
 * @param param0 
 * @returns 
 */
export default function BigModalDrawer({handleCloseModal, children, title, headerTitle}: BigModalDrawerProps ) {
    const {theme: {color, fontFamily}} = useThemeMJB()
    //============ STYLES ==================
const styles = StyleSheet.create({
    ['modal-drawer']:{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ['modal-drawer__container']:{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        shadowColor: 'black',
        elevation: 10,
        shadowOpacity: 0.2,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    ['modal-drawer__container__icon-title-container']:{
        width: '100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 25,
        paddingHorizontal: 30
    },
    ['modal-drawer__container__icon-title-container__title-container']:{
        width: '80%'
    },
    ['modal-drawer__container__icon-title-container__title-container__header-title']:{
        fontFamily: fontFamily.primary.light,
        fontSize: 15,
     
        marginBottom: 5
    },
    ['modal-drawer__container__icon-title-container__title-container__title']:{
        fontFamily: fontFamily.primary.regular,
        fontSize: 20,
    },
    ['modal-drawer__container__content']:{
        paddingHorizontal: 30
    },
    ['modal-drawer__line']:{
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10
    }
})
  return (
    <View style={styles['modal-drawer']}>
      
        <View style={styles['modal-drawer__container']}>
        <View style={styles['modal-drawer__line']}/>
            <View style={styles['modal-drawer__container__icon-title-container']}>
                <View style={styles['modal-drawer__container__icon-title-container__title-container']}>
                    { headerTitle &&
                        <Text style={styles['modal-drawer__container__icon-title-container__title-container__header-title']}>{headerTitle}</Text>
                    }
                    <Text style={styles['modal-drawer__container__icon-title-container__title-container__title']}>{title}</Text>
                </View>
                {handleCloseModal &&
                    <AntDesign onPress={handleCloseModal}name="close" size={24} color="#848484" />
                }
            </View>
            <View style={styles['modal-drawer__container__content']}>
            {children}
            </View>
        </View>
    </View>
  )
}


