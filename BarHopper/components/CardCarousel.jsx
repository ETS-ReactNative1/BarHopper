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

const { width: windowWidth } = Dimensions.get('window');

// This is example code taken from https://github.com/lehoangnam97/react-native-anchor-carousel and needs to be refactored

// const TestData = [
// 	{
// 		id: 'item2',
// 		image: 'https://www.google.com/maps/uv?pb=!1s0x5490551a5d484fd3%3A0x277f52707895bae2!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPIsLAcNdgQJwJyhWb1b54fTBKeyPhhRnNyiK4a%3Dw568-h320-k-no!5sdirty%20oscars%20annex%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipPIsLAcNdgQJwJyhWb1b54fTBKeyPhhRnNyiK4a&hl=en&sa=X&ved=2ahUKEwjCrbeVt8XzAhUuTd8KHZ2CCmoQoip6BAh5EAM#',
// 		title: 'Dirty Oscars Annex',
// 		url: 'https://github.com/lehoangnam97/react-native-anchor-carousel'
// 	},
// 	{
// 		id: 'item3',
// 		image: 'https://www.google.com/maps/uv?pb=!1s0x89c25a16706fa941%3A0x22669c1e52962b19!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNIwlWitLRGiCPM08bEdFhPQOcotQ0nGXg8DRZ1%3Dw426-h320-k-no!5skillarney%20rose%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipNIwlWitLRGiCPM08bEdFhPQOcotQ0nGXg8DRZ1&hl=en&sa=X&ved=2ahUKEwjlhu-7t8XzAhVwhOAKHRQhARsQoip6BAh7EAM#',
// 		title: 'Killarney Rose',
// 		url: 'https://www.npmjs.com/package/react-native-anchor-carousel'
// 	},
// 	{
// 		id: 'item1',
// 		image: 'https://www.google.com/maps/uv?pb=!1s0x89c25960e3ec2ab3%3A0x7f94542a2069e06!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipODVD6Wx0ehVR5MPYJl-QPhluKryweNMx4_aaD-%3Dw426-h320-k-no!5sskinny%20dennis%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipODVD6Wx0ehVR5MPYJl-QPhluKryweNMx4_aaD-&hl=en&sa=X&ved=2ahUKEwippYHjt8XzAhWIl-AKHZRaA6kQoip6BAh0EAM#',
// 		title: 'Skinny Dennis',
// 		url: 'https://www.npmjs.com/package/react-native-anchor-carousel'
// 	},
// 	{
// 		id: 'item6',
// 		image: 'https://www.google.com/maps/place/Dante+NYC/@40.7287456,-74.001562,3a,77y,90t/data=!3m8!1e2!3m6!1sAF1QipMSvQXmQeic6xnEfiRarFpxRwuMilZDjGkf_5Cq!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMSvQXmQeic6xnEfiRarFpxRwuMilZDjGkf_5Cq%3Dw152-h86-k-no!7i1125!8i633!4m12!1m6!3m5!1s0x0:0x7f94542a2069e06!2sSkinny+Dennis!8m2!3d40.7159037!4d-73.9621298!3m4!1s0x89c2599211bc0e53:0x3c39f8f40f515e27!8m2!3d40.7288417!4d-74.0016444#',
// 		title: 'Dante NYC',
// 		url: 'https://github.com/lehoangnam97/react-native-anchor-carousel'
// 	},
// 	{
// 		id: 'item4',
// 		image: 'https://www.google.com/maps/place/The+Unicorn/@40.7132263,-73.9920918,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipOmJRImzHI38CwLlHn81lfr2BlsUlh6aYfGPIlo!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOmJRImzHI38CwLlHn81lfr2BlsUlh6aYfGPIlo%3Dw86-h114-k-no!7i2448!8i3264!4m5!3m4!1s0x89c25a28e123b5d7:0x5457c05050124e45!8m2!3d40.7133212!4d-73.9921055#',
// 		title: 'The Unicorn',
// 		url: 'https://github.com/lehoangnam97/react-native-anchor-carousel'
// 	},

// 	{
// 		id: 'item5',
// 		image: 'https://www.google.com/maps/place/Treadwell+Park/@40.7102728,-74.0163704,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipPyYbPUZpXefy-VVO5Hl299u_oly5w_lC-OKzek!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPyYbPUZpXefy-VVO5Hl299u_oly5w_lC-OKzek%3Dw128-h86-k-no!7i2048!8i1366!4m5!3m4!1s0x89c25a1075bc2e41:0x8975b784309ad2a1!8m2!3d40.7103014!4d-74.0166806#',
// 		title: 'Treadwell Park',
// 		url: 'https://www.npmjs.com/package/react-native-anchor-carousel'
// 	}
// ];

const ITEM_WIDTH = 0.7 * windowWidth;
const SEPARATOR_WIDTH = 10;

const ShopCarousel = (props) => {
	const { style } = props;
	const carouselRef = useRef(null);

	async function handleImHereClick(url) {
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
	}

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
		const { image, title, url } = item;
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
							{title}
						</Text>
						<Text style={styles.descriptionText} numberOfLines={1}>
							0.3 miles away
						</Text>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleImHereClick(url)}
					>
						<Text style={styles.buttonText}>I'm Here</Text>
					</TouchableOpacity>
				</View>
			</Pressable>
		);
	}

	return (
		<View style={styles.container}>
			{renderHeader()}
			<Carousel
				keyExtractor={(item) => item?.id}
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
