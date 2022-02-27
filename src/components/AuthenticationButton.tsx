import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { fs, wp, hp } from '../styles';
const AuthenticationButton: React.FC<TouchableOpacityProps> = ({ ...props }) => {
	return (
		<TouchableOpacity {...props} style={[ styles.container, props.style ]}>
			<Text style={styles.text}>Log In</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: wp(276),
		height: hp(51),
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3369FF',
		borderRadius: fs(99),
		shadowColor: 'rgb(51, 105, 255)',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.9,
		shadowRadius: 20.0,

		elevation: 24
	},
	text: {
		color: 'white',
		fontSize: fs(16)
	}
});
export { AuthenticationButton };
