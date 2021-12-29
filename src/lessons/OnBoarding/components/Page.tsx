import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SharedValue } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
	index: number;
	title: string;
	translateX: SharedValue<number>;
}
const { width, height } = Dimensions.get('window');
const SIZE = width * 0.7;
const Page = ({ index, title, translateX }: Props) => {
	const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

	const reAnimatedBoxStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			translateX.value,
			inputRange,
			[0, 1, 0],
			Extrapolate.CLAMP
		);
		const borderRadius = interpolate(
			translateX.value,
			inputRange,
			[0, SIZE / 2, 0],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ scale }],
			borderRadius,
		};
	});

	const reAnimatedTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(translateX.value, inputRange, [0, 1, 0]);
		const translateY = interpolate(translateX.value, inputRange, [
			height / 2,
			0,
			-height / 2,
		]);
		return {
			opacity,
			transform: [{ translateY }],
		};
	});
	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: `rgba(0,0,255,0.${index + 2})` },
			]}
		>
			<Animated.View style={[styles.box, reAnimatedBoxStyle]}>
				<Animated.View style={[reAnimatedTextStyle]}>
					<Text style={[styles.text]}>{title}</Text>
				</Animated.View>
			</Animated.View>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		width: SIZE,
		height: SIZE,
		backgroundColor: 'rgba(0,0,255,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 60,
		color: '#fff',
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
});
