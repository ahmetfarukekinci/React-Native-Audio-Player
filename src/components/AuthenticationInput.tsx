import React from "react";
import {
  TextInput,
  TextInputProps,
  ViewStyle,
  View,
  StyleSheet,
  StyleProp,
  Text,
} from "react-native";
import { fs, wp, hp, colors } from "@styles";
import { Secur, Basic } from "@icons";
type iconType = "mail" | "password";
interface AuthenticationInputProps extends TextInputProps {
  iconType: iconType;
  style?: StyleProp<ViewStyle>;
  error: string | undefined;
  touched: boolean | undefined;
}
const AuthenticationInput: React.FC<AuthenticationInputProps> = ({
  style,
  iconType,
  error,
  touched,
  ...props
}: AuthenticationInputProps) => {
  const icon = iconType === "password" ? <Secur /> : <Basic />;
  return (
    <View style={{ width: wp(276), alignItems: "center" }}>
      <View style={[styles.container, style]}>
        <View style={styles.iconWrapper}>{icon}</View>
        <TextInput
          placeholderTextColor={colors.gray1}
          style={styles.input}
          {...props}
        />
      </View>
      {error && touched && (
        <Text accessibilityRole="alert" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(276),
    height: hp(58),
    borderWidth: fs(1),
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderTopLeftRadius: fs(16),
    borderTopRightRadius: fs(16),
    borderBottomLeftRadius: fs(16),
    paddingLeft: wp(25),
    flexDirection: "row",
  },
  input: {
    flex: 1,
    fontSize: fs(14),
    paddingLeft: wp(25),
    color: "#ffff",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: fs(13),
    color: colors.white,
    marginTop: hp(3),
  },
});
export { AuthenticationInput };
