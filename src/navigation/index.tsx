import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
	namespace ReactNavigation { interface RootParamList extends RootStackParamList {} }
}
export interface IPlayerScreeenParams {
	audio_url: string;
	author: string;
	category: string;
	description: string;
	dislikes: number;
	file_size: number;
	likes: number;
	title: string;
}
export interface IErrorModalScreenParams {
	text: string;
}
export type RootStackParamList = {
	LogInScreen: undefined;
	ListScreen: undefined;
	PlayerScreen: IPlayerScreeenParams;
	ErrorModalScreen: IErrorModalScreenParams;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Screen
>;
