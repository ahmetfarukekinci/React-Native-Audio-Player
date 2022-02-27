import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
	namespace ReactNavigation { interface RootParamList extends RootStackParamList {} }
}

export type RootStackParamList = {
	LogInScreen: undefined;
	ListScreen: undefined;
	PlayerScreen: undefined;
	SplashScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Screen
>;
