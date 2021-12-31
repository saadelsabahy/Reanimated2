import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RippleButton from './RippleButton';

interface Props {}

const RippleOnPress = (props: Props) => {
	return (
		<View style={styles.container}>
			<RippleButton onTap={() => console.log('tap')}>
				<Text>press here</Text>
			</RippleButton>
		</View>
	);
};

export default RippleOnPress;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
