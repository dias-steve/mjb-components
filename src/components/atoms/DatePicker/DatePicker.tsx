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
    setValue: (date: Date) => void 
}

const DatePicker = ( {placeholder, value: date, setValue: setDate }: DatePickerPropsInput) => {
   
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState<any>('date')
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
        let fTime = 'Hours: ' +tempDate.getHours() + ' Minutes: '+ tempDate.getMinutes
        setText(fDate)
    }
    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode)
    }
  return (
    <>
    <View style={styles['selector-container']}>
    <Text  style={styles['selector-container__placehoder']}>{placeholder}</Text>
    <Pressable style={styles['selector-container__selector']} onPress={() => showMode('date')}>
        <Text style={styles['selector-container__selector__value']}>{text}</Text>
    </Pressable>
    </View>
    {
        show && (
            <DateTimePicker
                testID='dateTimePicker'
                value={date || new Date}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}
            />
        )
    }
    </>
  )
}

export default DatePicker

