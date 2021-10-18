import React, { useRef } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
	Image,
	Pressable,
	Linking,
	Alert
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import BarHopperLogo from '../assets/bar-hopper-logo.png';
import TestData from './test-data/Bars';
import { useNavigation } from '@react-navigation/native';

const { width: windowWidth } = Dimensions.get('window');

// This is example code taken from https://github.com/lehoangnam97/react-native-anchor-carousel and needs to be refactored

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;

const ShopCarousel = (props) => {
	const { style } = props;
	const carouselRef = useRef(null);
	const navigation = useNavigation();

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
		const { name, image, _id } = item;
		return (
			<Pressable
				activeOpacity={1}
				style={styles.item}
				onPress={() => {
					carouselRef.current.scrollToIndex(index);
				}}
			>
				<Image source={{ uri: image }} style={styles.image} />
				<View style={styles.lowerContainer}>
					<View style={styles.lowerLeft}>
						<Text style={styles.titleText} numberOfLines={1}>
							{name}
						</Text>
						<Text style={styles.descriptionText} numberOfLines={1}>
							0.3 miles away
						</Text>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() =>
							navigation.navigate('BarInfo', {
								uuid: { _id },
								name: name,
								otherParam: 'anything you want here'
							})
						}
					>
						<Text style={styles.buttonText}>
							Check out this bar
						</Text>
					</TouchableOpacity>
				</View>
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
				data={TestData}
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
		height: ITEM_WIDTH + 100,
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
		padding: 12
	},
	lowerLeft: {
		width: '50%'
	},
	titleText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#1C2127',
		marginTop: 4
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
	footer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		marginTop: 20,
		marginHorizontal: 10,
		borderColor: '#A0A0A0',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
		padding: 10
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 20,
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
	}
});

export default ShopCarousel;
