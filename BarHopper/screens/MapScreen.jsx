import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

export default function MapScreen() {

	const [region, setRegion] = React.useState({
		latitude: 40.74708623964595,
		longitude: -74.0258037865746
	})

	const [locationInfo, setLocationInfo] = React.useState({
		where: { latitude: null, longitude: null },
		error: null
	})

	Location.installWebGeolocationPolyfill();
	navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, { enableHighAccuracy: true, timeout: 20000 });

	const geoSuccess = (position) => {
		setLocationInfo({ latitude: position.coords.latitude, longitude: position.coords.longitude })
	}
	const geoFailure = (err) => {
		setLocationInfo({ error: err.message })
	}

	var axios = require('axios');

	var config = {
		method: 'get',
		url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar&location=${locationInfo.latitude}%2C${locationInfo.longitude}&radius=100&key=AIzaSyADaQtqQonJgl5UGWltQxWWU9qSYnK1EFM',
		headers: {}
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response));
		})
		.catch(function (error) {
			console.log(error);
		});

	return (



		<View style={{ marginTop: 50, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder='Search'
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details);
				}}
				query={{
					key: '',
					language: 'en',
					components: "country:us",
					types: "establishments",
					radius: 50000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			<MapView style={styles.map}
				region={{
					latitude: 40.74708623964595,
					longitude: -74.0258037865746,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				showsUserLocation={true}
				provider="google" />
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
