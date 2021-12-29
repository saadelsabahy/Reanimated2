import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import {
	PinchGestureHandler,
	PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

// Credit to Mariana Ibanez https://unsplash.com/photos/NJ8Z8Y_xUKc
export const imageUri =
	'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get('window');

export default function PinchImage() {
	const scale = useSharedValue(1);
	const pointX = useSharedValue(0);
	const pointY = useSharedValue(0);
	const pinchHandler =
		useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
			onActive: (e) => {
				scale.value = e.scale;
				pointX.value = e.focalX;
				pointY.value = e.focalY;
			},
			onEnd: () => {
				scale.value = withTiming(1);
			},
		});
	const reAnimatedImageStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: pointX.value },
				{ translateY: pointY.value },
				{ translateX: -width / 2 },
				{ translateY: -height / 2 },
				{ scale: scale.value },
				{ translateX: -pointX.value },
				{ translateY: -pointY.value },
				{ translateX: width / 2 },
				{ translateY: height / 2 },
			],
		};
	});
	const reAnimatedPointStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: pointX.value },
				{ translateY: pointY.value },
			],
		};
	});
	return (
		<PinchGestureHandler onGestureEvent={pinchHandler}>
			<Animated.View style={{ flex: 1 }}>
				<AnimatedImage
					style={[{ flex: 1 }, reAnimatedImageStyle]}
					source={{ uri: imageUri }}
				/>
				<Animated.View style={[styles.point, reAnimatedPointStyle]} />
			</Animated.View>
		</PinchGestureHandler>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	point: {
		...StyleSheet.absoluteFillObject,
		width: 20,
		height: 20,
		backgroundColor: 'blue',
		borderRadius: 10,
	},
});
