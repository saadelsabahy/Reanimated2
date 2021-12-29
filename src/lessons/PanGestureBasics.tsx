import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface Props {}
type ContextType = {
	translateX: number;
	translateY: number;
};
const BOX_SIZE = 100;
const CIRCLE_Radius = BOX_SIZE;
const PanGestureBasics = (props: Props) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (event, context) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.translateX;
			translateY.value = event.translationY + context.translateY;
		},
		onEnd: () => {
			const distance = Math.sqrt(
				translateX.value ** 2 + translateY.value ** 2
			);
			if (distance < CIRCLE_Radius + BOX_SIZE / 2) {
				translateX.value = withSpring(0);
				translateY.value = withSpring(0);
			}
		},
	});
	const reanimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));
	return (
		<View style={styles.circle}>
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View style={[styles.box, reanimatedStyle]} />
			</PanGestureHandler>
		</View>
	);
};
const styles = StyleSheet.create({
	circle: {
		width: CIRCLE_Radius * 2,
		height: CIRCLE_Radius * 2,
		borderRadius: CIRCLE_Radius,
		borderWidth: 5,
		borderColor: 'rgba(0,0,255,.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		width: BOX_SIZE,
		height: BOX_SIZE,
		backgroundColor: 'rgba(0,0,255,.5)',
		borderRadius: 20,
	},
});

export default PanGestureBasics;
