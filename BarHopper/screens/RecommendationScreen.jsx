import * as React from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import CardCarousel from '../components/CardCarousel';
import { FontAwesome } from '@expo/vector-icons';

export default function RecommendationScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<ScrollView style={{ flex: 1 }}>
				<CardCarousel header="Near You" subheader="Hoboken, NJ" />

				<CardCarousel
					header="Picked For You"
					subheader="Because you liked Dirty Oscar's"
				/>

				<CardCarousel header="Short Line" subheader="Hoboken, NJ" />

				<CardCarousel
					header="Vibes You Like"
					subheader="You're into Country"
				/>
			</ScrollView>
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
	}
});
