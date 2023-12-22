import  React, { ReactNode } from "react";
import{ Text,  StyleSheet} from "react-native";
import { useThemeMJB } from "../../../ThemeProvider/ThemeProvider";


export default function Title({children, fontSize}: {children?: ReactNode, fontSize?: number}) {

  const {theme: {color, fontFamily}} = useThemeMJB()
    const styles = StyleSheet.create({
        title: {
            fontFamily: fontFamily.primary.medium,
            fontSize: fontSize? fontSize : 35,
        }
    })
  return (
    <Text style={styles.title}>{children}</Text>
  )
}



