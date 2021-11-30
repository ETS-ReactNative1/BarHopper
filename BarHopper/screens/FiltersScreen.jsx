import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";


const _iconStyle = (borderColor: string) => ({
  height: 25,
  width: 25,
  borderRadius: 25,
  borderColor: borderColor,
});

const styles = {
  container: { marginTop: 24 },
  verticalStyle: { marginTop: 16 },
  textStyle: { textDecorationLine: "none" },
  iconImageStyle: { height: 20, width: 20 },
};

const lineAttributes: ICheckboxButton[] = [
  {
    id: 0,
    text: "Long",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 1,
    text: "Short",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 2,
    text: "No Line",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  }
];

const musicAttributes: ICheckboxButton[] = [
  {
    id: 0,
    text: "Country",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 1,
    text: "Hip Hop / R&B",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 2,
    text: "Live",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
	{
    id: 3,
    text: "EDM",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  }
];

const VibesAttributes: ICheckboxButton[] = [
  {
    id: 0,
    text: "Club",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 1,
    text: "Dive",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
  {
    id: 2,
    text: "Sports",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
	{
    id: 3,
    text: "Live Music",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
	{
    id: 4,
    text: "Resturant",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
	{
    id: 5,
    text: "College",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  },
	{
    id: 6,
    text: "Classy",
    fillColor: "#009292",
    unfillColor: "#FFFFFF",
    iconStyle: _iconStyle("#009292"),
    textStyle: styles.textStyle,
    style: styles.verticalStyle,
    iconImageStyle: styles.iconImageStyle,
  }
];
const FiltersScreen = () => {
	const [checkboxState, setCheckboxState] = useState({
		line: null,
		music: null,
		covid: null,
		vibes: null
	});
	const carouselRef = useRef(null);
	const navigation = useNavigation();
	console.log(checkboxState);

	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ marginTop: 24, backgroundColor: '#009292', width: '100%', padding: 10 }}>
        <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
          Select from the filters!
        </Text>
      </View>
      <View style={{ marginLeft: 32, marginTop: 24 }}>
        <Text style={{ color: "#a8a8ac", fontWeight: "500", fontSize: 16 }}>
          Line Attributes
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          marginLeft: 32,
          justifyContent: "center",
        }}
      >
        <BouncyCheckboxGroup
          data={lineAttributes}
          style={{ flexDirection: "column" }}
          onChange={(selectedItem: ICheckboxButton) => {

						setCheckboxState({
							line: selectedItem.text,
							music: checkboxState.music,
							vibes: checkboxState.vibes,
						});
          }}
        />
      </View>
			<View style={{ marginLeft: 32, marginTop: 24 }}>
        <Text style={{ color: "#a8a8ac", fontWeight: "500", fontSize: 16 }}>
          Music Attributes
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          marginLeft: 32,
          justifyContent: "center",
        }}
      >
        <BouncyCheckboxGroup
          data={musicAttributes}
          style={{ flexDirection: "column" }}
          onChange={(selectedItem: ICheckboxButton) => {

						setCheckboxState({
							line: checkboxState.line,
							music: selectedItem.text,
							vibes: checkboxState.vibes,
						});
          }}
        />
      </View>
			<View style={{ marginLeft: 32, marginTop: 24 }}>
        <Text style={{ color: "#a8a8ac", fontWeight: "500", fontSize: 16 }}>
          Vibe Attributes
        </Text>
      </View>
      <View
        style={{
          marginTop: 16,
          marginLeft: 32,
          justifyContent: "center",
        }}
      >
        <BouncyCheckboxGroup
          data={VibesAttributes}
          style={{ flexDirection: "column" }}
          onChange={(selectedItem: ICheckboxButton) => {

						setCheckboxState({
							line: checkboxState.line,
							music: checkboxState.music,
							vibes: selectedItem.text,
						});
          }}
        />
      </View>
					<View style={{marginTop: 30, marginBottom: 40, alignItems: 'center'}}>
						<Pressable
						style={{padding: 10, backgroundColor: '#009292', width: '50%'}}
						onPress={() => submitAttributes()}
					>
						<Text style={{textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: 'bold'}}>Submit</Text>
					</Pressable>
				</View>
    </ScrollView>
	);
};

export default FiltersScreen;
