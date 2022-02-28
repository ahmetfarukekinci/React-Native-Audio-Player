import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RootStackScreenProps } from '../navigation/';
import { SearchInput as Input, CategoryButton, ListButton, SpinnerHOC } from '../components';
import { hp, wp, fs, colors } from '../styles';
import { SvgProps, SvgXml } from 'react-native-svg';
import Logo from '../../assets/icons/Logo.svg';
import Entertainment from '../../assets/icons/entertainment.svg';
import General from '../../assets/icons/general.svg';
import Technology from '../../assets/icons/technology.svg';
import Art from '../../assets/icons/art.svg';
import { useGetPodcastListMutation } from '../app/apiSlice';
import { debounce } from 'lodash';
const SpinnerView = SpinnerHOC(View);
interface IResponse {
	audio_url: string;
	author: string;
	category: string;
	description: string;
	dislikes: number;
	file_size: number;
	likes: number;
	title: string;
}
type CategoryParamType = 'art' | 'technology' | 'general' | 'entertainment' | '';
interface ICategoryButton {
	id: string;
	title: string;
	param: CategoryParamType;
	icon?: React.FC<SvgProps>;
}
const CategoryButtons: ICategoryButton[] = [
	{
		id: '1',
		param: 'art',
		icon: Art,
		title: 'Art'
	},
	{
		id: '2',
		param: 'technology',
		icon: Technology,
		title: 'Technology'
	},
	{
		id: '3',
		param: 'general',
		icon: General,
		title: 'General'
	},
	{
		id: '4',
		param: 'entertainment',
		icon: Entertainment,
		title: 'Entertainment'
	}
];
export default function PlayerScreen({ navigation, route }: RootStackScreenProps<'PlayerScreen'>) {
	const [ getPodcastList, { isLoading } ] = useGetPodcastListMutation();
	const [ list, setList ] = useState<IResponse[]>([]);
	const [ query, setQuery ] = useState<string>('');
	const [ categoryIndex, setCategoryIndex ] = useState<number | null>(null);
	const getList = async (queryText: string) => {
		try {
			const response = await getPodcastList(queryText).unwrap();
			setList(response);
		} catch (error) {
			console.log('error', error);
		}
	};
	useEffect(() => {
		getList('');
	}, []);
	const debouncedSearch = debounce((text: string, category?: string) => {

			category ? getList(`text=${text}&category=${category}`) :
			getList(`text=${text}`);
	}, 500);
	return (
		<SpinnerView loading={isLoading}>
			<View style={styles.container}>
				<SvgXml width={fs(90)} height={hp(42)} xml={Logo} />
				<FlatList
					ListHeaderComponent={
						<View>
							<Text style={styles.header}>Browse</Text>
							<Input
								onChangeText={(text) =>
									setQuery((prev) => {
										debouncedSearch(text);
										return text;
									})}
							/>
							<View style={styles.categoryButtonsWrapper}>
								<FlatList
									data={CategoryButtons}
									keyExtractor={(item) => item.id}
									renderItem={({ item, index }) => (
										<CategoryButton
											isActive={categoryIndex === index}
											icon={item.icon}
											title={item.title}
											onPress={() => {
												if (categoryIndex === index) {
													setCategoryIndex(null);
													debouncedSearch(query, '');
												} else {
													setCategoryIndex(index);
													debouncedSearch(query, item.param);
												}
											}}
										/>
									)}
									horizontal
									showsHorizontalScrollIndicator={false}
								/>
								<Text style={styles.listHeader}>Podcast ({list.length})</Text>
							</View>
						</View>
					}
					style={{ flex: 1 }}
					data={list}
					keyExtractor={(item, index) => JSON.stringify(index)}
					renderItem={({ item }) => <ListButton title={item.title} author={item.author} />}
				/>
			</View>
		</SpinnerView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingTop: hp(56),
		paddingLeft: wp(30)
	},
	header: {
		color: colors.white,
		fontSize: fs(48),
		fontWeight: 'bold',
		marginTop: hp(38),
		marginBottom: hp(32)
	},
	listHeader: {
		color: '#898F97',
		fontSize: fs(16)
	},
	categoryButtonsWrapper: {
		height: hp(173),
		width: '100%',
		paddingTop: hp(32)
	}
});
