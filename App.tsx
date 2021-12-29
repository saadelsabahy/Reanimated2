import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Basics from './src/lessons/Basics';
import InstagramPost from './src/lessons/InstagramPost';
import OnBoarding from './src/lessons/OnBoarding';
import PanGestureBasics from './src/lessons/PanGestureBasics';
import PinchImage from './src/lessons/PinchImage';
import Theme from './src/lessons/Theme';

export default function App() {
	return (
		<GestureHandlerRootView style={styles.container}>
			{/* <Basics /> */}
			{/* <PanGestureBasics /> */}
			{/* <OnBoarding /> */}
			{/* <Theme /> */}
			{/* <PinchImage /> */}
			<InstagramPost />
			<StatusBar style='auto' />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
