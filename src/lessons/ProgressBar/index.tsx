import React from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedProps,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';

interface Props {}
const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const { width, height } = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const ProgressBar = (props: Props) => {
	const progress = useSharedValue(0);

	const progressText = useDerivedValue(() => {
		return `${Math.floor(progress.value * 100)}`;
	});

	const onPress = () => {
		progress.value = withTiming(progress.value !== 0 ? 0 : 1, {
			duration: 2000,
		});
	};
	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
	}));
	return (
		<View style={styles.container}>
			<ReText style={styles.progressText} text={progressText} />
			<Svg style={{ position: 'absolute' }}>
				<Circle
					r={R}
					cx={width / 2}
					cy={height / 2}
					stroke={BACKGROUND_STROKE_COLOR}
					strokeWidth={30}
				/>
				<AnimatedCircle
					r={R}
					cx={width / 2}
					cy={height / 2}
					stroke={STROKE_COLOR}
					strokeDasharray={CIRCLE_LENGTH}
					strokeWidth={15}
					animatedProps={animatedProps}
					strokeLinecap={'round'}
				/>
			</Svg>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.buttonText}>Run</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		position: 'absolute',
		bottom: 80,
		width: width * 0.7,
		height: 60,
		backgroundColor: BACKGROUND_STROKE_COLOR,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	progressText: {
		fontSize: 80,
		color: 'rgba(256,256,256,0.7)',
		width: 200,
		textAlign: 'center',
	},
	buttonText: {
		fontSize: 25,
		color: 'white',
		letterSpacing: 2.0,
	},
});
