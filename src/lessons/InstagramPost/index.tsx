import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { imageUri } from '../PinchImage';

interface Props {}

const { width, height } = Dimensions.get('window');
const AnimatedICon = Animated.createAnimatedComponent(Ionicons);
const InstagramPost = (props: Props) => {
	const doubleTapRef = useRef();
	const scale = useSharedValue(0);
	const opacity = useSharedValue(1);

	const reHeartStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: Math.max(scale.value, 0) }],
		};
	});

	const reTextStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});
	const onSingleTapPressed = useCallback(() => {
		opacity.value = withTiming(0, undefined, (isFinished) => {
			if (isFinished) {
				opacity.value = withDelay(500, withTiming(1));
			}
		});
		console.log('single');
	}, []);

	const onDoubleTapPressed = useCallback(() => {
		scale.value = withSpring(1, undefined, (isFinished) => {
			if (isFinished) {
				scale.value = withDelay(700, withSpring(0));
			}
		});
		console.log('double');
	}, []);

	return (
		<View style={[styles.container]}>
			<TapGestureHandler
				waitFor={doubleTapRef}
				onActivated={onSingleTapPressed}
			>
				<TapGestureHandler
					maxDelayMs={250}
					ref={doubleTapRef}
					numberOfTaps={2}
					onActivated={onDoubleTapPressed}
				>
					<Animated.View
						style={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<ImageBackground
							resizeMode='cover'
							source={{ uri: imageUri }}
							style={styles.image}
						>
							<AnimatedICon
								name='md-heart'
								size={80}
								color='#ddd'
								style={[styles.icon, reHeartStyle]}
							/>
						</ImageBackground>
						<Animated.Text style={[styles.text, reTextStyle]}>
							😛 😛 😛
						</Animated.Text>
					</Animated.View>
				</TapGestureHandler>
			</TapGestureHandler>
		</View>
	);
};

export default InstagramPost;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width,
		height: height / 2.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 20,
		shadowOpacity: 0.5,
	},
	text: {
		fontSize: 30,
		letterSpacing: 15,
		marginVertical: 10,
	},
});
