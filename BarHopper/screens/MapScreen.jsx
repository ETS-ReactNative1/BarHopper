import React, { createRef, useEffect, useState, useRef } from 'react';
import { RefreshControl, StyleSheet, Animated, Dimensions, ScrollView, TextInput } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
const axios = require('axios');
import { useNavigation } from '@react-navigation/native';

export default function MapScreen({ locationInfo, nearbyBars, setLocationInfo, setNearbyBars }) {
	const [region, setRegion] = React.useState({
		latitude: 40.74708623964595,
		longitude: -74.0258037865746,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	});


	var [searched, setSearched] = React.useState({
		didSearch: false,
		data: {
			location: {
				latitude: null,
				longitude: null,
			},
			name: null,
			id: null
		}
	});


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
						let stringified1 = JSON.stringify(details);
						let parsed1 = JSON.parse(stringified1);
						let stringified2 = JSON.stringify(data);
						let parsed2 = JSON.parse(stringified2);


						let newBar = {
							location: { latitude: parsed1.geometry.location.lat, longitude: parsed1.geometry.location.lng },
							name: parsed2.structured_formatting.main_text,
							id: parsed2.place_id

						};
						setRegion({
							latitude: newBar.location.latitude,
							longitude: newBar.location.longitude,
							latitudeDelta: 0.04,
							longitudeDelta: 0.04
						})
						setSearched({ didSearch: true, data: [newBar] });

					}


					}
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
					style={styles.map}
					region={region}
					showsUserLocation={true}
					provider="google"
				>
					{!searched.didSearch ? nearbyBars.map((item, index) => {

						return (
							<Marker
								key={index}
								coordinate={{
									latitude: item.location.lat,
									longitude: item.location.lng
								}}
								onPress={() =>
									navigation.navigate('Bar Information', {
										_id: item._id
									})
								}
								image={require('../assets/carrot1.png')}
								title={item.name}
								anchor={{ x: 0.5, y: 0.7 }}
								calloutAnchor={{ x: 0.5, y: 0.4 }}
							/>
						);
					}) : searched.data.map((item, index) => {

						return (
							<Marker
								key={index}
								coordinate={{
									latitude: item.location.latitude,
									longitude: item.location.longitude
								}}
								onPress={() =>
									navigation.navigate('Bar Information', {
										_id: item.id
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
