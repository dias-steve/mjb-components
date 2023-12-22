/*===================================================================
=       FILE UPLOADER INPUT       =
====================================================================*/
/**
 * File Uploader Input
 */


import * as DocumentPicker from 'expo-document-picker';
import { View, Text, Pressable, StyleSheet, Image} from 'react-native'
import React, { useState } from 'react'

//ICON
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FilePickerView, { IconFile,  } from '../../atoms/FilePickerView/FilePickerView';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';

const checkTypesFileValid = (authorisedMimeTypesList:string[], mimeTypeCurrentFile: string) =>{

  return authorisedMimeTypesList.includes(mimeTypeCurrentFile)
}

//============TYPES==============================

export interface FileUploaderInput {
  assetsList: Assets[],
  setAssetsList: (listAssets:Assets[]) => void,
  mimeTypeAccepted?: string[],
  addBtnLabel: string,
  label?: string

  limitNbFiles?: number

  sizeLimit?: number
}

export interface Assets extends DocumentPicker.DocumentPickerAsset{}


/**
 * FilePikerInput
 * FilePiker
 * @param param0 
 * @returns 
 */
const FilePikerInput = ({assetsList, setAssetsList, mimeTypeAccepted, addBtnLabel, label, limitNbFiles, sizeLimit}:FileUploaderInput ) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();


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
  ['file-picker__wrapper']:{
    borderRadius: 25,
    borderWidth: 1,
    borderColor: color.otherColor.gray.normal,
    paddingVertical: 20,
    paddingHorizontal: 20
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

  }
})

  const addAssets = (assets: Assets[]) => {
    if(limitNbFiles && assetsList.length >= limitNbFiles){
      return
    }

    const newAssetsToAdd = assets.filter(asset => {
      const isInclude= (assetsList.some(item =>{ 
        return item.name+item.size+item.mimeType === asset.name+asset.size+asset.mimeType}))
      return !isInclude
    })
    setAssetsList([...assetsList,...newAssetsToAdd])
  }
  const deleteAssets = (assetToDelete: Assets) => {
    const newAssets = assetsList.filter(asset => asset.uri !== assetToDelete.uri)
    setAssetsList([...newAssets])
  }


    async function openDocumentPicker() {
        try {
          const res :DocumentPicker.DocumentPickerResult
          = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
            multiple: false,
          });
    
        var listDoc = res.assets || []
    
          listDoc.forEach(assets => {
            
            const {name, mimeType, size} = assets
            
            if (mimeTypeAccepted && !checkTypesFileValid(mimeTypeAccepted,mimeType || "not")){

              const listAcceptedStringify = mimeTypeAccepted.reduce((listString, mimeType, index) => {
                const sliptedMineType = String(mimeType).split('/')
                const or = index === mimeTypeAccepted.length -1 ? "ou " : ""
                if(sliptedMineType[1]){
                  return listString+ (listString !== "" ? ", " : " ")+or+"."+sliptedMineType[1].toUpperCase()
                }else{
                  return listString+ (listString !== "" ? ", " : " ")+or+sliptedMineType[0]
                }
              },'')
             throw new Error('Désolé le type de ce fichier est invalid. \n\nVeuillez choisir seulement un fichier de type: \n'+listAcceptedStringify)
            }

          if(sizeLimit && size && size > sizeLimit  ){
            throw new Error("Désolé ce fichier est trop volumineux. \n\nVeuillez choisir un fichier d'un volume de moins de "+(sizeLimit/1000000).toFixed(0)+ 'Mo.')
          }

          });


          //add assets
          if (res.assets){
            addAssets(res.assets)
          }
        } catch (e) {
          const error = e as Error
          alert(error.message)
            console.log(error)
        }
      }

  const convertFileList : IconFile[] =  assetsList.map<IconFile>(asset => ({
      id: asset.uri,
      sourceImage: asset.uri,
      name: asset.name,
      value: asset
  }))

  
  return (
    <>
    <FilePickerView
      label={label}
      limitNbFiles={limitNbFiles}
      fileList={convertFileList}
      handleDelete={deleteAssets}
      handleOpenPicker={openDocumentPicker}
      addBtnLabel={addBtnLabel}
    />
    </>
  )
}

/**
 * 
 * @param param0 
 * @returns 
 */
const Thumbnail = ({source, handleDelete} : {source: string, handleDelete?: () => void}) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();



const styles = StyleSheet.create({


  ['thumbnail']: {
    margin: 7
  },
  ['thumbnail__image']:{
    height: 90,
    width: 70,
    borderRadius: 5
    
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
  }
})
  return (
    <View style={styles['thumbnail']}>
      { handleDelete &&
        <Pressable style={styles['thumbnail__delete-btn']}
          onPress={handleDelete}
        >
          <AntDesign name="close" size={20} color="white" />
        </Pressable>
      }
      <Image source={{uri: source}} style={styles['thumbnail__image']}   resizeMode='cover' />
    </View>)
}


const AssetsList = ({assetsList, handleDeleteAsset}:{assetsList:Assets[], handleDeleteAsset: (uri: string) => void} ) => {

  const {
    theme: { color, fontFamily },
  } = useThemeMJB();



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
        (assets, index )=> {
          const { uri: uriImage} = assets
          if(uriImage) return <Thumbnail key={index} source={uriImage} handleDelete={() => {
            handleDeleteAsset(uriImage)
          }}/>
          return <></>
        }

      )
    }
    </View>
  )
}

const AddAssetsButon = ({label, handlepress}: {label: string, handlepress: () => void}) => {

  const {
    theme: { color, fontFamily },
  } = useThemeMJB();

  const styles = StyleSheet.create({
    ['add-btn']:{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: color.otherColor.gray.lighter,
      justifyContent:'center',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      maxWidth: 250
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
export default FilePikerInput


