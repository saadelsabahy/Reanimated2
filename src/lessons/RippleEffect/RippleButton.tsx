import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	measure,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	onTap?: () => void;
}

const RippleButton: React.FC<Props> = ({ onTap, children }) => {
	const RippleX = useSharedValue(0);
	const RippleY = useSharedValue(0);
	const opacity = useSharedValue(0);
	const boxRef = useAnimatedRef<View>();
	const width = useSharedValue(0);
	const height = useSharedValue(0);
	const scale = useSharedValue(0);

	const onTapGestureEvent =
		useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
			onStart: (event) => {
				const layout = measure(boxRef);
				console.log(layout);

				RippleX.value = event.x;
				RippleY.value = event.y;
				opacity.value = withTiming(1);
				width.value = layout.width;
				height.value = layout.height;
				scale.value = 0;
				scale.value = withTiming(1, { duration: 1000 });
			},
			onActive: () => {
				if (onTap) runOnJS(onTap)();
			},
			onFinish: () => {
				opacity.value = withDelay(1000, withTiming(0));
			},
		});
	const reCircleStyle = useAnimatedStyle(() => {
		const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
		const translateX = RippleX.value - circleRadius;
		const translateY = RippleY.value - circleRadius;
		return {
			width: circleRadius * 2,
			height: circleRadius * 2,
			borderRadius: circleRadius,
			opacity: opacity.value,
			backgroundColor: 'rgba(0,0,0,0.2)',
			position: 'absolute',
			top: 0,
			left: 0,
			transform: [
				{ translateX },
				{ translateY },
				{
					scale: scale.value,
				},
			],
		};
	});
	return (
		<View ref={boxRef} style={[styles.container]}>
			<TapGestureHandler onGestureEvent={onTapGestureEvent}>
				<Animated.View style={[styles.container, { overflow: 'hidden' }]}>
					<View>{children}</View>
					<Animated.View style={reCircleStyle} />
				</Animated.View>
			</TapGestureHandler>
		</View>
	);
};

export default RippleButton;

const styles = StyleSheet.create({
	container: {
		width: 200,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowOffset: { width: 5, height: 0 },
		shadowRadius: 10,
		elevation: 2,
		backgroundColor: '#fff',
		borderRadius: 10,
	},
});
