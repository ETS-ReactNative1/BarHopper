import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './navigation';

import useColorScheme from './hooks/useColorScheme';

export default function App() {
	const colorScheme = useColorScheme();
	return <Navigation colorScheme={colorScheme} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
