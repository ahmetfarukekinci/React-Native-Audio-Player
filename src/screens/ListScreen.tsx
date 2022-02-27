import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../navigation/';
export default function ListScreen({ navigation, route }: RootStackScreenProps<'ListScreen'>) {
	return (
		<View>
			<Text>LogInScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
