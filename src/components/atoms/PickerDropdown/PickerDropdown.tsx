
import {Picker} from '@react-native-picker/picker';

/*===================================================================
=      DATE PICKER               =
====================================================================*/
/**
 * Date Picker MBJ
 */

import { DimensionValue, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { dataObjectToString } from '../../../utils/dateConverter';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';

export interface PickerPropsInputMJB{
    placeholder?: string, 
    value?: any| null | undefined,
    setValue?: (item: any | null) => void,
    maxWidth?:  DimensionValue ,
    width?: DimensionValue,
    items?: PickerItemMJB[]
}

export interface PickerItemMJB{
    value: string,
    label: string,
    key: string | number

}
export const PickerDropdownMJB  = ( {placeholder, value, maxWidth, width,items, setValue }: PickerPropsInputMJB) => {
   
    const [show, setShow] = useState(false)

    const [text, setText] = useState<string | null>()
    const {theme: {color, fontFamily}} = useThemeMJB()


    const setValuePicked = (key: any) => {
        const valuePicked = items?.filter(item => item.value === key)[0]
        setValue && setValue(valuePicked?.value)
    }


    const styles = StyleSheet.create({
        ['selector-container']:{
            maxWidth: maxWidth,
            width: width,
        },
        ['selector-container__placehoder']:{
            marginTop: -10,
            fontFamily: fontFamily.primary.regular,
            fontSize: 13,
            marginLeft: 15,
            marginBottom: 4
        },
        ['selector-container__selector']:{
            height:50,
     
            fontFamily: fontFamily.primary.regular,
            fontSize: 15,
            color: '#000000',
            minWidth: maxWidth || width ? '100%': 300,
            maxWidth: maxWidth,
            borderColor: color.otherColor.gray.normal,
            borderWidth: 1,
            borderRadius:20,
    
            display: 'flex',
            justifyContent: 'center'
        },
    
        ['selector-container__selector__value']:{
            fontFamily: fontFamily.primary.regular,
            fontSize: 15,
        },
    
    })








  return (

    <View style={styles['selector-container']}>
    <Text  style={styles['selector-container__placehoder']}>{placeholder}</Text>
    <View style={styles['selector-container__selector']}>
     <Picker 
     style={{width: '100%'}}
        placeholder={placeholder} selectedValue={value}   onValueChange={(key, itemIndex) =>
    setValuePicked(key)
  }>
        {
            items?.map((item, index) => {
                return <Picker.Item key={index} label={item.label} value={item.value} />
            })
        }
        </Picker>
    </View>
    </View>
   
  )
}

export default PickerDropdownMJB

