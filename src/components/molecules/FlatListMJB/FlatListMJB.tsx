import { ListRenderItem, StyleSheet, View, FlatList, RefreshControl  } from 'react-native'
import React, { ComponentType, FC, JSXElementConstructor, ReactElement, useState } from 'react'


export interface FlatListPropsMJB {
    limit?: number,
  
    filtered?: boolean,
  
    footerGap?: number,
  
    disabledScroll?: boolean,

    data: any[] | undefined | null,

    isLoading?: boolean,

    onPull?: (setRefresh: (isRefreshing: boolean) => void) => void,

    renderItem: ListRenderItem<any>

    ListEmptyComponent: ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined

    ListFooterComponent?: FC

}

const FlatListMJB = ({limit, filtered, footerGap, data, disabledScroll, renderItem,  ListEmptyComponent, onPull, isLoading,ListFooterComponent, ...otherScroll}:FlatListPropsMJB) => {
    const [isRefreshing, setRefreshing] = useState<boolean>(false)
    return (
                <FlatList
                    scrollEnabled={!disabledScroll}
                    data={limit ? data?.slice(0,limit) : data}
                    renderItem={renderItem}
                    ListEmptyComponent={ListEmptyComponent}
                    alwaysBounceVertical
                    showsVerticalScrollIndicator={false}
                    refreshControl={ onPull ? <RefreshControl
                    refreshing={(isRefreshing || isLoading) || false}
                    onRefresh={() => onPull(setRefreshing)}
                />: undefined}
                ListFooterComponent={<>{ListFooterComponent &&<ListFooterComponent/>} <View style={{height: footerGap ? footerGap : 0}}></View></>}
            />
  )
}

export default FlatListMJB

const styles = StyleSheet.create({})