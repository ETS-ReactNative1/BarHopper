import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
	Platform,
	Image,
	ScrollView,
	SectionList,
	StyleSheet,
	Dimensions
} from 'react-native';
import { Divider, ListItem, Icon } from 'react-native-elements';
import { SafeAreaView, Text, View } from '../components/Themed';

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = 0.5 * windowWidth;

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

	//temp list to validate layout; this should be deleted during integration
	const DATA = [
		{
			title: 'Line',
			data: ['Long']
		},
		{
			title: 'Music',
			data: ['Hip Hop', 'Dubstep', 'R&B']
		}
	];

	// temp object, should be deleted during integration
	const Item = ({ title }) => (
		<View style={styles.item}>
			<Text style={styles.barAttribute}>{title}</Text>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title} numberOfLines={1}>
				{name}
			</Text>

			<View style={styles.vertical}>
				<View style={{ marginHorizontal: 10 }}>
					<Text style={styles.subHeader}>Hours</Text>
					<Text style={styles.barMetaData}>
						{open_time} - {close_time}
					</Text>
				</View>

				<Divider orientation="vertical" width={2} />
				<View style={{ marginHorizontal: 10 }}>
					<Text style={styles.subHeader}>Distance</Text>
					<Text style={styles.barMetaData}>0.2 Miles Away</Text>
				</View>

				<Divider orientation="vertical" width={2} />
				<View style={{ marginHorizontal: 10 }}>
					<Text style={styles.subHeader}>Vibe</Text>
					<Text style={styles.barMetaData}>Dive Bar</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				<Image source={{ uri: image }} style={styles.storefront} />
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Text style={styles.rating}>4.5/5</Text>
				</View>
			</View>
			<View style={{ alignSelf: 'flex-start', marginHorizontal: 10 }}>
				<Text style={styles.subHeader}>Address</Text>
				<Text style={styles.barMetaData}>{location}</Text>
				<Divider orientation="horizontal" width={1} />
				<Text style={styles.subHeader}>Phone Number</Text>
				<Text style={styles.barMetaData}>{phone_number}</Text>
				<Divider orientation="horizontal" width={1} />
				<Text style={styles.subHeader}>Covid Precautions</Text>
				<Text style={styles.barMetaData}>{vaccination_protocols}</Text>
			</View>

			<View style={{ alignSelf: 'flex-start', margin: 10 }}>
				<SectionList
					sections={DATA}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => <Item title={item} />}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.subHeader}>{title}</Text>
					)}
				/>
			</View>

			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</SafeAreaView>
	);
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
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 15
	},
	rating: {
		fontSize: 30,
		fontWeight: 'bold',
		marginVertical: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
	storefront: {
		width: 0.5 * windowWidth,
		height: ITEM_WIDTH,
		margin: 10
	},
	subHeader: {
		fontSize: 12,
		fontWeight: 'bold'
	},
	vertical: {
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	}
});
