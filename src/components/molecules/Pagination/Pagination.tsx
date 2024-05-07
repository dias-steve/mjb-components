import { View, Text, Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import React from 'react'


import { AntDesign } from '@expo/vector-icons';
import { useThemeMJB } from '../../../ThemeProvider/ThemeProvider';

export interface PaginationPropsMJB {
    currentPage?: number;
    lastPage?: number;
    linkBase?: string;
    nbBtnToDisplay?: number;
    paramKey?: string;
    setCurrentPage?: (page: number) => void;
    centered?: boolean;
}
export const PaginationMJB = ({
    currentPage,
    lastPage = 0,
    nbBtnToDisplay = 8,
    setCurrentPage,
    centered
}:PaginationPropsMJB) => {



  const styles  = StyleSheet.create({
    ['pagination']: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

})

    if (lastPage <= 1) {
        return <></>;
      }
      const buttonPropsList :PaginationBtnProps[]  = [];
        
      const onClickNext =
        setCurrentPage && currentPage && currentPage < lastPage ? () => setCurrentPage(currentPage + 1) : undefined;
    
      const onClickPrev =
        setCurrentPage && currentPage && currentPage > 1 ? () => setCurrentPage(currentPage - 1) : undefined;
    
      if (currentPage && lastPage) {
        const nbTodisplayDivi = Math.floor(nbBtnToDisplay / 2);
    
        const nbMaxDisplay =
          currentPage +
          nbTodisplayDivi +
          (currentPage - nbTodisplayDivi - 1 < 0
            ? (currentPage - nbTodisplayDivi - 1) * -1
            : 0);
    
        const nbMinDisplay =
          (currentPage || 0) -
          nbTodisplayDivi -
          (currentPage + nbTodisplayDivi > lastPage
            ? currentPage + nbTodisplayDivi - lastPage
            : 0);
    
        for (let i = 1; i <= lastPage; i++) {
          if (nbMinDisplay <= i && nbMaxDisplay >= i) {
            buttonPropsList.push({
              label: i.toString(),
              actived: i === currentPage,
              onClick: setCurrentPage ? () => setCurrentPage(i) : undefined,
            });
          }
        }
      }


      const dynamicStyle: StyleProp<ViewStyle> = {
        justifyContent: centered ? 'center' : "flex-start",
      };
      
  return (
    <View style={[styles['pagination'], dynamicStyle]}>
        {
            <NextPrevBtn isNext={false} onClick={onClickPrev} disabled={!onClickPrev}/>
        }
        {
            buttonPropsList.map((btnProps, index) => (
                <PaginationBtn key={index} label={btnProps.label} actived={btnProps.actived} onClick={btnProps.onClick}/>
            ))
        }
        {
            <NextPrevBtn isNext={true} onClick={onClickNext} disabled={!onClickNext}/>
        }
    </View>
  )
}

const NextPrevBtn = ({isNext, onClick,disabled }:{isNext: boolean, onClick?: () => void, disabled?: boolean}) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();
  const styles  = StyleSheet.create({
    ['pagination-next-prev']:{
        width: 40,
        height:40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },

    ['pagination-next-prev--disable']:{
        opacity: 0,
    }
})
    return (
      <Pressable style={[styles['pagination-next-prev'], disabled && styles['pagination-next-prev--disable']]} onPress={!disabled? onClick : undefined}>
            {
                !isNext && <AntDesign name="left" size={20} color="black" />
            }
            {
                isNext && <AntDesign name="right" size={20} color="black" />
            }
      </Pressable>
    )
}

interface PaginationBtnProps {label: string, actived?: boolean, onClick?: () => void}

const PaginationBtn = ({label, actived, onClick}: PaginationBtnProps) => {
  const {
    theme: { color, fontFamily },
  } = useThemeMJB();
  const styles  = StyleSheet.create({

    ['pagination-btn']: {

        width: 40,
        height:40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    ['pagination-btn__label']: {
        fontFamily: fontFamily.secondary.regular,
        fontSize: 16,
    },
    ['pagination-btn__label--actived']:{
        color: 'white'
    },

    ['pagination-btn--actived']: {
        color: 'white',
        backgroundColor: color.secondary.normal
    },

 
})
    return (
      <Pressable style={[styles['pagination-btn'],actived && styles['pagination-btn--actived']]} onPress={onClick}>
        <Text style={[styles['pagination-btn__label'], actived && styles['pagination-btn__label--actived']]} >{label}</Text>
      </Pressable>
    )
}


export default PaginationMJB

//============ STYLES =============================



