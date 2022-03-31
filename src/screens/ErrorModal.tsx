import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fs, colors, wp, hp } from "@styles";
import { RootStackScreenProps } from "@navigation";
import { AntDesign } from "@expo/vector-icons";
import { AuthenticationButton as Button } from "@components";
export default function ErrorModalScreen({
  navigation,
  route: {
    params: { text },
  },
}: RootStackScreenProps<"ErrorModalScreen">) {
  return (
    <View style={styles.container}>
      <AntDesign name="frowno" size={fs(80)} color={colors.white} />
      <Text accessibilityRole="alert" style={styles.title}>
        Something went wrong...
      </Text>
      <Text style={styles.content}>{text}</Text>
      <Button text="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: hp(200),
  },
  title: {
    color: colors.white,
    fontSize: fs(30),
    fontWeight: "bold",
    marginTop: hp(10),
  },
  content: {
    color: colors.gray1,
    fontSize: fs(20),
    marginTop: hp(30),
    marginBottom: hp(50),
    width: wp(280),
    textAlign: "justify",
  },
});
