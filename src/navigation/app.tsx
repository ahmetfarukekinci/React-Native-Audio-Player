import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './index';
import ListScreen from '../screens/ListScreen';
import LogInScreen from '../screens/LogInScreen';
import PlayerScreen from '../screens/PlayerScreen';
import * as SecureStore from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
	const [ loading, setLoading ] = React.useState<boolean>(true);
	const [ isTokenValid, setIsTokenValid ] = React.useState<boolean>(false);
	const getToken = async () => {
		const token = await SecureStore.getItemAsync('access_token');
		if (token) {
			setIsTokenValid(true);
			setLoading(false);
		} else {
			setLoading(false);
			setIsTokenValid(false);
		}
	};
	React.useEffect(() => {
		getToken();
	}, []);
	if (loading) {
		return <AppLoading />;
	}
	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				{
					!isTokenValid ? <React.Fragment>
						<RootStack.Screen name="LogInScreen" component={LogInScreen} />
					</React.Fragment> :
					<React.Fragment>
						<RootStack.Screen name="PlayerScreen" component={PlayerScreen} />
						<RootStack.Screen name="ListScreen" component={ListScreen} />
					</React.Fragment>}
			</RootStack.Navigator>
		</NavigationContainer>
	);
};
export default Navigator;
