import React, { createRef, useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
const axios = require('axios');

export default function MapScreen() {
	const [region, setRegion] = React.useState({
		latitude: 40.74708623964595,
		longitude: -74.0258037865746
	});

	const [establishments, setEstablishments] = useState(null);

	const [locationInfo, setLocationInfo] = React.useState({
		where: { latitude: null, longitude: null },
		error: null
	});

	const [data, setData] = React.useState({
		json_string: data,
		error: null
	});

	Location.installWebGeolocationPolyfill();
	navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, {
		enableHighAccuracy: true,
		timeout: 20000
	});

	const geoSuccess = (position) => {
		setLocationInfo({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	};
	const geoFailure = (err) => {
		setLocationInfo({ error: err.message });
	};

	useEffect(() => {
		try {
			var config = {
				method: 'get',
				url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar&location=${locationInfo.latitude}%2C${locationInfo.longitude}&radius=3000&key=AIzaSyADaQtqQonJgl5UGWltQxWWU9qSYnK1EFM',
				headers: {}
			};
			axios(config)
				.then(function (response) {
					//console.log(response);
					let stringified = JSON.stringify(response.data);
					let parsed = JSON.parse(stringified);
					//console.log(parsed);
					setEstablishments(parsed);
					/*console.log(
						'--------------------------------------------------------------------------'
					);
					console.log(
						establishments
						//.results[0].geometry.location.lat
					);*/
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e);
		}
	}, []);

	const mapRef = React.createRef();

	if (establishments) {
		return (
			<View style={{ flex: 1 }}>
				<GooglePlacesAutocomplete
					placeholder="Search"
					fetchDetails={true}
					GooglePlacesSearchQuery={{
						rankby: 'distance'
					}}
					GooglePlacesDetailsQuery={{
						fields: 'geometry'
					}}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						let stringified = JSON.stringify(details);
						let parsed = JSON.parse(stringified);
						console.log(parsed.geometry.location.lat);
					}}
					query={{
						key: 'AIzaSyADaQtqQonJgl5UGWltQxWWU9qSYnK1EFM',
						language: 'en',
						components: 'country:us',
						radius: 5000,
						location: `${region.latitude}, ${region.longitude}`
					}}
					styles={{
						container: {
							marginTop: 50,
							flex: 0,
							position: 'absolute',
							width: '100%',
							zIndex: 1
						},
						listView: { backgroundColor: 'white' }
					}}
				/>
				<MapView
					ref={mapRef}
					style={styles.map}
					region={{
						latitude: 40.74708623964595,
						longitude: -74.0258037865746,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
					showsUserLocation={true}
					provider="google"
				>
					{establishments.results.map((item, index) => {
						return (
							<Marker
								key={index}
								coordinate={{
									latitude: item.geometry.location.lat,
									longitude: item.geometry.location.lng
								}}
								image={require('../assets/carrot1.png')}
								title={item.name}
								anchor={{ x: 0.5, y: 0.7 }}
							/>
						);
					})}
				</MapView>
			</View>
		);
	} else {
		return <Text>Loading...</Text>;
	}
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
