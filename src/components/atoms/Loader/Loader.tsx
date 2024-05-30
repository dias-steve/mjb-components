import { View, Text } from 'react-native'
import React from 'react'
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider'
import { ActivityIndicator } from 'react-native-paper';

export interface LoaderPropsMJB {
    color?: string,
    size?: 'small' | 'large' | number
}
export default function LoaderMJB({color: colorSet, size}: LoaderPropsMJB) {
    const {
        theme: { color, fontFamily },
      } = useThemeMJB();
  return (
  
            <ActivityIndicator animating={true} color={colorSet || color.secondary.normal} size={size}/>
    
  )
}