import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TaskItem from './TaskItem';

interface Props {}

const TITLES = [
	'Record the dismissible tutorial 🎥',
	'Leave 👍🏼 to the video',
	'Check YouTube comments',
	'Subscribe to the channel 🚀',
	'Leave a ⭐️ on the GitHub Repo',
];

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));
interface TaskInterface {
	title: string;
	index: number;
}
const BACKGROUND_COLOR = '#FAFBFF';
const SwipeToRemove = (props: Props) => {
	const [tasks, setTasks] = useState(TASKS);
	const scrollRef = useRef(null);
	const onDismiss = useCallback((task: TaskInterface) => {
		setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Tasks</Text>
			<ScrollView ref={scrollRef} style={{ flex: 1 }}>
				{tasks.map((task) => (
					<TaskItem
						simultaneousHandlers={scrollRef}
						key={task.index}
						task={task}
						onDismiss={onDismiss}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
	},
	title: {
		fontSize: 60,
		marginVertical: 20,
		paddingLeft: '5%',
	},
});
export { TaskInterface };
export default SwipeToRemove;
