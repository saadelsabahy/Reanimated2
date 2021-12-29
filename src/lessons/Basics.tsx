import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
const SIZE = 100;
export default function Basics() {
	const progress = useSharedValue(1);
	const scale = useSharedValue(1);

	const handleRotate = () => {
		'worklet';
		return `${progress.value * 2 * Math.PI}rad`;
	};
	const animatedStyle = useAnimatedStyle(
		() => ({
			opacity: progress.value,
			borderRadius: (progress.value * SIZE) / 2,
			transform: [{ scale: scale.value }, { rotate: handleRotate() }],
		}),
		[]
	);
	useEffect(() => {
		progress.value = withTiming(0.4);
		// scale.value = withSpring(2);
		scale.value = withRepeat(withSpring(2), 3, true);
		return () => {};
	}, []);
	return <Animated.View style={[styles.box, animatedStyle]} />;
}

const styles = StyleSheet.create({
	box: {
		width: SIZE,
		height: SIZE,
		backgroundColor: 'red',
	},
});
