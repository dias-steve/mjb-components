/*===================================================================
=       Text Box                  =
====================================================================*/
/**
 * Text box
 */
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC } from "react";
import { useThemeMJB } from "../../../ThemeProvider/ThemeProvider";

//ICONS
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 


export interface TextBoxItemPropsMJB {
  text?: string | number;
  subText?: string | number;
  title?: string;
  unitLabel?: string;
  textSize?: number;
  fontColor?: string;
  unitLabelSize?: number;
  titleSize?: number;
  subTextSize?: number;
  subTextHeightLine?: number;
}

export type StyleButtonTextBoxMJB = "primary" | "secondary" | "tertiary";

export type IconType = "invalid" | "valid" | "error" | "info" | "pending" | "box";

export interface TextBoxPropsMJB {
  content: TextBoxItemPropsMJB[] | null;
  textSize?: number;
  titleSize?: number;
  colorBackground?: string;
  fontColor?: string;
  isPrimaryColorBackground?: boolean;
  unitLabelSize?: number;
  height?: DimensionValue;
  button?: TextBoxButtonPropsMJB[];
  icon?: IconType;
  subTextSize?: number;
  headerTitleLeft?: string;
  headerTitleRight?: string;
  subTextHeightLine?: number;
  IconRight?: FC
}

export interface TextBoxButtonPropsMJB {
  label: string;
  onPress: () => void;
  style?: StyleButtonTextBoxMJB;
  fontColor?: string;
  backgroundColor?: string;
}

const Button = ({
  label,
  onPress,
  style,
  fontColor,
  backgroundColor,
}: TextBoxButtonPropsMJB) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();
  const styles: any = StyleSheet.create({
    ["button"]: {
      borderRadius: 20,
      marginVertical: 10,
      marginRight: 10,
      paddingHorizontal: 20,
    },
    ["button--primary"]: {
      paddingVertical: 10,
    
      backgroundColor: backgroundColor
        ? backgroundColor
        : "rgba(255,255,255,0.8)",
    },
    ["button--secondary"]: {
      paddingVertical: 8,
      borderColor: fontColor ? fontColor : color.secondary.normal,
      borderWidth: 1,
    },
    ["button--tertiary"]: {
      paddingVertical: 10,
    },
    ["button__label"]: {
      color: fontColor ? fontColor : color.secondary.normal,
    },
  });

  const styleBtn: StyleButtonTextBoxMJB = style ? style : "primary";

  return (
    <Pressable
      style={[styles["button"], styles["button--" + styleBtn]]}
      onPress={onPress}
    ><Text style={styles["button__label"]}>{label}</Text></Pressable>
  );
};

const TextBoxItem = ({
  text,
  title,
  unitLabel,
  textSize,
  titleSize,
  fontColor,
  unitLabelSize,
  subTextSize,
  subText,
  subTextHeightLine,

}: TextBoxItemPropsMJB) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();
  const styles = StyleSheet.create({
    ["text-box-item"]: {},
    ["text-box-item__title"]: {
      fontFamily: fontFamily.secondary.regular,
      color: fontColor ? fontColor : color.secondary.normal,
      fontSize: titleSize ? titleSize : 12,
    },
    ["text-box-item__sub-text"]: {
      marginTop: 10,
      fontFamily: fontFamily.secondary.regular,
      fontSize: subTextSize ? subTextSize : 14,
      lineHeight: subTextHeightLine ? subTextHeightLine : 24,
      color: fontColor ? fontColor : color.secondary.normal,
    },
    ["text-box-item__text-container"]: {
      marginTop: 5,
      display: "flex",
      flexDirection: "row",
    },
    ["text-box-item__text-container__text"]: {
      fontFamily: fontFamily.secondary.extraBold,
      color: fontColor ? fontColor : color.secondary.normal,
      fontSize: textSize ? textSize : 24,
    },
    ["text-box-item__text-container__unit-label"]: {
      fontFamily: fontFamily.secondary.regular,
      color: fontColor ? fontColor : color.secondary.normal,
      fontSize: unitLabelSize ? unitLabelSize : 12,
    },
  });
  return (
    <View style={styles["text-box-item"]}>
      {title !== undefined && (
        <Text style={styles["text-box-item__title"]}>{title}</Text>
      )}
      <View style={styles["text-box-item__text-container"]}>
        {text !== undefined && (
          <Text style={styles["text-box-item__text-container__text"]}>
            {text}
          </Text>
        )}
        {unitLabel !== undefined && (
          <Text style={styles["text-box-item__text-container__unit-label"]}>
            {unitLabel}
          </Text>
        )}
      </View>
      {subText !== undefined && (
        <Text style={styles["text-box-item__sub-text"]}>{subText}</Text>
      )}
    </View>
  );
};


const Icon = ({type, color }:{type: IconType, color?: string}) => {

  const {
    theme: { color : colorTheme, fontFamily },
  } = useThemeMJB();
  const colorIcon = color ? color : colorTheme.secondary.normal
  if (type === "valid") {
    return <Ionicons name="checkmark-done-circle-outline" size={30} color={colorIcon} />;
  }
  if (type === "invalid") {
    return<MaterialIcons name="error-outline" size={30} color={colorIcon} />;
  }

  if (type === "pending") {
    return <MaterialIcons name="pending" size={30} color={colorIcon} />
  }

  if (type === "box") {
    return <FontAwesome5 name="box" size={20} color={colorIcon} />;
  }

  if (type === "error") {
    return <Entypo name="circle-with-cross" size={28} color={colorIcon} />;
  }

  if( type === "info"){
    return <AntDesign name="infocirlceo" size={24} color={colorIcon} />
  }

  return <></>;
}
/**
 * Text Box
 * Display Text in a color box
 * @param param0
 * @returns
 */
const TextBox = ({
  content,
  titleSize,
  unitLabelSize,
  textSize,
  fontColor,
  colorBackground,
  isPrimaryColorBackground,
  height,
  subTextSize,
  subTextHeightLine,
  button,
  headerTitleLeft,
  headerTitleRight,
  IconRight,
  icon
}: TextBoxPropsMJB) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();
  const styles = StyleSheet.create({
    ["text-box"]: {
      backgroundColor: colorBackground
        ? colorBackground
        : isPrimaryColorBackground
        ? color.primary.normal
        : color.otherColor.gray.light,
      padding: 20,
      borderRadius: 24,
      height: height ? height : "auto",
    },

    ['text-box__header']:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center'
    },
    ['text-box__header__title']:{
      fontFamily: fontFamily.secondary.light,
      color: fontColor ? fontColor : color.secondary.normal,
      opacity: 0.5
    },
    ['text-box__header__right-container']:{
      display: "flex",
      flexDirection: "row",
      alignItems: 'center'
    },
    ['text-box__right-container__header__icon']:{
      marginLeft: 10
    },
    ["text-box__button-container"]: {
      display: "flex",
      flexDirection: "row",
      justifyContent:'flex-end',
      fontFamily: fontFamily.primary.regular,
    },
  });

  if (!content) {
    return <></>;
  }
  return (
    <View style={styles["text-box"]}>
      { (headerTitleLeft || headerTitleRight) && (
        <View style={styles['text-box__header']}>
          <Text style={styles['text-box__header__title']}>{headerTitleLeft}</Text>
          <View style={styles['text-box__header__right-container']}>
            <Text style={styles['text-box__header__title']}>{headerTitleRight}</Text>
            <View style={styles['text-box__right-container__header__icon']}>
              {
               IconRight ? <IconRight/> : 
               (<>
                {
                  icon && <View ><Icon color={fontColor}type={icon}/></View>
                }
               </>

               )
              }
            </View>
            
          </View>
        </View>
      )}
      {content.map((contentItem, index) => {
        const props = {
          ...contentItem,
          textSize: textSize ? textSize : contentItem.textSize,
          fontColor: fontColor ? fontColor : contentItem.fontColor,
          unitLabelSize: unitLabelSize
            ? unitLabelSize
            : contentItem.unitLabelSize,
          titleSize: titleSize ? titleSize : contentItem.titleSize,
          subTextSize: subTextSize ? subTextSize : contentItem.subTextSize,
          subTextHeightLine: subTextHeightLine
            ? subTextHeightLine
            : contentItem.subTextHeightLine,
        };

        return (
          <View key={index}>
            <TextBoxItem {...props} />
            {index !== content.length - 1 && <View style={{ height: 15 }} />}
          </View>
        )
      })}
      {button && (
        <View style={styles["text-box__button-container"]}>
          {button.map((buttonData, index) => {
            return <Button key={index} {...buttonData} />;
          })}
        </View>
      )}
    </View>
  );
};

export default TextBox;
