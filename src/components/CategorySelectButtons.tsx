import React from "react";
import { FlatList, FlatListProps, StyleSheet, View } from "react-native";
import { hp } from "@styles";
import { ICategoryButton } from "@types";
const CategorySelectionButtons = ({
  renderItem,
  data,
}: FlatListProps<ICategoryButton>) => {
  return (
    <View style={styles.categoryButtonsWrapper}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  categoryButtonsWrapper: {
    height: hp(173),
    width: "100%",
    paddingTop: hp(32),
  },
});

export { CategorySelectionButtons };
