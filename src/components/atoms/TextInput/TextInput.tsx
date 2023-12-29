/*===================================================================
=       TEXTINPUT MJB COMPOONENT                         =
====================================================================*/
/**
 * UI Compoenent for Text Input My Joule Box
 */

import React, { useEffect, useRef, useState } from 'react'
import { View,TextInput as TextInputRaw, TextInputProps, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import Animated, { Easing, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';


//======TYPES==========

export interface MJBTextInputProps extends TextInputProps{
  haveError?: boolean | undefined
  notAvoidKeyboard?: boolean | undefined,
}


/**
 * TextInput MyJouleBoxStyle
 * @param props 
 * @returns 
 */
function TextInput({placeholder, style,value, numberOfLines, haveError, onFocus, onBlur, notAvoidKeyboard, ...otherProps}: MJBTextInputProps ) {

  const [isfocus, setIsFocus] =useState(false)
  const [isAvoidKeyboard, setAvoidKeyboard] = useState(false)

  const {theme: {color, fontFamily}} = useThemeMJB()

  //Annimation
  const labelTopPosition= useSharedValue(value ? -35:0);
  const fontSizeLabel = useSharedValue(value? 13: 15);
  const placeLabelUp = () => {
    labelTopPosition.value = withTiming(-35, {
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    })
    fontSizeLabel.value = withTiming(13, {
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    })
  }

  useEffect(() => {
    if(value){
      placeLabelUp();
    }

  },[value])
  const placeholderDown = () => {
    labelTopPosition.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    })
    fontSizeLabel.value = withTiming(15, {
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    })
  }


//COLOR
const colorError = color.otherColor.red.dark
const colorOnfocus = color.primary.darker


 const styles = StyleSheet.create({
  ['text-input']:{

    

   
  },
  ['text-input__placeholder-text-container']:{
      
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 15,
      height: 50,
      
      justifyContent: 'center',
      
  },
  ['text-input__placeholder-text-container__placeholder-text']: {

      fontFamily: fontFamily.primary.regular,
      color: !haveError ?(!isfocus?'#000000':colorOnfocus  ) : colorError ,

  },

  ['text-input__input']: {
      minHeight:50,
      fontFamily: fontFamily.primary.regular,
      fontSize: 15,
      color: !haveError ? (!isfocus?'#000000':colorOnfocus  ): colorError ,
      
      paddingTop:(numberOfLines ? 20: 11),
      paddingVertical:(numberOfLines ? 20: 11),
      paddingLeft: 25,
      paddingRight: 25,
      minWidth:300,

      borderColor: !haveError ? (!isfocus?color.otherColor.gray.normal: colorOnfocus  ): colorError ,
      borderWidth: 1,
      borderRadius:20,
  }
})

  return (
    <KeyboardAvoidingView style={[styles['text-input'], style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={isAvoidKeyboard}
    >
      <Animated.View style={[styles ['text-input__placeholder-text-container'],{
          
          transform: [{translateY:  labelTopPosition}]
      }]
      } ><Animated.Text style={[styles['text-input__placeholder-text-container__placeholder-text'], {
            
          fontSize: fontSizeLabel
      }]}>{placeholder}
      
      </Animated.Text>
      </Animated.View>
        <TextInputRaw {...otherProps} style={styles['text-input__input']}
         value={value}
          onFocus={(e) => {
            setIsFocus(true);
            if(!notAvoidKeyboard){
              setAvoidKeyboard(true)
            }
            placeLabelUp()
            if(onFocus){
              onFocus(e);
            }


          }}
          onBlur={(e) => { 
            setIsFocus(false)
            setAvoidKeyboard(false)
            if(!value){
              placeholderDown()
            }
            if(onBlur){
              onBlur(e);
            }
          }}
          numberOfLines={numberOfLines}
          />
    </KeyboardAvoidingView>
  )
}

export default TextInput
