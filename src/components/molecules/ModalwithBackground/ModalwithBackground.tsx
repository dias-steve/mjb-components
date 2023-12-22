/*===================================================================
=     Modal with Background                                        =
====================================================================*/
/**
 * Modal with blured background
 */

import { View, StyleSheet, Modal, ModalProps, Platform} from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

/**
 * Modal with blured background
 * @param param0 
 * @returns 
 */
const  ModalwithBackground = ({visible,onRequestClose,children,  ...otherprops}: ModalProps) =>{
  return (
    <>
      { Platform.OS !== 'ios' && 
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
     >
       <BlurView intensity={30} tint="light" style={styles['bg']}/>
        <View style={styles['bg-color']} />
      </Modal>
    }
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        {...otherprops}
      >

       {children}
      </Modal>
      { (Platform.OS === 'ios' && visible) &&
        <View style={styles['bg-ios']} />
      }
    </>
  )
}

const styles = StyleSheet.create({
  ['bg-ios']:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    height:'100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1
  },
  ['bg-color']:{
    height:'100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 11,
  },
  ['bg']:{
    height:'100%',
    width: '100%',
    zIndex: 10,
  },
  ['modal']:{
    zIndex:20
  }
})

  export default ModalwithBackground