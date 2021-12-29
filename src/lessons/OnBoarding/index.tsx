import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import Page from './components/Page';

interface Props {}
const TEXT = ['How', 'are', 'you', 'mobile', 'devs'];
const OnBoarding = (props: Props) => {
	const translateX = useSharedValue(0);
	const onScrollEvent = useAnimatedScrollHandler(
		{
			onScroll: (e) => {
				translateX.value = e.contentOffset.x;
			},
		},
		[]
	);
	return (
		<Animated.ScrollView
			horizontal
			scrollEventThrottle={16}
			pagingEnabled
			onScroll={onScrollEvent}
		>
			{TEXT.map((item, index) => {
				return (
					<Page
						key={`${index}`}
						title={item}
						index={index}
						translateX={translateX}
					/>
				);
			})}
		</Animated.ScrollView>
	);
};

export default OnBoarding;

const styles = StyleSheet.create({});
