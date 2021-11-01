import React, {useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";



const FiltersScreen = () => {

	const [checkboxState, setCheckboxState] = useState({
			line: [],
			music: [],
			covid: [],
		});
	const carouselRef = useRef(null);
	const navigation = useNavigation();
	console.log(checkboxState);

	return(
		<View style={styles.container}>
			<ScrollView style={{ flex: 1 }}>
				<View style={{width: '100%', backgroundColor: '#009292', padding: 10, marginBottom: 10, marginTop: 10}}>
					<Text style={styles.title}>Use Filters to find your crowd!</Text>
				</View>
				<Text style={styles.heading}>LINE</Text>
				<View style={styles.boxesView}>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
								});
							}
							else{
								const lines = checkboxState.line.filter((element => element !== 'long'))
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
								});
							}
							else{
								const lines = checkboxState.line.filter((element => element !== 'short'))
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
								});
							}
							else{
								const lines = checkboxState.line.filter((element => element !== 'no line'))
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Average"
						onPress={(isChecked: boolean) => {
							if (isChecked) {
								setCheckboxState({
									line: ['average', ...checkboxState.line],
									music: checkboxState.music,
									covid: checkboxState.covid,
								});
							}
							else{
								const lines = checkboxState.line.filter((element => element !== 'average'))
								setCheckboxState({
									line: [...lines],
									music: checkboxState.music,
									covid: checkboxState.covid,
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
							textDecorationLine: "none",
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
								});
							}
							else{
								const musics = checkboxState.music.filter((element => element !== 'country'))
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
								});
							}
							else{
								const musics = checkboxState.music.filter((element => element !== 'hip hop'))
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
								});
							}
							else{
								const musics = checkboxState.music.filter((element => element !== 'live'))
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
								});
							}
						}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
								});
							}
							else{
								const musics = checkboxState.music.filter((element => element !== 'edm'))
								setCheckboxState({
									line: checkboxState.line,
									music: [...musics],
									covid: checkboxState.covid,
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
							textDecorationLine: "none",
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Vaccine Mandate"
						onPress={(isChecked: boolean) => {if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: ['vaccine mandate', ...checkboxState.covid],
								});
							}
							else{
								const covids = checkboxState.covid.filter((element => element !== 'vaccine mandate'))
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: [...covids],
								});
							}}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
						}}
						size={25}
						fillColor="#009292"
						unfillColor="#FFFFFF"
						text="Masks Required"
						onPress={(isChecked: boolean) => {if (isChecked) {
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: ['masks required', ...checkboxState.covid],
								});
							}
							else{
								const covids = checkboxState.covid.filter((element => element !== 'masks required'))
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: [...covids],
								});
							}}}
					/>
					<BouncyCheckbox
						style={styles.checkbox}
						textStyle={{
							textDecorationLine: "none",
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
									covid: ['no mandates', ...checkboxState.covid],
								});
							}
							else{
								const covids = checkboxState.covid.filter((element => element !== 'no mandates'))
								setCheckboxState({
									line: checkboxState.line,
									music: checkboxState.music,
									covid: [...covids],
								});
							}
						}}
					/>
				</View>
			</ScrollView>
    </View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
	checkbox: {
		margin: 5,
		borderColor: '#009292',
		textDecorationLine: 'none',

	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fefefe',
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
		padding: 10,
	}
});

export default FiltersScreen;
