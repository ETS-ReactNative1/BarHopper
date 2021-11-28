import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
	Platform,
	Image,
	ScrollView,
	SectionList,
	StyleSheet,
	Dimensions,
	ImageBackground,
	Pressable
} from 'react-native';
import { Divider, ListItem, Icon } from 'react-native-elements';
import { SafeAreaView, Text, View } from '../components/Themed';

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = 0.5 * windowWidth;
const axios = require('axios');

export default function BarInfoScreen({ route }) {
	const { data } = route.params;
	const { name, icon, _id } = data;

	const [barInfo, setBarInfo] = useState(null);

	console.log(route);
	useEffect(() => {
		try {
			const config = {
				method: 'get',
				url: `https://c6jxkilx8a.execute-api.us-east-1.amazonaws.com/dev/bars/${_id}`,
				headers: {
					'X-Amz-Date': '20211113T172707Z',
					Authorization:
						'AWS4-HMAC-SHA256 Credential=AKIAYS3YCLSS436J4VVF/20211113/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date, Signature=be161e0053c676970d25d52a5fcce10e67e7f3eb038bb383da77c2dc959ac12b'
				}
			};

			axios(config)
				.then(function (response) {
					console.log(response);
					setBarInfo(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (e) {
			console.log(e);
		}
	}, []);

	// temp object, should be deleted during integration
	const Item = ({ title }) => (
		<View style={styles.item}>
			<Text style={styles.barAttribute}>{title}</Text>
		</View>
	);
	if (barInfo) {
		return (
			// <SafeAreaView style={styles.container}>
			<ScrollView style={{ flex: 1 }}>
				<ImageBackground
					source={{ uri: icon }}
					style={styles.storefront}
				>
					<View style={styles.lowerContainer}>
						<View
							style={{ backgroundColor: '#971984', width: '15%' }}
						>
							<Text style={styles.rating}>{barInfo.rating}</Text>
						</View>
						<View
							style={{ backgroundColor: '#009292', width: '85%' }}
						>
							<Text style={styles.title} numberOfLines={1}>
								{name}
							</Text>
						</View>
					</View>
				</ImageBackground>
				<Pressable onPress={() => navigation.navigate('I am Here', {})}>
					<Text>I am Here</Text>
				</Pressable>
				<Text style={styles.heading}>General Info</Text>
				<View style={styles.boxesView}>
					<View style={styles.vertical}>
						<View style={{ marginHorizontal: 10 }}>
							<Text style={styles.subHeader}>Hours</Text>
							<Text style={styles.barMetaData}></Text>
						</View>
						<Divider orientation="vertical" width={2} />
						<View style={{ marginHorizontal: 10 }}>
							<Text style={styles.subHeader}>Distance</Text>
							<Text style={styles.barMetaData}>
								0.2 Miles Away
							</Text>
						</View>
					</View>
					<Divider
						orientation="horizontal"
						width={1}
						style={styles.divider}
					/>
					<Text style={styles.subHeader}>Address</Text>
					<Text style={styles.barMetaData}>{barInfo.address}</Text>
					<Divider
						orientation="horizontal"
						width={1}
						style={styles.divider}
					/>
					<Text style={styles.subHeader}>Phone Number</Text>
					<Text style={styles.barMetaData}>
						{barInfo.phone_number}
					</Text>
				</View>
				<Text style={styles.heading}>Other Info</Text>
				<View style={styles.boxesView}>
					<Text style={styles.subHeader}>Line</Text>
					<Text style={styles.barMetaData}></Text>
					<Divider
						orientation="horizontal"
						width={1}
						style={styles.divider}
					/>
					<Text style={styles.subHeader}>Music</Text>
					<Text style={styles.barMetaData}></Text>
					<Divider
						orientation="horizontal"
						width={1}
						style={styles.divider}
					/>
					<Text style={styles.subHeader}>Vibe</Text>
					<Text style={styles.barMetaData}></Text>
					<Divider
						orientation="horizontal"
						width={1}
						style={styles.divider}
					/>
					<Text style={styles.subHeader}>COVID Precautions</Text>
					<Text style={styles.barMetaData}>
						{barInfo.vaccination_protocols}
					</Text>
				</View>
				<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
			</ScrollView>
		);
	} else {
		return <Text>Loading...</Text>;
	}
}

const styles = StyleSheet.create({
	barAttribute: {
		fontSize: 14
	},
	barMetaData: {
		fontSize: 16
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		// textAlign: 'center',
		color: '#fff',
		padding: 5
	},
	rating: {
		// textAlign: 'center',
		fontSize: 20,
		padding: 5,
		fontWeight: 'bold',
		color: '#fff'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
	divider: {
		marginTop: 10,
		marginBottom: 10
	},
	storefront: {
		width: windowWidth,
		height: ITEM_WIDTH,
		marginBottom: 10,
		shadowColor: '#171717',
		shadowOffset: { width: -2, height: 8 },
		shadowOpacity: 0.4,
		shadowRadius: 4
	},
	subHeader: {
		fontSize: 12,
		fontWeight: 'bold'
		// color: '#657657',
	},
	vertical: {
		marginTop: 10,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	lowerContainer: {
		flexDirection: 'row',
		// padding: 10,
		// justifyContent: 'space-between',
		// backgroundColor: `#009292`,
		position: 'absolute',
		bottom: 0,
		width: '100%'
	},
	heading: {
		padding: 10,
		color: '#000000',
		backgroundColor: '#d2e9e9',
		borderStyle: 'solid',
		borderWidth: 0.5,
		borderColor: '#009292',
		// marginBottom: 10,
		marginTop: 10
	},
	boxesView: {
		padding: 10
	}
});
