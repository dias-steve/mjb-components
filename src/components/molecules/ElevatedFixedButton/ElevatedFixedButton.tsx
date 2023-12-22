import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button, { ButtonProps } from '../../atoms/Button/Button';


export interface ElevatedFixedButtonProps extends ButtonProps{

}
const ElevatedFixedButton = ({...otherProps}:ElevatedFixedButtonProps ) => {
  return (
    <View style={styles['btn-container']}>
    <Button 
      style= {styles['btn-container__btn']}
    
      {...otherProps}

      />
  </View>
  )
}

export default ElevatedFixedButton

const styles = StyleSheet.create({
    ['btn-container']:{
        position: 'absolute',
        bottom: 30,
        width: '100%',
        display:'flex',
        alignItems: 'center',
        zIndex: 20
    },
    ['btn-container__btn']:{
        shadowColor: 'black',
        elevation: 10,
        shadowOpacity: 0.2,
    }

})