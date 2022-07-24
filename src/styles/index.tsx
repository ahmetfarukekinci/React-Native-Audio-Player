import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export const colors = {
  background: "#09121C",
  white: "#ffffff",
  black: "#000000",
  darkBlue: "#010304",
  gray1: "#898F97",
  sliderColor: "#3369FF",
  gray: "gray",
  activeBlue: "#19232F",
};

const referenceWidth = 376;
const referenceHeight = 812;

export const wp = (width: number) => {
  const givenWidth = (width * 100) / referenceWidth;
  const result = widthPercentageToDP(givenWidth);
  return result;
};

export const hp = (height: number) => {
  const givenHeight = (height * 100) / referenceHeight;
  const result = heightPercentageToDP(givenHeight);
  return result;
};
export const commonStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export const fs = (fontSize: number): number => RFValue(fontSize, referenceHeight);
