import React, { createRef, useEffect, useState, useRef } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import CardCarousel from '../components/CardCarousel';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
const axios = require('axios');

export default function RecommendationScreen({ navigation }) {
	const [shortLineBars, setShortLineBars] = useState([]);
	const [nearbyBars, setNearbyBars] = useState([]);
	const [countryBars, setCountryBars] = useState([]);
	const [locationInfo, setLocationInfo] = useState({
		where: { latitude: null, longitude: null },
		error: null
	});


	useEffect(() => {
		console.log('Calling location useEffect');
		try {
			Location.installWebGeolocationPolyfill();
			navigator.geolocation.getCurrentPosition(
				(position) =>
					setLocationInfo({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}),
				geoFailure,
				{
					enableHighAccuracy: true,
					timeout: 20000
				}
			);
			const geoFailure = (err) => {
				consolr.log(err);
				setLocationInfo({ error: err.message });
			};
		} catch (e) {
			console.log(e);
		}
	}, []);
	useEffect(() => {
		console.log('Calling shortLine useEffect');
		try {
			const filter = 'Short';
			const barsConfig = {
				method: 'get',
				url: `https://c6jxkilx8a.execute-api.us-east-1.amazonaws.com/dev/bars?lat=${locationInfo.latitude}&long=${locationInfo.longitude}&radius=1500&filter_by_line=${filter}`,
				headers: {
					'X-Amz-Date': '20211113T172707Z',
					Authorization:
						'AWS4-HMAC-SHA256 Credential=AKIAYS3YCLSS436J4VVF/20211113/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=be161e0053c676970d25d52a5fcce10e67e7f3eb038bb383da77c2dc959ac12b'
				}
			};

			axios(barsConfig)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					setShortLineBars(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e);
		}
	}, [locationInfo]);

	console.log(shortLineBars);
	useEffect(() => {
		console.log('Calling nearBy useEffect');
		try {
			const barsConfig = {
				method: 'get',
				url: `https://c6jxkilx8a.execute-api.us-east-1.amazonaws.com/dev/bars?lat=${locationInfo.latitude}&long=${locationInfo.longitude}&radius=1500`,
				headers: {
					'X-Amz-Date': '20211113T172707Z',
					Authorization:
						'AWS4-HMAC-SHA256 Credential=AKIAYS3YCLSS436J4VVF/20211113/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=be161e0053c676970d25d52a5fcce10e67e7f3eb038bb383da77c2dc959ac12b'
				}
			};

			axios(barsConfig)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					setNearbyBars(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e);
		}
	}, [locationInfo]);

	useEffect(() => {
		console.log('Calling contry useEffect');
		try {
			const filter = 'Country';
			const barsConfig = {
				method: 'get',
				url: `https://c6jxkilx8a.execute-api.us-east-1.amazonaws.com/dev/bars?lat=${locationInfo.latitude}&long=${locationInfo.longitude}&radius=1500&filter_by_music=${filter}`,
				headers: {
					'X-Amz-Date': '20211113T172707Z',
					Authorization:
						'AWS4-HMAC-SHA256 Credential=AKIAYS3YCLSS436J4VVF/20211113/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=be161e0053c676970d25d52a5fcce10e67e7f3eb038bb383da77c2dc959ac12b'
				}
			};

			axios(barsConfig)
				.then(function (response) {
					// console.log(JSON.stringify(response.data));
					setCountryBars(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e);
		}
	}, [locationInfo]);

	if (nearbyBars.length !== 0 || shortLineBars.length !== 0 || countryBars.length !== 0) {

		return (

			<View style={styles.container}>
				<ScrollView style={{ flex: 1 }}>
					<CardCarousel header="Near You" subheader="Hoboken, NJ" barsData={nearbyBars} />

					<CardCarousel header="Short Line" subheader="Hoboken, NJ" barsData={shortLineBars} />

					<CardCarousel
						header="Country Music"
						subheader="You're into Country"
						barsData={countryBars}
					/>
				</ScrollView>
			</View>
		);
	}
	else {
		return <Text>Loading...</Text>
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	}
});
