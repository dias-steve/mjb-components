/*===================================================================
=       MBJ Button Components                                       =
====================================================================*/
import React from 'react'
import { Pressable, PressableProps, StyleProp, Text, View, ViewStyle, StyleSheet } from 'react-native'


import { FC } from 'react';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';
import { Loader } from '../../..';
export interface ButtonProps extends PressableProps {
  /**
   * Name / Label of the button.
   */
    name: string;
    /**
     * Type of style of buttom
     */
    styleType?: 'primary' |'secondary' | 'tertiary' | 'danger' | 'warning'
    /**
     * Custom styling of the button
     */
    style?:StyleProp<ViewStyle>,
    /**
     * Custom styling of the text 
     */
    textStyle?: StyleProp<ViewStyle>,
    /**
     * Icon Components to display in the button
     */
    IconComponent?: FC

    /**
   * Icon Components to display in the button
   */
    IconComponentRight?: FC

    isLoading?: boolean,

    spaceBetween?: boolean
}
/**
 * Button component MJB
 * @param param0 
 * @returns 
 */
function Button({name, styleType, style, textStyle,IconComponent, disabled, isLoading, IconComponentRight, spaceBetween, ...otherProps}: ButtonProps) {

  const {theme: {color, fontFamily}} = useThemeMJB()


  const styles:any= StyleSheet.create({
    ['container']:{

    },

    ['container--disabled']:{
        opacity: 0.2
    },
    ['container--primary']: {
        backgroundColor: color.primary.normal,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: spaceBetween ? 'space-between' : 'center',
        alignItems: 'center',
        borderRadius: 18,
        maxWidth: 500,
        minWidth:200,
        paddingHorizontal: 20,
    
    },
    ['container--secondary']: {
        backgroundColor: color.otherColor.gray.lighter,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: spaceBetween ? 'space-between' : 'center',
        alignItems: 'center',
        borderRadius: 18,
        maxWidth: 500,
        minWidth:200,
        paddingHorizontal: 20,
    
    },
    ['text']:{
        fontFamily: fontFamily.primary.regular,
        fontSize: 15,
    },
    ['text--primary']: {

    }
})

  const styleClassName = (styleType? styleType : 'primary')
 
  const styleText = StyleSheet.create({
    text: {
      marginLeft: IconComponent ? 15 : 0,
    }
  })

  return (
    <Pressable disabled={disabled || isLoading} {...otherProps} style={[styles['container'],styles['container'+'--'+styleClassName], style, disabled && (styles['container--disabled']) ]}>


     {IconComponent && !isLoading &&
     <View><IconComponent/></View> 
      }
      {!isLoading &&
     <Text style={[styles['text'], styles['text'+'--'+styleClassName], textStyle || {}, styleText.text]}>{name}</Text>
      }

      {isLoading &&

        <Loader size={25} color={color.secondary.normal}/>
      }
      {IconComponentRight && !isLoading &&
      <View><IconComponentRight/></View> 
        }
    </Pressable>
  )



}


export default Button
