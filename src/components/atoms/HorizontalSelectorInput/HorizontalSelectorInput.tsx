/*===================================================================
=       HORIZONTAL SELECTOR INPUT      =
====================================================================*/
/**
 * SELECTOR INPUT
 */
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider'



export  interface  OptionItem<OptionValueType>{
    label: string,
    value: OptionValueType
}

export interface HorizontalSelectorInputProps<OptionValueType> {
    optionsList:  OptionItem<OptionValueType>[]
    label?: string,
    setValue : (value: OptionValueType) => void,
    value: OptionValueType,
    accentColor?: string,
    baseColor?: string
    fontFamilyLabel?: string
    fontFamilyOptions?: string
}

/**
 * 
 * @param param0 
 * @returns 
 */
const HorizontalSelectorInput = ({optionsList, label, baseColor, accentColor, fontFamilyLabel, value, setValue }: HorizontalSelectorInputProps<any>) => {
    const {theme: {color, fontFamily}} = useThemeMJB()



    const getIndex = () => {
        const indexResul = optionsList.reduce<any>((result,option,index) => {
            return {...result,[option.value]: index}
        }, {})
        return indexResul[value]
    }

    const index = getIndex()
    const widthBackground = (100/optionsList.length)
//const margingLeft = useSharedValue(widthBackground*index);
/*
const mouveBackground = () => {
    margingLeft.value = withTiming(-35, {
      duration: 300,
      easing: Easing.inOut(Easing.quad)
    })
}
*/
const styles = StyleSheet.create({
    ['horizontal-selector']:{
     
    },
    ['horizontal-selector__label']:{
        fontSize: 13,
        marginLeft: 15,
        marginBottom: 4,
        fontFamily: fontFamilyLabel||fontFamily.secondary.medium
    },
    ['horizontal-selector__option-container']:{

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: baseColor || 'gray',
        borderRadius: 20

    },
    ['horizontal-selector__option-container__option-active-background']:{
        backgroundColor: accentColor || 'black',
        position: 'absolute',
        height:50,
        width: (widthBackground+'%') as any,
        marginLeft: (widthBackground*index+'%') as any,
        borderRadius: 20
        
    },
    ['option']:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 20,
    },
    ['option__label']:{
        fontFamily: fontFamilyLabel||fontFamily.secondary.medium,
        color: 'black' || 'gray',
    },
    ['option--active']:{
    

    },
    ['option--active__label']:{
        color: 'white',
    },


})


return (
    <View style={styles['horizontal-selector']}>
        { label !== undefined &&
            <Text style={styles['horizontal-selector__label']}>{label}</Text>
        }
        <View style={styles['horizontal-selector__option-container']}>
            <View style={styles['horizontal-selector__option-container__option-active-background']}/>
            {
                optionsList.map((option, index)=> {

                    const isActive = option.value === value
                 
                    return <Pressable key={index} style={[styles['option'], isActive && styles['option--active'] ]}
                                onPress={() => {setValue(option.value)}}
                            >
                            <Text style={[styles['option__label'], isActive && styles['option--active__label']]}>
                                {option.label}
                            </Text>
                        </Pressable>

                })
            }

        </View>
    </View>
)


}

export default HorizontalSelectorInput

