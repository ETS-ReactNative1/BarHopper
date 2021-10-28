import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Auth } from 'aws-amplify';

export default function AccountScreen() {

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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
      {error ? `Oops... ${error}` : null}
      {loading ? "Loading..." : `Hello ${username}`}
		</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			 <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
	buttonText: {
		backgroundColor: 'black',
		color: 'white',
		padding: 15

	}
});
