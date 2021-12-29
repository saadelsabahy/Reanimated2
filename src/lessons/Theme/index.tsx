import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated';

interface Props {}
const { width, height } = Dimensions.get('window');
const CIRCLE_Radius = width * 0.6;
const COLORS = {
	dark: {
		background: '#1E1E1E',
		circle: '#252525',
		text: '#F8F8F8',
	},
	light: {
		background: '#F8F8F8',
		circle: '#FFF',
		text: '#1E1E1E',
	},
};

const SWITCH_TRACK_COLORS = {
	true: 'rgba(256, 0, 256, 0.2)',
	false: 'rgba(0,0,0,0.1)',
};
type ITheme = 'light' | 'dark';
const Theme = (props: Props) => {
	const [theme, setTheme] = useState<ITheme>('light');
	const progress = useDerivedValue(() => {
		return theme === 'dark' ? withTiming(1) : withTiming(0);
	});

	const reAnimatedContainerStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[COLORS.light.background, COLORS.dark.background]
		);
		return {
			backgroundColor,
		};
	});

	const reAnimatedCircleStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[COLORS.light.circle, COLORS.dark.circle]
		);
		return {
			backgroundColor,
		};
	});

	const reAnimatedTextStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			progress.value,
			[0, 1],
			[COLORS.light.text, COLORS.dark.text]
		);
		return {
			color,
		};
	});
	return (
		<Animated.View style={[styles.container, reAnimatedContainerStyle]}>
			<Animated.Text style={[styles.text, reAnimatedTextStyle]}>
				Theme
			</Animated.Text>
			<Animated.View style={[styles.circle, reAnimatedCircleStyle]}>
				<Switch
					value={theme === 'dark'}
					onValueChange={(toggled) => {
						setTheme(toggled ? 'dark' : 'light');
					}}
					trackColor={SWITCH_TRACK_COLORS}
					thumbColor={'violet'}
				/>
				<Animated.View />
			</Animated.View>
		</Animated.View>
	);
};

export default Theme;

const styles = StyleSheet.create({
	container: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		width: CIRCLE_Radius,
		height: CIRCLE_Radius,
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: CIRCLE_Radius / 2,
		shadowOffset: {
			width: 0,
			height: 20,
		},
		shadowRadius: 10,
		shadowOpacity: 0.1,
		elevation: 8,
	},
	text: {
		fontSize: 70,
		textTransform: 'uppercase',
		fontWeight: '700',
		letterSpacing: 14,
		marginBottom: 35,
	},
});
