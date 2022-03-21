import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";
import { SvgProps, SvgXml } from "react-native-svg";
import { fs, wp, hp, colors } from "@styles";
interface ICategoryButton extends TouchableOpacityProps {
  isActive: boolean;
  icon?: React.ElementType;
  title: string;
}
const CategoryButton: React.FC<ICategoryButton> = ({
  isActive,
  title,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: !isActive ? "#19232F" : "gray",
            },
          ]}
        >
          {children}
        </View>
        <Text
          style={[
            styles.text,
            {
              color: !isActive ? colors.gray1 : colors.white,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(90),
    width: wp(80),
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    width: fs(56),
    height: fs(56),
    borderRadius: fs(28),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.gray1,
    fontSize: fs(12),
  },
});
export { CategoryButton };
