import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './navigation';

import useColorScheme from './hooks/useColorScheme';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import { withAuthenticator } from 'aws-amplify-react-native';

const App = () => {
	const colorScheme = useColorScheme();
	return (
		<>
			{/* <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Open Facebook</button> */}
			<Navigation colorScheme={colorScheme} />
		</>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default withAuthenticator(App);
