/*===================================================================
=      BUTTOM SHEET  =
====================================================================*/
/**
 * Buttom sheet
 * A buttom sheet transparent 
 * with gesture recognition
 * 
 * 
 */

import { Dimensions, Keyboard, StyleSheet} from 'react-native'
import React, { useCallback, useImperativeHandle } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const MAX_TRANSLATE_Y = 50;

export const DEST_CLOSE = 1000

//=========TYPES =================================
type BottomSheetProps = {  children: React.ReactNode};
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;

}




/**
 * Bottom Sheet
 */
const BottomSheet =React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
    ({children }, ref) => {
    const translateY = useSharedValue(DEST_CLOSE);
    const active = useSharedValue(false);


    const scrollTo = useCallback((destination : number) => {
        'worklet';
        active.value = destination !== DEST_CLOSE


        translateY.value = withSpring(destination,{damping: 50})
  
    },[]);

    const isActive = useCallback(() => {

        return active.value;
    },[])


    useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);

    const context = useSharedValue({y: 0});
    const gesture = Gesture.Pan().onStart((event) => {
      context.value ={ y: translateY.value}
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        //bounderies => we block the slide at the top of the screen
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y )
    }).onEnd(() => {
    
        //To go down or up. No inbetween state
        if(translateY.value > -SCREEN_HEIGHT / 2){
            scrollTo(DEST_CLOSE);
        }else if (translateY.value <= -SCREEN_HEIGHT/20){
            scrollTo(MAX_TRANSLATE_Y)
            translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50})
        }
    });

    const rBottomSheetStyle = useAnimatedStyle(() => {
    
        return {
            transform: [{translateY: translateY.value}]
        };
    })



  return (

    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        
            {children}
         
        </Animated.View>
    </GestureDetector>

  )
})


export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
     
        position:'absolute',
   
        height:SCREEN_HEIGHT,
        width: '100%',
        

        borderRadius:25,
        zIndex: 30,

    },

    line:{
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 10
    }
});

