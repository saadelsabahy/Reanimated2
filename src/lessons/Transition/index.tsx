import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { Button, Card, cards, Cards, StyleGuide } from '../components';

interface Props {}
const { width } = Dimensions.get('window');
const origin = { x: -(width / 2 - StyleGuide.spacing * 2), y: 0 };
const Transition = (props: Props) => {
	const [toggle, setToggle] = useState(false);
	const isToggle = useSharedValue(0);
	const enhancedToggle = useDerivedValue(() => {
		isToggle.value = toggle ? 1 : 0;
		//console.log({ isToggle: isToggle.value });
		return withTiming(isToggle.value, { duration: 1000 });
	}, [toggle]);

	return (
		<View style={styles.container}>
			{cards.slice(0, 3).map((item, index) => {
				const reAnimatedStyle = useAnimatedStyle(() => {
					const rotate = mix(enhancedToggle.value, 0, (index - 1) * 30);
					const translateX =
						origin.x; /* mix(enhancedToggle.value, 0, origin.x) */
					// const translateY = mix(enhancedToggle.value, 0, origin.y);
					return {
						transform: [
							{ translateX },
							{ rotate: `${rotate}deg` },

							{ translateX: -translateX },
						],
					};
				});
				return (
					<Animated.View
						key={`${index}`}
						style={[styles.cardContainer, reAnimatedStyle]}
					>
						<Card card={item} />
					</Animated.View>
				);
			})}

			<Button
				label={toggle ? 'Reset' : 'Start'}
				onPress={() => setToggle((prev) => !prev)}
				primary
			/>
		</View>
	);
};

export default Transition;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		//alignItems: 'center',
	},
	cardContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		padding: StyleGuide.spacing * 4,
	},
});
