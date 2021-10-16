import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Image, StyleSheet, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Rating } from 'react-native-ratings';

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = 0.5 * windowWidth;
const RATING_IMAGE = require('../assets/bar-hopper-logo.png');

//TODO abstract to 'are you here' page
function ratingCompleted(rating) {
	console.log('Rating is: ' + rating);
}

export default function BarInfoScreen({ route }) {
	const { data } = route.params;
	const {
		name,
		image,
		_id,
		location,
		open_time,
		close_time,
		phone_number,
		vaccination_protocols
	} = data;
	// console.log(data.item);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{name}</Text>
			<Rating
				type="custom"
				ratingImage={RATING_IMAGE}
				ratingColor="#3498db"
				ratingBackgroundColor="#c8c7c8"
				ratingCount={5}
				imageSize={30}
				onFinishRating={ratingCompleted}
				style={{ paddingVertical: 10 }}
				defaultRating={4.5}
			/>
			<Image source={{ uri: image }} style={styles.storefront} />

			<Text>{location}</Text>
			<Text>
				{open_time} - {close_time}
			</Text>
			<Text>{phone_number}</Text>
			<Text>{vaccination_protocols}</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="/screens/ModalScreen.tsx" />

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
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
	},
	storefront: {
		width: 0.5 * windowWidth,
		height: ITEM_WIDTH
	}
});
