import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import PickerGradient from './PickerGradient';

interface Props {}
const COLORS = [
	'red',
	'purple',
	'blue',
	'cyan',
	'green',
	'yellow',
	'orange',
	'black',
	'white',
];

const { width } = Dimensions.get('window');

const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.95;
const PICKER_HEIGHT = 40;
export type ColorType = string | number;
const ColorPicker = (props: Props) => {
	const background = useSharedValue<ColorType>(COLORS[0]);
	const reCircleStyle = useAnimatedStyle(() => {
		return { backgroundColor: background.value };
	});
	const onColorChange = (color: ColorType) => {
		'worklet';
		background.value = color;
	};
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Animated.View style={[styles.circle, reCircleStyle]} />
			</View>
			<View style={styles.bottomContainer}>
				<PickerGradient
					colors={COLORS}
					style={styles.pickerGradient}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					onColorChange={onColorChange}
				/>
			</View>
		</View>
	);
};

export default ColorPicker;
export { PICKER_WIDTH, CIRCLE_SIZE, PICKER_HEIGHT };
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topContainer: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
	},
	bottomContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
	},
	pickerGradient: {
		width: PICKER_WIDTH,
		height: PICKER_HEIGHT,
		borderRadius: 20,
	},
});
