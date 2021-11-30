import React, { createRef, useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
const axios = require('axios');
import { useNavigation } from '@react-navigation/native';

export default function MapScreen({ locationInfo, nearbyBars }) {
	const [region, setRegion] = React.useState({
		latitude: 40.74708623964595,
		longitude: -74.0258037865746
	});




	const navigation = useNavigation();



	const mapRef = React.createRef();

	if (Array.isArray(nearbyBars) && nearbyBars.length) {
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
						let stringified = JSON.stringify(data);
						let parsed = JSON.parse(stringified);
						let newBar = [parsed];
						console.log(parsed.place_id);
						navigation.navigate('Map', {
							locationInfo: { locationInfo },
							nearbyBars: { newBar }
						});
					}}
					query={{
						key: 'AIzaSyAi2tanlhLgqPbw8j-0lQ1zNCerLz59IZg',
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
					{nearbyBars.map((item, index) => {
						return (
							<Marker
								key={index}
								coordinate={{
									latitude: item.location.lat,
									longitude: item.location.lng
								}}
								onPress={() =>
									navigation.navigate('Bar Information', {
										_id: item.place_id
									})
								}
								image={require('../assets/carrot1.png')}
								title={item.name}
								anchor={{ x: 0.5, y: 0.7 }}
								calloutAnchor={{ x: 0.5, y: 0.4 }}
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
