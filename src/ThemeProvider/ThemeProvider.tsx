import { View, Text } from 'react-native'
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { ThemeDefault } from './ThemeDefault'
import { InfoModalProvider } from '../components/organism/InfoModalV2/context/infoModalV2Context'



//=========TYPES =================================

export type FontMJB = {
    black: string,
    blackItalic: string,
    regular: string,
    medium: string,
    mediumItalic: string,
    light: string,
    lightItalic: string,
    italic: string,
    semibold: string,
    semiboldItalic: string,
    bold: string,
    boldItalic:string,
    extraBold: string,
    extraBoldItalic: string,
}

export type ColorItemMJB = {
    lighter: string,
    light: string,
    normal: string,
    dark: string,
    darker: string
}

export type ColorThemeMJB = {
    primary: ColorItemMJB,
    secondary: ColorItemMJB,
    otherColor: {
        blue: ColorItemMJB
        gray: ColorItemMJB
        black: ColorItemMJB
        white: ColorItemMJB
        red: ColorItemMJB
        green: ColorItemMJB
        orange: ColorItemMJB
    }
}

export type FontFamilyThemeMJB = {
    primary:FontMJB
    secondary:FontMJB
}

export type ThemeContextMJB = {
    fontFamily: FontFamilyThemeMJB
    color:ColorThemeMJB
}

export type ProviderDataMJB = {
    theme: ThemeContextMJB
}


const ThemeContext = createContext<ProviderDataMJB|null >(null)

export const useThemeMJB = () => {
    const contextData = useContext(ThemeContext)
    if(!contextData){
        throw new Error(`MBJ Components have to be used wrapped in a provider \nPlease use MJB Component module provider`)
    }
    const {theme} = contextData
    return {
        theme: theme,
    }
}


const ThemeProvider = ({children, theme}: {children: ReactNode, theme?: ThemeContextMJB}) => {

    const [themeProvider, setThemeProvider] = useState<ThemeContextMJB>(theme? theme : ThemeDefault)

    const data : ProviderDataMJB  = {
        theme: themeProvider
    }
    return (
        <ThemeContext.Provider value={data}>
            <InfoModalProvider>
                {children}
            </InfoModalProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider