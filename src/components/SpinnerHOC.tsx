import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
interface ISpinnerHoc {
	loading: boolean;
	children: React.ReactChild;
}
const SpinnerHOC = (WrappedComponent: React.ElementType) => ({ loading, children }: ISpinnerHoc) => {
	return (
		<View style={[ { flex: 1 } ]}>
			<WrappedComponent style={{ flex: 1 }}>{children}</WrappedComponent>
			{loading && (
				<View
					style={[
						StyleSheet.absoluteFill,
						{ backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
					]}
				>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}
		</View>
	);
};
export { SpinnerHOC };
