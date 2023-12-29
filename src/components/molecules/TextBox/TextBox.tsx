/*===================================================================
=       Text Box                  =
====================================================================*/
/**
 * Text box
 */
import { DimensionValue, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeMJB } from "../../../ThemeProvider/ThemeProvider";

export interface TextBoxItemPropsMJB {
  text?: string | number;
  title?: string;
  unitLabel?: string;
  textSize?: number;
  fontColor?: string;
  unitLabelSize?: number;
  titleSize?: number;
}

export interface TextBoxPropsMJB {
  content: TextBoxItemPropsMJB[] | null;
  textSize?: number;
  titleSize?: number;
  colorBackground?: string;
  fontColor?: string;
  isPrimaryColorBackground?: boolean;
  unitLabelSize?: number;
  height?: DimensionValue ;
}

const TextBoxItem = ({
  text,
  title,
  unitLabel,
  textSize,
  titleSize,
  fontColor,
  unitLabelSize
}: TextBoxItemPropsMJB) => {
  const {theme: {color, fontFamily}} = useThemeMJB()
  const styles = StyleSheet.create({
    ['text-box-item'] :{

    },
    ['text-box-item__title'] :{
        fontFamily: fontFamily.secondary.regular,
        color: fontColor? fontColor :color.secondary.normal,
        fontSize:   titleSize ?   titleSize : 12
    },
    ['text-box-item__text-container']:{
        marginTop:5,
        display: 'flex',
        flexDirection: 'row'
    },
    ['text-box-item__text-container__text'] :{
   
        fontFamily: fontFamily.secondary.extraBold,
        color: fontColor? fontColor :color.secondary.normal,
        fontSize:   textSize?   textSize : 24
    },
    ['text-box-item__text-container__unit-label'] :{
        fontFamily: fontFamily.secondary.regular,
        color: fontColor? fontColor :color.secondary.normal,
        fontSize: unitLabelSize? unitLabelSize : 12
    },


  });
  return (
    <View style={styles['text-box-item']}>
  
        {
            title !== undefined &&
            <Text style={styles['text-box-item__title']}>{title}</Text>
        }
        <View style={styles['text-box-item__text-container']}>
        {   
            text !== undefined &&
            <Text style={styles['text-box-item__text-container__text']}>{text}</Text>
        }
        { 
            unitLabel !== undefined &&
            <Text style={styles['text-box-item__text-container__unit-label']}>{unitLabel}</Text>
        }
        </View>
    </View>
  );
};

/**
 * Text Box
 * Display Text in a color box
 * @param param0 
 * @returns 
 */
const TextBox = ({ content, titleSize, unitLabelSize, textSize, fontColor, colorBackground, isPrimaryColorBackground, height }: TextBoxPropsMJB) => {
  const {theme: {color, fontFamily}} = useThemeMJB()
  const styles = StyleSheet.create({
    ['text-box'] : {
        backgroundColor: colorBackground ? colorBackground : (isPrimaryColorBackground ? color.primary.normal: color.otherColor.gray.light),
        padding: 20,
        borderRadius: 24,
        height: height ? height : 'auto'
    }

  });

  if(!content){
    return (
        <View style={styles['text-box']}>
            no content
        </View>
      );
  }
  return (
    <View style={styles['text-box']}>
        {
            content.map((contentItem, index) => {
                const props = {
                    ...contentItem,
                    textSize: textSize ? textSize : contentItem.textSize,
                    fontColor: fontColor ? fontColor : contentItem.fontColor,
                    unitLabelSize:  unitLabelSize ? unitLabelSize : contentItem.unitLabelSize,
                    titleSize : titleSize ? titleSize : contentItem.titleSize,
                }

                return (
                    <View key={index}>
                        <TextBoxItem  {...props}/>
                        {
                            (index !== content.length -1) &&
                                <View style={{height: 15}}/>
                        }
                    </View>
                )
            })
        }
    </View>
  );



};

export default TextBox;
