import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	cancelAnimation,
	useAnimatedGestureHandler,
	useDerivedValue,
	useSharedValue,
	withDecay,
} from 'react-native-reanimated';
import { CIRCLE_SIZE } from '../ColorPicker';
import PanPage, { PAGE_WIDTH } from './PanPage';

interface Props {}
type ContextType = {
	translateX: number;
};
const TEXT = ['hello', 'react', 'native', 'developers'];
const LAST_PAGE_OFFSET = PAGE_WIDTH - CIRCLE_SIZE;
const PanGestureOnBoarding = (props: Props) => {
	const translateX = useSharedValue(0);

	const clampedTranslateX = useDerivedValue(() => {
		return Math.max(Math.min(translateX.value, 0), -LAST_PAGE_OFFSET);
	});
	const onGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (_, context) => {
			context.translateX = clampedTranslateX.value;
			cancelAnimation(translateX);
		},
		onActive: (e, context) => {
			translateX.value = e.translationX + context.translateX;
			console.log(e.translationX);
		},
		onEnd: (e) => {
			translateX.value = withDecay({ velocity: e.velocityX });
		},
	});
	return (
		<View style={{ flex: 1 }}>
			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View style={styles.container}>
					{TEXT.map((item, index) => {
						return (
							<PanPage
								title={item}
								index={index}
								key={`${index}`}
								translateX={clampedTranslateX}
							/>
						);
					})}
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

export default PanGestureOnBoarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
});
