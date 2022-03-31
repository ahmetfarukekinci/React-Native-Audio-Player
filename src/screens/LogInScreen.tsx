import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RootStackScreenProps } from "@navigation";
import {
  AuthenticationInput as Input,
  AuthenticationButton as Button,
  SpinnerHOC,
} from "@components";
import { hp, wp, fs, colors } from "@styles";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";
import { useLogInMutation } from "@store/apiSlice";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "../app/store";
import { setAccessToken } from "@mainSlice";
import { Logo } from "@icons";
export interface Values {
  email: string;
  password: string;
}
const initialValues: Values = { email: "", password: "" };
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("E-Mail is required"),
  password: Yup.string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .label("Password"),
});

const SpinnerView = SpinnerHOC(View);

export default function LogInScreen({
  navigation: { navigate },
}: RootStackScreenProps<"LogInScreen">) {
  const [logIn, { isLoading }] = useLogInMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: Values) => {
    try {
      const response = await logIn(values).unwrap();
      console.log("response", response);
      const { access_token } = response;
      await SecureStore.setItemAsync("access_token", access_token);
      dispatch(setAccessToken(access_token));
    } catch (error) {
      navigate("ErrorModalScreen", { text: "Mail or Password is wrong!" });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: Values) => onSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched }) => {
        return (
          <SpinnerView loading={isLoading}>
            <ImageBackground
              source={require("../../assets/images/background.png")}
              style={{ flex: 1 }}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
              >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={styles.container}>
                    <LinearGradient
                      colors={linearGradientColors}
                      style={{
                        ...styles.container,
                        paddingHorizontal: wp(32),
                        paddingTop: hp(56),
                      }}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Logo width={fs(156)} height={hp(72)} />
                      <Text style={styles.text}>
                        Episodic series of digital audio.
                      </Text>
                      <Input
                        iconType="mail"
                        placeholder="E-mail Address"
                        autoCapitalize="none"
                        onChangeText={handleChange("email")}
                        keyboardType="email-address"
                        keyboardAppearance="dark"
                        onBlur={handleBlur("email")}
                        error={errors.email}
                        touched={touched.email}
                        testID="emailInput"
                      />
                      <Input
                        style={{ marginTop: hp(16) }}
                        iconType="password"
                        keyboardAppearance="dark"
                        placeholder="Password"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        error={errors.password}
                        touched={touched.password}
                        testID="passwordInput"
                      />
                      <Button
                        accessibilityRole="button"
                        text="Log In"
                        onPress={() => handleSubmit()}
                        style={{ marginTop: hp(30) }}
                      />
                    </LinearGradient>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </ImageBackground>
          </SpinnerView>
        );
      }}
    </Formik>
  );
}
const linearGradientColors = [
  "rgba(9, 18, 28, 0.9)",
  "rgba(9, 18, 28, 1)",
  "rgba(9, 18, 28, 0.95)",
];

const styles = StyleSheet.create({
  container: {
    width: wp(342),
    height: hp(759),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: fs(24),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
  },
  text: {
    height: hp(60),
    width: wp(195),
    fontSize: fs(24),
    color: colors.white,
    alignSelf: "baseline",
    marginBottom: hp(72),
    marginTop: hp(48),
  },
});
