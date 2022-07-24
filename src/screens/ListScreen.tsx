import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RootStackScreenProps, IPlayerScreeenParams } from "@navigation";
import { SearchInput, CategoryButton, ListButton, SpinnerHOC, CategorySelectionButtons } from "@components";
import { hp, wp, fs, colors } from "@styles";
import { useGetPodcastListMutation } from "@store/apiSlice";
import { debounce } from "lodash";
import { Logo } from "@icons";
import { ICategoryButton, CategoryParamType } from "@types";
import { CategoryButtonsListData } from "@constants";

const SpinnerView = SpinnerHOC(View);

export default function ListScreen({ navigation }: RootStackScreenProps<"ListScreen">) {
  const [getPodcastList, { isLoading, isSuccess }] = useGetPodcastListMutation();
  const [list, setList] = useState<IPlayerScreeenParams[]>([]);
  const [query, setQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<{ index: number | undefined; param: CategoryParamType }>({
    index: undefined,
    param: undefined,
  });
  const [searchInputText, setSearchInputText] = useState<string>("");
  const firstMount = useRef<boolean>(true);
  const flatlistRef = useRef<FlatList>(null);
  useEffect(() => {
    const promisedGetPodcastList = getPodcastList(query);
    promisedGetPodcastList
      .unwrap()
      .then((data) => {
        setList(data);
      })
      .catch(() => {
        navigation.navigate("ErrorModalScreen", {
          text: "We could not access the list now. Please try again!",
        });
      });

    () => {
      promisedGetPodcastList.abort();
      firstMount.current = false;
    };
  }, [query]);

  useEffect(() => {
    if (!firstMount.current) {
      debouncedSearch();
    }
    firstMount.current = false;
  }, [searchInputText, activeCategory]);

  const debouncedSearch = useCallback(
    debounce(() => {
      activeCategory.param
        ? setQuery(`text=${searchInputText}&category=${activeCategory.param}`)
        : setQuery(`text=${searchInputText}`);
    }, 500),
    [searchInputText, activeCategory.index, activeCategory.param]
  );

  const categorButtonOnPressed = (index: number, item: ICategoryButton): void => {
    if (activeCategory?.index === index) {
      setActiveCategory({ index: undefined, param: undefined });
      return;
    }
    setActiveCategory({ index, param: item.param });
  };

  return (
    <SpinnerView loading={!isSuccess && isLoading}>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.header} onPress={() => flatlistRef.current?.scrollToIndex({ index: 0 })}>
          Browse
        </Text>
        <SearchInput placeholder="Search podcast..." onChangeText={(text) => setSearchInputText(text)} />
        <FlatList
          ref={flatlistRef}
          data={list}
          keyExtractor={(item) => item.title}
          scrollsToTop
          ListHeaderComponent={
            <View>
              <CategorySelectionButtons
                data={CategoryButtonsListData}
                renderItem={({ item, index }) => (
                  <CategoryButton
                    isActive={activeCategory.index === index}
                    title={item.title}
                    onPress={() => categorButtonOnPressed(index, item)}
                  >
                    {item.Icon}
                  </CategoryButton>
                )}
              />
              <Text style={styles.listHeader}>Podcast ({list.length})</Text>
            </View>
          }
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
    marginBottom: hp(10),
  },
  listHeader: {
    color: colors.gray1,
    fontSize: fs(16),
  },
});
