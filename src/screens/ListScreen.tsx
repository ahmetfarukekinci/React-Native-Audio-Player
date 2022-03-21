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
import { useGetPodcastListMutation } from "@store/apiSlice";
import { debounce } from "lodash";
import { Art, Technology, General, Entertainment, Logo } from "@icons";
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
  Icon?: JSX.Element;
}
const CategoryButtons: ICategoryButton[] = [
  {
    id: "1",
    param: "art",
    Icon: <Art />,
    title: "Art",
  },
  {
    id: "2",
    param: "technology",
    Icon: <Technology />,
    title: "Technology",
  },
  {
    id: "3",
    param: "general",
    Icon: <General />,
    title: "General",
  },
  {
    id: "4",
    param: "entertainment",
    Icon: <Entertainment />,
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
        <Logo />
        <FlatList
          ListHeaderComponent={
            <View>
              <Text style={styles.header}>Browse</Text>
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
                      title={item.title}
                      onPress={() => categorButtonOnPressed(index, item)}
                    >
                      {item.Icon}
                    </CategoryButton>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                <Text style={styles.listHeader}>Podcast ({list.length})</Text>
              </View>
            </View>
          }
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
