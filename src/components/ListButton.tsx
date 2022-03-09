import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { fs, wp, hp, colors } from "@styles";
interface IListButton extends TouchableOpacityProps {
  title: string;
  author: string;
}
const ListButton: React.FC<IListButton> = ({ title, author, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[styles.container, props.style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(309),
    height: hp(180),
    backgroundColor: colors.darkBlue,
    borderRadius: fs(24),
    borderBottomRightRadius: 0,
    paddingTop: hp(25),
    paddingHorizontal: wp(30),
    marginTop: hp(20),
  },
  title: {
    color: colors.white,
    fontSize: fs(24),
  },
  author: {
    color: colors.white,
    fontSize: fs(13),
    fontWeight: "400",
    marginTop: hp(20),
  },
});
export { ListButton };
