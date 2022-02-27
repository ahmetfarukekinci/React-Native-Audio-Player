import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../navigation/';
export default function PlayerScreen({ navigation, route }: RootStackScreenProps<'PlayerScreen'>) {
	return (
		<View>
			<Text>LogInScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
