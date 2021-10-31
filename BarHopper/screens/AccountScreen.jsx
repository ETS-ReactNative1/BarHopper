import React, {useEffect, useState, useRef } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, Pressable } from 'react-native';
import BarHopperLogo from '../assets/bar-hopper-logo.png';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';


const AccountScreen = () => {

	const carouselRef = useRef(null);
	const navigation = useNavigation();
	const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState('');

  useEffect(() => {
		let isMounted = true;
    try {
      setError(null);
      setLoading(true);

      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
        	setUsername(user.attributes.email);
        	console.log(`Load additional settings for user: ${user.username}`);

      }).catch(err => setError(err));
    }
    catch (e) {
      setError(e);
    }
    finally {
			isMounted = false;
      setLoading(false);
    }
  }, []);

	return(
		<View style={styles.container}>
			<View>
				<Image
					style={styles.logo}
					source={BarHopperLogo}
				/>
			</View>
      <View style={styles.logBox}>
        <Pressable style={styles.button} onPress={() =>
					navigation.navigate('Settings', {
					})
				}>
          <Text style={styles.settingsButtonText}>Settings</Text>
        </Pressable>
      </View>
			<View style={styles.logBox}>
				<Pressable style={styles.button} onPress={() =>
					navigation.navigate('Favorites', {
					})
				}>
          <Text style={styles.favotitesButtonText}>Favorites</Text>
        </Pressable>
			</View>
			<View style={styles.logBox}>
				<Pressable style={styles.button} onPress={() =>
					navigation.navigate('Notifications', {
					})
				}>
          <Text style={styles.notificationsButtonText}>Notifications</Text>
        </Pressable>
			</View>
			<View style={styles.logBox}>
				<Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </Pressable>
			</View>
    </View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16
  },
	logo: {
		width: 70,
		height: 70,
		alignSelf: 'center',
		marginBottom: 20,
	},
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  logBox: {
    padding: 20,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  },
	settingsButtonText: {
		textAlign: 'center',
		color: '#ff4dff',
	},
	favotitesButtonText: {
		textAlign: 'center',
		color: '#00e6e6',
	},
	notificationsButtonText: {
		textAlign: 'center',
		color: '#339933',
	},
	signOutButtonText: {
		textAlign: 'center',
		color: '#ff9900',
	}
});

export default AccountScreen;
