/*===================================================================
=     TEXT INPUT PASSWORD                                 =
====================================================================*/

import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInput, { MJBTextInputProps } from '../TextInput/TextInput'
import { Feather } from '@expo/vector-icons';

const TextInputPassword = ({secureTextEntry ,...otherProps}: MJBTextInputProps) => {

    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)

    const styles: any = StyleSheet.create({
      ['input--passsword__eye']:{
          zIndex:2,
          position: 'absolute',
          right: 15,
          top: 15
      },
  })
    const handlePressSecurePassword = () => {
        setIsSecureTextEntry(!isSecureTextEntry)
    }
  return (
    <View style={[styles['input-container'],styles['input--password'] ]}>
    <Pressable onPress={handlePressSecurePassword} style={styles['input--passsword__eye']}>
       {isSecureTextEntry? <Feather name="eye" size={24} color="black" /> :
       <Feather name="eye-off" size={24} color="black" />}
    </Pressable>
    <TextInput secureTextEntry={isSecureTextEntry} {...otherProps} />
</View>
  )
}

export default TextInputPassword

