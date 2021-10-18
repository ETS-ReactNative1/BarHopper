import * as React from 'react';
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

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Four</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			 <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
			<EditScreenInfo path="/screens/AccountScreen.jsx" />
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
	}
});
