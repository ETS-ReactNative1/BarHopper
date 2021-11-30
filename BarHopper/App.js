import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './navigation';

import useColorScheme from './hooks/useColorScheme';
import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';
import * as Location from 'expo-location';
const axios = require('axios');
Amplify.configure({
	...config,
	Analytics: {
		disabled: true
	}
});
import { withAuthenticator } from 'aws-amplify-react-native';

const App = () => {
	const colorScheme = useColorScheme();

	const [locationInfo, setLocationInfo] = React.useState({
		where: { latitude: null, longitude: null },
		error: null
	});

	const [nearbyBars, setNearbyBars] = useState([]);


	const geoFailure = (err) => {
		console.log(err);
		setLocationInfo({ error: err.message });
	};

	useEffect(() => {
		try {
			Location.installWebGeolocationPolyfill();
			navigator.geolocation.getCurrentPosition(
				(position) => setLocationInfo({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
				geoFailure,
				{
					enableHighAccuracy: true,
					timeout: 20000
				}
			);

		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		try {
			const nearbyBarsConfig = {
				method: 'get',
				url: `https://c6jxkilx8a.execute-api.us-east-1.amazonaws.com/dev/bars?lat=${locationInfo.latitude}&long=${locationInfo.longitude}&radius=1500`,
				headers: {
					'X-Amz-Date': '20211113T172707Z',
					Authorization:
						'AWS4-HMAC-SHA256 Credential=AKIAYS3YCLSS436J4VVF/20211113/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=be161e0053c676970d25d52a5fcce10e67e7f3eb038bb383da77c2dc959ac12b'
				}
			};

			axios(nearbyBarsConfig)
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

	return <Navigation colorScheme={colorScheme} locationInfo={locationInfo} setLocationInfo={setLocationInfo} nearbyBars={nearbyBars} setNearbyBars={setNearbyBars} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default withAuthenticator(App);
