/*===================================================================
=      DATE PICKER               =
====================================================================*/
/**
 * Date Picker MBJ
 */

import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
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
}

const DatePicker = ( {placeholder, value: date, setValue: setDate, maximumDate, minimumDate, colorText, mode = 'date', is24Hour }: DatePickerPropsInput) => {
   
    const [show, setShow] = useState(false)

    const [text, setText] = useState<string | null>()
    const {theme: {color, fontFamily}} = useThemeMJB()




    const styles = StyleSheet.create({
        ['selector-container']:{
    
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
            minWidth:300,
            borderColor: color.otherColor.gray.normal,
            borderWidth: 1,
            borderRadius:20,
            paddingHorizontal:20,
            display: 'flex',
            justifyContent: 'center'
        },
    
        ['selector-container__selector__value']:{
            fontFamily: fontFamily.primary.regular,
            fontSize: 15,
        },
    
    })

    useEffect(() => {
        setText(date ?dataObjectToString(date): placeholder)
    },[date])

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        let tempDate = new Date(currentDate);
        let fDate =dataObjectToString(tempDate)
        let fTime = '' +tempDate.getHours() + ':'+ tempDate.getMinutes


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

    }
    const showMode = () => {
        setShow(true);
 
    }


  return (
    <>
    <View style={styles['selector-container']}>
    <Text  style={styles['selector-container__placehoder']}>{placeholder}</Text>
    <Pressable style={styles['selector-container__selector']} onPress={() => showMode()}>
        <Text style={styles['selector-container__selector__value']}>{text}</Text>
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
                maximumDate={minimumDate}
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

