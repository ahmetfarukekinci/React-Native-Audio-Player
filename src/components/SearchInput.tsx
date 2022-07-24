import React, { useRef } from "react";
import { TextInput, View, TouchableWithoutFeedback, TextInputProps, StyleSheet } from "react-native";
import { fs, wp, hp, colors } from "@styles";
import { Search } from "@icons";
const SearchInput: React.FC<TextInputProps> = ({ ...props }) => {
  const inputRef = useRef<TextInput>(null);
  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        <TextInput
          {...props}
          ref={inputRef}
          style={[styles.input, props.style]}
          keyboardType="web-search"
          keyboardAppearance="dark"
          autoCapitalize="none"
          autoCompleteType="off"
          textContentType="none"
          placeholderTextColor={colors.gray1}
        ></TextInput>
        <Search width={fs(20)} height={hp(20)} />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(312),
    height: hp(48),
    borderRadius: fs(16),
    backgroundColor: colors.darkBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(14),
    paddingVertical: hp(11),
    opacity: 0.4,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: fs(18),
  },
});

export { SearchInput };
