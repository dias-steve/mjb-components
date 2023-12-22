/*===================================================================
=       Number Picker               =
====================================================================*/
/**
 * Number picker
 */

import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 

//TODO TO CHANGE PROPS
//========= TYPE ============

export interface NumberPickerProps{
    value: number;
    setValue: (number: number) => void;
    withTextInput?: boolean,
    max?: number;
    min?: number;
    step?: number;
    accentColor?: string;
    baseColor?: string;
    label?: string,
    fontFamily?:string;
}

const Button = ({isPlus, handleChange, baseColor, accentColor}: {isPlus?: boolean, handleChange: () => void, accentColor: string, baseColor: string}) => {

    const colorStyle =  StyleSheet.create({
        backgroundColor: baseColor as any,
        color: accentColor as any
    })
    return (
        <Pressable style={[styles['button'], colorStyle ]} onPress={handleChange}>

            { isPlus ? 
                <AntDesign name="plus" size={20} color="rgba(0, 0, 0,0.6)" />
                : <AntDesign name="minus" size={20} color="rgba(0, 0, 0, 0.6)" />
            }
        </Pressable>
    )
}


/**
 * Number picker
 * @returns 
 */
const NumberPicker = ({value, setValue, min, max, step, withTextInput, label, baseColor, accentColor, fontFamily }: NumberPickerProps) => {

const fontFamilyValid = fontFamily || '';
const stepCompt = step || 1

const baseColorValid = baseColor || 'gray'
const accentColorValid = accentColor || 'black'


const borderColorStyle=  StyleSheet.create({
    borderColor: baseColor as any,
})

const fontFamilyStyle =  StyleSheet.create({
    fontFamily: fontFamilyValid as any
})


const handlePlus = () => {
    if (max && (value + stepCompt  > max )){
        return;
    }
    setValue(value + stepCompt)
}

const handleLess = () => {
    if (min && (value  - stepCompt  < min)){
        return;
    }
    setValue(value - stepCompt)
}


  return (
    <View style={styles['number-picker']}>
        {label &&
            <Text style={[styles['number-picker__label'], fontFamilyStyle as any]}>{label}</Text>
        }
        <View style={[styles['number-picker__container'],borderColorStyle as any ]}>

            { withTextInput ? 
                <View style={[styles['number-picker__container__value'],styles['number-picker__container__value--text-mode'], fontFamilyStyle as any]}>
                    <Text>{value}Input</Text>
                </View>
            :
                <View style={[styles['number-picker__container__value'],styles['number-picker__container__value--input-mode'], fontFamilyStyle as any]}>
                    <Text>{value}</Text>
                </View>
            }

            <View style={styles['number-picker__container__button-container']}>
                { (!min ||(min && value > min)) &&
                    <View style={[styles['number-picker__container__button-container__button'],styles['number-picker__container__button-container__button--less']]}>
                        <Button
                            handleChange={handleLess}
                            baseColor={baseColorValid}
                            accentColor={accentColorValid}

                        />
                    </View>
                }
                { (!max || (max &&value < max) )&&
                    <View style={[styles['number-picker__container__button-container__button'],styles['number-picker__container__button-container__button--more']]}>
                    <Button
                        handleChange={handlePlus}
                        isPlus
                        baseColor={baseColorValid}
                        accentColor={accentColorValid}
                    />
                    </View>
                }
            </View>
        </View>
    </View>
  )
}

export default NumberPicker

const styles = StyleSheet.create({
    ['number-picker']:{

    },

    ['number-picker__label']:{
        fontSize: 12,
        marginLeft: 15,
        marginBottom: 3

    },

    ['number-picker__container']:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        paddingLeft: 15,
        alignItems: 'center'

    },

    ['number-picker__container__button-container']:{
        display: 'flex',
        flexDirection: 'row',
        marginRight: -5
    },

    ['number-picker__container__button-container__button']:{

    },

    ['number-picker__container__button-container__button--less']:{

    },

    ['number-picker__container__button-container__button--more']:{

    },

    ['number-picker__container__value']:{
        flex: 1,
       
    },

    ['number-picker__container__value--text-mode']:{

    },

    ['number-picker__container__value--input-mode']:{
   
    },

    ['button']:{
        height: 40,
        marginLeft: 5,
        width: 50,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }







})