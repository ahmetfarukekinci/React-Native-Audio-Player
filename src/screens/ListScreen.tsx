import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RootStackScreenProps, IPlayerScreeenParams } from "@navigation";
import {
  SearchInput as Input,
  CategoryButton,
  ListButton,
  SpinnerHOC,
} from "@components";
import { hp, wp, fs, colors } from "@styles";
import { SvgProps, SvgXml } from "react-native-svg";
import { useGetPodcastListMutation } from "@store/apiSlice";
import { debounce } from "lodash";
import icons from "@icons";
import * as SecureStore from "expo-secure-store"; // TODO sil
const SpinnerView = SpinnerHOC(View);
type CategoryParamType =
  | "art"
  | "technology"
  | "general"
  | "entertainment"
  | "";
interface ICategoryButton {
  id: string;
  title: string;
  param: CategoryParamType;
  icon?: React.FC<SvgProps>;
}
const CategoryButtons: ICategoryButton[] = [
  {
    id: "1",
    param: "art",
    icon: icons.ArtIcon,
    title: "Art",
  },
  {
    id: "2",
    param: "technology",
    icon: icons.TechnologyIcon,
    title: "Technology",
  },
  {
    id: "3",
    param: "general",
    icon: icons.GeneralIcon,
    title: "General",
  },
  {
    id: "4",
    param: "entertainment",
    icon: icons.EntertainmentIcon,
    title: "Entertainment",
  },
];
export default function ListScreen({
  navigation,
}: RootStackScreenProps<"ListScreen">) {
  const [getPodcastList, { isLoading }] = useGetPodcastListMutation();
  const [list, setList] = useState<IPlayerScreeenParams[]>([]);
  const [query, setQuery] = useState<string>("");
  const [categoryIndex, setCategoryIndex] = useState<number | undefined>(
    undefined
  );
  const getList = async (queryText: string) => {
    try {
      const response: IPlayerScreeenParams[] = await getPodcastList(
        queryText
      ).unwrap();
      setList(response);
    } catch (error) {
      console.log("error", error);
      navigation.navigate("ErrorModalScreen", {
        text: "We could not access the list now. Please try again!",
      });
    }
  };
  useEffect(() => {
    getList("");
  }, []);
  const debouncedSearch = debounce((text: string, category?: string) => {
    category
      ? getList(`text=${text}&category=${category}`)
      : getList(`text=${text}`);
  }, 500);
  const categorButtonOnPressed = (
    index: number,
    item: ICategoryButton
  ): void => {
    if (categoryIndex === index) {
      setCategoryIndex(undefined);
      debouncedSearch(query, "");
    } else {
      setCategoryIndex(index);
      debouncedSearch(query, item.param);
    }
  };
  return (
    <SpinnerView loading={isLoading}>
      <View style={styles.container}>
        <SvgXml width={fs(90)} height={hp(42)} xml={icons.Logo} />
        <FlatList
          ListHeaderComponent={
            <View>
              <Text
                onPress={async () =>
                  SecureStore.deleteItemAsync("access_token")
                }
                style={styles.header}
              >
                Browse
              </Text>
              <Input
                onChangeText={(text) =>
                  setQuery((prev) => {
                    debouncedSearch(text);
                    return text;
                  })
                }
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
                      onPress={() => categorButtonOnPressed(index, item)}
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
          scrollsToTop
          renderItem={({ item }) => (
            <ListButton
              title={item.title}
              author={item.author}
              onPress={() => navigation.navigate("PlayerScreen", item)}
            />
          )}
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
    color: colors.gray1,
    fontSize: fs(16),
  },
  categoryButtonsWrapper: {
    height: hp(173),
    width: "100%",
    paddingTop: hp(32),
  },
});
