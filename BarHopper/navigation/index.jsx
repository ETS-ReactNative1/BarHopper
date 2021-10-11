/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import RecommendationScreen from '../screens/RecommendationScreen';
import MapScreen from '../screens/MapScreen';
import FiltersScreen from '../screens/FiltersScreen';
import AccountScreen from '../screens/AccountScreen';

// import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }) {
	return (
		<NavigationContainer
			// linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Recommendations"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint
			}}
		>
			<BottomTab.Screen
				name="Recommendations"
				component={RecommendationScreen}
				options={({ navigation }) => ({
					title: 'Recommendations',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="code" color={color} />
					),
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate('Modal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1
							})}
						>
							<FontAwesome
								name="info-circle"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					)
				})}
			/>
			<BottomTab.Screen
				name="Map"
				component={MapScreen}
				options={{
					title: 'Map',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="code" color={color} />
					)
				}}
			/>
			<BottomTab.Screen
				name="Filters"
				component={FiltersScreen}
				options={{
					title: 'Filters',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="code" color={color} />
					)
				}}
			/>
			<BottomTab.Screen
				name="Account"
				component={AccountScreen}
				options={{
					title: 'Account',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="code" color={color} />
					)
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
