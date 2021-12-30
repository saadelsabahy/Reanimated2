import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	interpolateColor,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { ColorType, PICKER_HEIGHT, PICKER_WIDTH } from '.';
interface Props extends LinearGradientProps {
	onColorChange?: (color: ColorType) => void;
}
type ContextType = { x: number };
const PICKER_CIRCLE_SIZE = 40;
const PickerGradient: React.FC<Props> = ({
	colors,
	style,
	start,
	end,
	onColorChange,
}) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scale = useSharedValue(1);

	const enhancedTranslateX = useDerivedValue(() => {
		return Math.min(
			Math.max(translateX.value, 0),
			PICKER_WIDTH - PICKER_CIRCLE_SIZE
		);
	});

	const rePickerCircleStyle = useAnimatedStyle(() => {
		return {
			//top: translateY.value,
			transform: [
				{ translateX: enhancedTranslateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value },
			],
		};
	});
	const rInternalPickerStyle = useAnimatedStyle(() => {
		const inputRange = colors.map(
			(_, index) => (index / colors.length) * PICKER_WIDTH
		);
		const backgroundColor = interpolateColor(
			enhancedTranslateX.value,
			inputRange,
			colors
		);
		onColorChange?.(backgroundColor);
		return { backgroundColor };
	});
	const onEnd = () => {
		'worklet';
		translateY.value = withSpring(0);
		scale.value = withSpring(1);
	};
	const onGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (_, context) => {
			context.x = enhancedTranslateX.value;
		},
		onActive: (e, context) => {
			translateX.value = e.translationX + context.x;
		},
		onEnd,
	});
	const onTapGestureEvent = useAnimatedGestureHandler<
		TapGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (e, context) => {
			translateY.value = withSpring(-PICKER_HEIGHT);
			scale.value = withSpring(1.2);
			translateX.value = withTiming(e.absoluteX - PICKER_CIRCLE_SIZE);
		},

		onEnd,
	});
	return (
		<PanGestureHandler onGestureEvent={onGestureEvent}>
			<Animated.View>
				<TapGestureHandler onGestureEvent={onTapGestureEvent}>
					<Animated.View style={styles.container}>
						<LinearGradient
							colors={colors}
							style={style}
							start={start}
							end={end}
						/>
						<Animated.View
							style={[styles.pickerCircle, rePickerCircleStyle]}
						>
							<Animated.View
								style={[styles.innerCircle, rInternalPickerStyle]}
							/>
						</Animated.View>
					</Animated.View>
				</TapGestureHandler>
			</Animated.View>
		</PanGestureHandler>
	);
};

export default PickerGradient;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	pickerCircle: {
		position: 'absolute',
		width: PICKER_CIRCLE_SIZE,
		height: PICKER_CIRCLE_SIZE,
		borderRadius: PICKER_CIRCLE_SIZE / 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	innerCircle: {
		width: PICKER_CIRCLE_SIZE / 2,
		height: PICKER_CIRCLE_SIZE / 2,
		borderRadius: PICKER_CIRCLE_SIZE / 4,
		//borderWidth: 1,
		//backgroundColor: 'red',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 1,
	},
});
