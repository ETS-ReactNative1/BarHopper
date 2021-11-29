import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const FiltersScreen = () => {
	const [checkboxState, setCheckboxState] = useState({
		line: [],
		music: [],
		covid: [],
		vibes: []
	});
	const carouselRef = useRef(null);
	const navigation = useNavigation();
	console.log(checkboxState);

	return (
		<View style={styles.container}>
			<ScrollView style={{ flex: 1 }}>
				<View
					style={{
						width: '100%',
						backgroundColor: '#009292',
						padding: 10,
						marginBottom: 10,
						marginTop: 10
					}}
				>
					<Text style={styles.title}>
						Use Filters to Find Your Crowd!
					</Text>
				</View>
				<Text style={styles.heading}>LINE</Text>
				<View style={styles.boxesView}>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Long"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: ['long', ...checkboxState.line],
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const lines = checkboxState.line.filter(
									(element) => element !== 'long'
								);
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Short"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: ['short', ...checkboxState.line],
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const lines = checkboxState.line.filter(
									(element) => element !== 'short'
								);
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="No Line"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: ['no line', ...checkboxState.line],
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const lines = checkboxState.line.filter(
									(element) => element !== 'no line'
								);
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
				</View>
				<Text style={styles.heading}>MUSIC</Text>
				<View style={styles.boxesView}>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Country"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: ['country', ...checkboxState.music],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const musics = checkboxState.music.filter(
									(element) => element !== 'country'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Hip Hop / R&B"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: ['hip hop', ...checkboxState.music],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const musics = checkboxState.music.filter(
									(element) => element !== 'hip hop'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Live"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: ['live', ...checkboxState.music],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const musics = checkboxState.music.filter(
									(element) => element !== 'live'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="EDM"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: ['edm', ...checkboxState.music],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							} else {
								const musics = checkboxState.music.filter(
									(element) => element !== 'edm'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
									vibes: checkboxState.vibes,
								});
							}
						}}
					/>
				</View>
				<Text style={styles.heading}>Vibes</Text>
				<View style={styles.boxesView}>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Club"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'club',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'club'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Dive"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'dive',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'dive'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Sports"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'sports',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'sports'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Live Music"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'live music',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'live music'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Resturant"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'resturant',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'resturant'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="College"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'college',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'college'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Classy"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [
										'classy',
										...checkboxState.vibes
									]
								});
							} else {
								const vibess = checkboxState.vibes.filter(
									(element) => element !== 'classy'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: checkboxState.covid,
									vibes: [...vibess]
								});
							}
						}}
					/>
				</View>
				<Text style={styles.heading}>COVID PRECAUTIONS</Text>
				<View style={styles.boxesView}>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Vaccine Mandate"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									vibes: checkboxState.vibes,
									covid: [
										'vaccine mandate',
										...checkboxState.covid
									]
								});
							} else {
								const covids = checkboxState.covid.filter(
									(element) => element !== 'vaccine mandate'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									vibes: checkboxState.vibes,
									covid: [...covids]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Masks Required"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									vibes: checkboxState.vibes,
									covid: [
										'masks required',
										...checkboxState.covid
									]
								});
							} else {
								const covids = checkboxState.covid.filter(
									(element) => element !== 'masks required'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									vibes: checkboxState.vibes,
									covid: [...covids]
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: 'none'
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="No Mandates"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									vibes: checkboxState.vibes,
									covid: [
										'no mandates',
										...checkboxState.covid
									]
								});
							} else {
								const covids = checkboxState.covid.filter(
									(element) => element !== 'no mandates'
								);
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									vibes: checkboxState.vibes,
									covid: [...covids]
								});
							}
						}}
					/>
				</View>
				<View style={styles.nextView}>
					<Pressable
						style={styles.nextButton}
						onPress={() => console.log('hi')}
					>
						<Text style={styles.nextButtonText}>Next</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	checkbox: {
		margin: 5,
		borderColor: '#009292',
		textDecorationLine: 'none'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fefefe'
	},
	heading: {
		padding: 10,
		color: '#000000',
		backgroundColor: '#d2e9e9',
		borderStyle: 'solid',
		borderWidth: 0.5,
		borderColor: '#009292'
	},
	boxesView: {
		padding: 10
	},
	nextButton: {
		padding: 10,
		backgroundColor: '#009292',
		width: '50%'
	},
	nextButtonText: {
		textAlign: 'center',
		color: '#ffffff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	nextView: {
		marginTop: 10,
		marginBottom: 10,
		alignItems: 'center'
	}
});

export default FiltersScreen;
