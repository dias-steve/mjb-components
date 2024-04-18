import { View, Text , StyleSheet, Pressable} from 'react-native'
import React, { FC } from 'react'

import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider'
export interface ButtonItemPropsMJB {

    title: string;
    onPress?: () => void;
    IconRenderRight?: FC;
    color?: string;
    fontSize?: number;
}
export interface MultiButtonPropsMJB {
    buttonsList: ButtonItemPropsMJB[];
}
/**
 * MultiButton
 * 
 * Displays a list of buttons
 * @param param0 
 * @returns 
 */
export default function MultiButtonMjB({buttonsList}: MultiButtonPropsMJB) {
    const {theme: {color, fontFamily}} = useThemeMJB()

    const styles : any = StyleSheet.create({
        ['separator']: {
            height: 1,
            backgroundColor: 'black',
            opacity: 0.2,

        },
        ['multi-btn']:{
            backgroundColor: color.otherColor.gray.light,
            padding: 20,
            paddingHorizontal: 30,
            borderRadius: 25,
        }
    })

  return (
    <View style={styles['multi-btn']}>
        {
            buttonsList.map((button, index) => (
                <>
                {index !== 0 && <View style={styles['separator']}/>}
                    <ButtonItemMJB key={index} {...button} />
                </>
            ))
        }
    </View>
  )
}

export const ButtonItemMJB = ({title, onPress, IconRenderRight, color, fontSize}: ButtonItemPropsMJB) => {
        const {theme: {color : colorTheme, fontFamily}} = useThemeMJB()
    const styles : any = StyleSheet.create({

        ['button']: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: 40,
            alignItems: 'center',
            padding:10
        },
        ['button__title']: {
            fontSize: fontSize || 17,
            fontFamily: fontFamily.secondary.regular,
            color: color ||colorTheme.secondary.normal,
        },
   
    })
    return (
        <Pressable style={styles['button']} onPress={onPress}>
            <Text  style={styles['button__title']} >{title}</Text>
            {
                IconRenderRight && <IconRenderRight />
            }
        
        </Pressable>
    )
}

