import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Basics from './src/lessons/Basics';
import ColorPicker from './src/lessons/ColorPicker';
import InstagramPost from './src/lessons/InstagramPost';
import OnBoarding from './src/lessons/OnBoarding';
import PanGestureBasics from './src/lessons/PanGestureBasics';
import PanGestureOnBoarding from './src/lessons/PangestureOnBoarding';
import PinchImage from './src/lessons/PinchImage';
import ProgressBar from './src/lessons/ProgressBar';
import SwipeToRemove from './src/lessons/SwipeToRemove';
import Theme from './src/lessons/Theme';

export default function App() {
	return (
		<GestureHandlerRootView style={styles.container}>
			{/* <Basics /> */}
			{/* <PanGestureBasics /> */}
			{/* <OnBoarding /> */}
			{/* <Theme /> */}
			{/* <PinchImage /> */}
			{/* <InstagramPost /> */}
			{/* <PanGestureOnBoarding /> */}
			{/* <ColorPicker /> */}
			{/* <ProgressBar /> */}
			<SwipeToRemove />
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
