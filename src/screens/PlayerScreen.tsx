import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RootStackScreenProps } from "../navigation/";
import {
  SearchInput as Input,
  CategoryButton,
  ListButton,
} from "../components";
import { hp, wp, fs, colors } from "../styles";
import { SvgProps, SvgXml } from "react-native-svg";
import Logo from "../../assets/icons/Logo.svg";
import Entertainment from "../../assets/icons/entertainment.svg";
import General from "../../assets/icons/general.svg";
import Technology from "../../assets/icons/technology.svg";
import Art from "../../assets/icons/art.svg";
import { useGetPodcastListMutation } from "../app/apiSlice";
import { debounce } from "lodash";
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
type CategoryNameType = "art" | "technology" | "general" | "entertainment";
interface ICategoryButton {
  id: string;
  title: CategoryNameType;
  icon?: React.FC<SvgProps>;
}
const CategoryButtons: ICategoryButton[] = [
  {
    id: "1",
    title: "art",
    icon: Art,
  },
  {
    id: "3",
    title: "technology",
    icon: Technology,
  },
  {
    id: "4",
    title: "general",
    icon: General,
  },
  {
    id: "5",
    title: "entertainment",
    icon: Entertainment,
  },
];
export default function PlayerScreen({
  navigation,
  route,
}: RootStackScreenProps<"PlayerScreen">) {
  const [getPodcastList, { isLoading, error }] = useGetPodcastListMutation();
  const [list, setList] = useState<IResponse[]>([]);
  const getList = async (e: string) => {
    try {
      const response = await getPodcastList(e).unwrap();
      console.log("response", response);
      setList(response);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getList("");
  }, []);
  const debouncedSearch = debounce((e: string) => {
    getList(e);
  }, 500);
  return (
    <View style={styles.container}>
      <SvgXml width={fs(90)} height={hp(42)} xml={Logo} />
      <Text style={styles.header}>Browse</Text>
      <Input onChangeText={(e) => debouncedSearch(e)} />
      <View style={styles.categoryButtonsWrapper}>
        <FlatList
          data={CategoryButtons}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CategoryButton
              isActive={true}
              icon={item.icon}
              title={item.title}
            />
          )}
          horizontal
          // contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
      <FlatList
        data={list}
        keyExtractor={(item, index) => JSON.stringify(index)}
        renderItem={({ item }) => (
          <ListButton title={item.title} author={item.author} />
        )}
        ListEmptyComponent={
          <Text style={styles.listHeader}>Podcast ({list.length})</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: hp(56),
    paddingLeft: wp(30),
  },
  header: {
    color: colors.white,
    fontSize: fs(48),
    fontWeight: "bold",
    marginTop: hp(38),
    marginBottom: hp(32),
  },
  listHeader: {
    color: "#898F97",
    fontSize: fs(16),
  },
  categoryButtonsWrapper: {
    height: hp(173),
    width: "100%",
    paddingTop: hp(32),
  },
});
