import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import MapView from 'react-native-maps';

export default function MapScreen() {
	return (
		<View style={styles.container}>
			<MapView style={styles.map}
			region={{
				latitude: 42.882004,
				longitude: 74.582748,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421}}
			showsUserLocation={true}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});
