import { View, Image } from 'react-native';
import {  PanGestureHandler, TapGestureHandler} from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
//---------------------------------------------------

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedImage = Animated.createAnimatedComponent(Image)

export default function EmojiSticker(props) {

              
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scaleImage = useSharedValue(props.imageSize)
  const imageStyle = useAnimatedStyle(()=>{
    return{
        width: withSpring(scaleImage.value),
        height: withSpring(scaleImage.value),
    }
  })
  const onDoubleTap = useAnimatedGestureHandler({
      onActive: () => {
        if(scaleImage.value) scaleImage.value = scaleImage.value * 2
      }
  })
//   const onTripleTap = useAnimatedGestureHandler({
//     onActive: () => {
//       if(scaleImage.value) scaleImage.value = scaleImage.value / 2
//     }
// })

  const onDrag = useAnimatedGestureHandler({
    onStart: (event , context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    }
  })
  const containerStyle = useAnimatedStyle(()=>{
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  })
  
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle,{ top: -350 }]}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <AnimatedImage
                source={props.stickerSource}
                resizeMode="contain"
                style={[imageStyle,{ width: props.imageSize, height: props.imageSize }]}
              />
      </TapGestureHandler>
      
    </AnimatedView>
    </PanGestureHandler>
    
  );
}
