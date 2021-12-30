import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface Props {
	title: string;
	index: number;
	translateX: Animated.SharedValue<number>;
}
const { width: PAGE_WIDTH } = Dimensions.get('window');
const PanPage: React.FC<Props> = ({ title, index, translateX }) => {
	const pageOffset = PAGE_WIDTH * index;
	const reAnimatedStyle = useAnimatedStyle(() => {
		return { transform: [{ translateX: translateX.value + pageOffset }] };
	});
	return (
		<Animated.View
			style={[
				styles.container,
				{
					backgroundColor: `rgba(0,255,0,0.${index + 2})`,
					...StyleSheet.absoluteFillObject,
				},
				reAnimatedStyle,
			]}
		>
			<Text>{title}</Text>
		</Animated.View>
	);
};
export { PAGE_WIDTH };
export default PanPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
