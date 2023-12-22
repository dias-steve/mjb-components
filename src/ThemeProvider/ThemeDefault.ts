import { ThemeContextMJB } from "./ThemeProvider"


/**
 * Font Familly
 */
export const fontFamily = {
    primary:{
        extraBold: 'System',
        extraBoldItalic: 'System',
        black: 'System',
        blackItalic: 'System',
        bold: 'System',
        boldItalic: 'System',
        semibold: 'System',
        semiboldItalic: 'System',
        regular: 'System',
        medium: 'System',
        mediumItalic: 'System',
        light: 'System',
        lightItalic: 'System',
        italic: 'System',
    },
    secondary:{
        extraBold: 'System',
        extraBoldItalic: 'System',
        black: 'System',
        blackItalic: 'System',
        bold: 'System',
        boldItalic: 'System',
        semibold: 'System',
        semiboldItalic: 'System',
        regular: 'System',
        medium: 'System',
        mediumItalic: 'System',
        light: 'System',
        lightItalic: 'System',
        italic: 'System',
    }
}
/**
 * Color Palette
 */
export const color = {
    primary:{
        lighter: '#A4DFFF',
        light: '#A4DFFF',
        normal: '#73CEFF',
        dark: '#559EC5',
        darker: '#357090'
    },
    
    secondary:{
        lighter: '#CFDBDF',
        light: '#CFDBDF',
        normal: '#000000',
        dark: '#000000',
        darker: '#000000'
    },

    otherColor: {
        blue: {
            lighter: "#0F7494",
            light: "#0F7494",
            normal: '#0F7494',
            dark: '#1C37C6',
            darker: '#1C37C6',
            
        },
        gray: {
            lighter: '#E9EFF1',
            light: '#F7F9FA',
            normal: '#CFD3D4',
            dark: '#CFDBDF',
            darker: '#CFDBDF',
        },
        black: {
            lighter: '#494949',
            light: '#494949',
            normal: '#343434',
            dark: '#343434',
            darker: '#343434'
        },
        white: {
            lighter: '#FFFFFF',
            light: '#FFFFFF',
            normal: '#FFFFFF',
            dark: '#F3F3F3',
            darker: '#F3F3F3'
        },
        red:{
            lighter: '#F0C5C5',
            light: '#F0C5C5',
            normal: '#a82c21',
            dark: '#a82c21',
            darker: '#a82c21',
        },
        green:{
            lighter: '#D0F0C5',
            light: '#D0F0C5',
            normal: '#649752',
            dark: '#649752',
            darker: '#649752'
        },
        orange: {
            lighter: '#E29500',
            light: '#E29500',
            normal: '#E29500',
            dark: '#E29500',
            darker: '#E29500'
        }
    },
}

 export const ThemeDefault : ThemeContextMJB = {
    fontFamily: fontFamily,
    color: color
}
