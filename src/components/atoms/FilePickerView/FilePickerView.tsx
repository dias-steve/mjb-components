/*===================================================================
=       FILE PICKER VIEW                =
====================================================================*/
/**
 * View for file picker
 */

import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'



//ICON
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';

//============TYPES==============================
export interface IconFile {
    id: string,
    sourceImage: string | null,
    name: string,
    value: any,
    quantity?: number
}
export interface FilePickerInputView {
    fileList: IconFile[],

    mimeTypeAccepted?: string[],

    addBtnLabel: string,

    label?: string,

    limitNbFiles?: number,

    handleDelete : (filePressed: any) => void,

    handleOpenPicker: () => void,

    limitMessage?: string,

    handleClickFileIcon?: (filePressed: any) => void,

    haveError?: boolean
  }

const FilePickerView = ({fileList, addBtnLabel, label, limitNbFiles, handleOpenPicker, handleDelete, limitMessage, handleClickFileIcon, haveError}:FilePickerInputView ) => {

  const {theme: {color, fontFamily}} = useThemeMJB()



const styles = StyleSheet.create({
  ['file-picker']:{
    
  },
  ['file-picker__label']:{
    marginTop: -10,
    fontFamily: fontFamily.primary.regular,
    fontSize: 13,
    marginLeft: 15,
    marginBottom: 4
  },

  ['file-picker__label--error']:{
    color: color.otherColor.red.dark
  },
  ['file-picker__wrapper']:{
    borderRadius: 25,
    borderWidth: 1,
    borderColor: color.otherColor.gray.normal,
    paddingVertical: 20,
    paddingHorizontal: 20
  },

  ['file-picker__wrapper--error']:{
    borderColor: color.otherColor.red.dark,
  },

  ['file-picker__wrapper__assetlist-container']:{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  ['file-picker__wrapper__assetlist-container__wapper']:{
    width: 255,
  },
  ['file-picker__wrapper__add-btn-container']:{
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },

  ['file-picker__wrapper__add-btn-container__text-limited']:{
    fontFamily: fontFamily.primary.regular,
    fontSize: 12

  },
})

    return (
        <View style={styles['file-picker']}>
          {label &&
            <Text style={[styles['file-picker__label'], haveError && styles['file-picker__label--error']]}>{label}</Text>
          }
          <View style={[styles['file-picker__wrapper'], haveError && styles['file-picker__wrapper--error']]}>
            <View style={styles['file-picker__wrapper__assetlist-container']}>
            { fileList.length > 0 &&
              <View style={styles['file-picker__wrapper__assetlist-container__wapper']}>
                <AssetsList assetsList={fileList} handleDeleteAsset={handleDelete} handleOnPressIcon={handleClickFileIcon}/>
              </View>
            }
            </View>
            <View style={styles['file-picker__wrapper__add-btn-container']}>
            {limitNbFiles && fileList.length >= limitNbFiles ?
              <Text style={styles['file-picker__wrapper__add-btn-container__text-limited']}>{limitMessage ||('Limité à '+limitNbFiles+' fichier'+(limitNbFiles >1 ? 's': ''))}</Text>
              : <AddAssetsButon label={addBtnLabel} handlepress={handleOpenPicker} />
            }
            </View>
          </View>
        </View>
      )
}


/**
 * 
 * @param param0 
 * @returns 
 */
const Thumbnail = ({source, handleDelete, onPress, name, quantity} : {source: string, handleDelete?: () => void, onPress?: () => void, name?: string, quantity?: number | null}) => {

  const {theme: {color, fontFamily}} = useThemeMJB()

  const styles = StyleSheet.create({
    ['thumbnail']: {
      margin: 7,
      backgroundColor: color.otherColor.gray.light,
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ['thumbnail__image']:{
      height: 90,
      width: 70,
      borderRadius: 5,
      zIndex: 1

    },

    ['thumbnail__name']:{
      width: 50,
      position: "absolute",
      zIndex: 0,
      top: 5,
      left: 5
    },

    ['thumbnail__delete-btn']:{
      backgroundColor: 'black',
      position: 'absolute',
      top:0,
      right:0,
      zIndex: 2,
      borderRadius: 50,
      marginTop:-10,
      marginRight: -10,
      padding: 2
    },

    ['thumbnail__quantity']:{
      backgroundColor: 'rgba(0,0,0,0.7)',
      position: 'absolute',
      
      padding: 7,
      zIndex: 2,
      borderRadius: 80,
      minWidth: 35,
    },

    ['thumbnail__quantity__text']:{
      fontFamily: fontFamily.primary.regular,
      color:'white',
      textAlign: 'center',
    }
  })
    return (
      <Pressable 
       style={styles['thumbnail']}
       onPress={onPress}
       >

        { quantity &&
        <View style={styles['thumbnail__quantity']}>
          <Text style={styles['thumbnail__quantity__text']}>{quantity}</Text>
        </View>
        }
        { handleDelete &&
          <Pressable style={styles['thumbnail__delete-btn']}
            onPress={handleDelete}
          >
            <AntDesign name="close" size={20} color="white" />
          </Pressable>
        }
        <Image source={{uri: source}} style={styles['thumbnail__image']}   resizeMode='cover' />

        <Text style={styles['thumbnail__name']}>{String(name).slice(0,20)}...</Text>
      </Pressable>)
  }

  
  const AssetsList = ({assetsList, handleDeleteAsset, handleOnPressIcon}:{assetsList:IconFile[], handleDeleteAsset: (file: any) => void, handleOnPressIcon?: (file: IconFile) => void }) => {
  const {theme: {color, fontFamily}} = useThemeMJB()


const styles = StyleSheet.create({
  ['asset-list']: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10
  },

})
    return(
      <View style={styles['asset-list']}>
      {
        assetsList.map(
          (file, index )=> {
            if(file.sourceImage) return <Thumbnail key={index} source={file.sourceImage} quantity={file.quantity || null} handleDelete={() => {
              handleDeleteAsset(file.value)
            }}
            onPress={() => {
                if(handleOnPressIcon){
                    handleOnPressIcon(file.value)
                }
            }}
            name={file.name}
            />
            return <></>
          }
  
        )
      }
      </View>
    )
  }
  
  const AddAssetsButon = ({label, handlepress}: {label: string, handlepress: () => void}) => {
    const {theme: {color, fontFamily}} = useThemeMJB()

    const styles = StyleSheet.create({    
      ['add-btn']:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: color.otherColor.gray.lighter,
        justifyContent:'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        maxWidth: 250,
      },
    
      ['add-btn__label']:{
        marginLeft: 10
      },
  })
    return (
      <Pressable style={styles['add-btn']} onPress={handlepress}>
        <Feather name="plus" size={22} color="black" />
        <Text style={styles['add-btn__label']}>{label}</Text>
      </Pressable>
    )
  }
export default FilePickerView

