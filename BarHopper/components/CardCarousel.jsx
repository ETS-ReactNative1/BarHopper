import React, { useEffect, useState, useRef } from 'react';
import {
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	View,
	Dimensions,
	Image,
	Pressable,
	Linking,
	Alert
} from 'react-native';
import { Badge } from 'react-native-elements';
import Carousel from 'react-native-anchor-carousel';
import BarHopperLogo from '../assets/bar-hopper-logo.png';
import TestData from './test-data/Bars';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
const axios = require('axios');

const { width: windowWidth } = Dimensions.get('window');

const ITEM_WIDTH = 0.5 * windowWidth;
const SEPARATOR_WIDTH = 10;

const ShopCarousel = (props) => {
	const { style, userLocation } = props;
	const carouselRef = useRef(null);
	const navigation = useNavigation();
	const [nearbyBars, setNearbyBars] = useState([]);
	const [shortLineBars, setBarsInfo] = useState([]);

	const [locationInfo, setLocationInfo] = React.useState({
		where: { latitude: null, longitude: null },
		error: null
	});
	useEffect(() => {
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

	function renderHeader() {
		return (
			<View style={styles.header}>
				<Image style={styles.logo} source={BarHopperLogo} />
				<View>
					<Text style={styles.name}>{props.header}</Text>
					<Text style={styles.descriptionText}>
						{props.subheader}
					</Text>
				</View>
			</View>
		);
	}

	function renderItem({ item, index }) {
		const { name, icon, _id, location, address } = item;
		return (
			<Pressable
				activeOpacity={1}
				style={styles.item}
				onPress={() =>
					navigation.navigate('Bar Information', {
						_id: _id
					})
				}
			>
				<ImageBackground source={{ uri: icon }} style={styles.image}>
					<View style={styles.lowerContainer}>
						<View>
							<Text style={styles.titleText} numberOfLines={1}>
								{name}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between'
								}}
							>
								{/* <Badge
									value="Dive Bar"
									badgeStyle={styles.vibeBadge}
									textStyle={styles.badgeText}
								/>
								<Badge
									value="0.3 miles away"
									badgeStyle={styles.vibeBadge}
									textStyle={styles.badgeText}
								/> */}
							</View>
						</View>
					</View>
				</ImageBackground>
			</Pressable>
		);
	}

	return (
		<View style={styles.container}>
			{renderHeader()}
			<Carousel
				keyExtractor={(item) => item?._id}
				style={[styles.carousel, style]}
				ref={carouselRef}
				data={nearbyBars}
				renderItem={renderItem}
				itemWidth={ITEM_WIDTH}
				separatorWidth={SEPARATOR_WIDTH}
				inActiveScale={1}
				inActiveOpacity={1}
				containerWidth={windowWidth}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	badgeText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#1C2127'
	},
	container: {
		backgroundColor: 'white',
		alignItems: 'flex-start',
		height: 'auto',
		borderTopWidth: 5,
		borderBottomWidth: 5,
		borderColor: '#DADEE1'
	},
	carousel: {
		width: windowWidth,
		height: ITEM_WIDTH,
		flexGrow: 0
	},
	item: {
		backgroundColor: 'white',
		height: '98%',
		borderRadius: 5,
		borderColor: '#EAECEE',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		elevation: 1
	},
	image: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: '#EBEBEB'
	},
	lowerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: `#009292`,
		position: 'absolute',
		bottom: 0,
		width: '100%'
	},
	titleText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#ffffff'
	},
	descriptionText: {
		fontSize: 14,

		color: '#A0A0A0'
	},
	button: {
		width: '40%',
		marginLeft: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderColor: '#585B60'
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#585B60'
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
		borderColor: '#A0A0A0',
		paddingHorizontal: 10
	},
	logo: {
		width: 40,
		aspectRatio: 1,
		borderRadius: 20,
		marginRight: 10
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1C2127'
	},
	vibeBadge: {
		backgroundColor: 'ivory',
		borderColor: 'black'
	}
});

export default ShopCarousel;
