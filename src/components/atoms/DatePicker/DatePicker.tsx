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

export interface DatePickerPropsInput{
    placeholder: string, 
    value: Date | null | undefined,
    setValue: (date: Date) => void,
    minimumDate?: Date,
    maximumDate?: Date,
    colorText?: string,
    mode?: 'date' | 'time' | 'datetime'
    is24Hour?: boolean
    maxWidth?:  DimensionValue ,
    width?: DimensionValue,
    haveError?: boolean | undefined
}

const DatePicker = ( {placeholder, value: date, setValue: setDate, maximumDate, minimumDate, colorText, mode = 'date', is24Hour, maxWidth, width, haveError }: DatePickerPropsInput) => {
   
    const [show, setShow] = useState(false)

    const [text, setText] = useState<string | null>()
    const {theme: {color, fontFamily}} = useThemeMJB()




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
            marginBottom: 4,
            
        },

        ['selector-container__placehoder--error']:{
            color: color.otherColor.red.normal
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
            paddingHorizontal:20,
            display: 'flex',
            justifyContent: 'center'
        },
        ['selector-container__selector__value--error']:{
            color: color.otherColor.red.normal
        },
    
        ['selector-container__selector__value']:{
            fontFamily: fontFamily.primary.regular,
            fontSize: 15,
           
        },

        ['selector-container__selector--error']:{
            borderColor: color.otherColor.red.normal,
            color: color.otherColor.red.normal
        }
    
    })

    useEffect(() => {

        if (date){
            let fDate =dataObjectToString(date)
            let fTime = '' +date.getHours() + ':'+ date.getMinutes().toString().padStart(2, '0')
        
    
    
    
            const dateTimedisplayed = () => {
                switch (mode) {
                    case 'date':
                        return fDate
                    case 'time':
                        return fTime
                    case 'datetime':
                        return fDate + ' ' + fTime
                    default:
                        return fDate
                }
            }
            setText(dateTimedisplayed())
        }else{
            setText(date ?dataObjectToString(date): placeholder)
        }


    },[date])

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
    }
    const showMode = () => {
        setShow(true);
 
    }


  return (
    <>
    <View style={styles['selector-container']}>
    <Text  style={[styles['selector-container__placehoder'], haveError && styles['selector-container__placehoder--error'] ]}>{placeholder}</Text>
    <Pressable style={[styles['selector-container__selector'],  haveError && styles['selector-container__selector--error']]} onPress={() => showMode()}>
        <Text style={[styles['selector-container__selector__value'],  haveError && styles['selector-container__selector__value--error']]}>{text}</Text>
    </Pressable>
    </View>
    {
        show && (
            mode ? 
            <DateTimePicker
       
            minimumDate={minimumDate}
            maximumDate={minimumDate}
            testID='dateTimePicker'
            value={date || new Date}
            mode={mode}
            display='default'
            onChange={onChange}
            textColor={colorText}
        />

            :
            <DateTimePicker
            
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                testID='dateTimePicker'
                value={date || new Date}
                mode={mode}
                is24Hour={is24Hour}
                display='default'
                onChange={onChange}
                textColor={colorText}
      
                
            />
        )
    }
    </>
  )
}

export default DatePicker

