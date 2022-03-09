import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import ListScreen from "../screens/ListScreen";
import LogInScreen from "../screens/LogInScreen";
import PlayerScreen from "../screens/PlayerScreen";
import ErrorModalScreen from "../screens/ErrorModal";
import * as SecureStore from "expo-secure-store";
import AppLoading from "expo-app-loading";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@store/store";
import { setAccessToken } from "@mainSlice";
const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isTokenValid, setIsTokenValid] = React.useState<boolean>(false);
  const access_token = useSelector<RootState>(
    (state) => state.main.access_token
  );
  const initAuthenticationControls = () => {
    if (access_token !== "") {
      setIsTokenValid(true);
      setLoading(false);
    } else {
      checkAccessTokenFromLocalStorage();
    }
  };
  const checkAccessTokenFromLocalStorage = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) {
      dispatch(setAccessToken(token));
      setIsTokenValid(true);
      setLoading(false);
    } else {
      setLoading(false);
      setIsTokenValid(false);
    }
  };
  React.useEffect(() => {
    initAuthenticationControls();
  }, [access_token]);
  if (loading) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isTokenValid ? (
          <React.Fragment>
            <RootStack.Screen name="LogInScreen" component={LogInScreen} />
            <RootStack.Group
              screenOptions={{ presentation: "fullScreenModal" }}
            >
              <RootStack.Screen
                name="ErrorModalScreen"
                component={ErrorModalScreen}
              />
            </RootStack.Group>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RootStack.Screen name="ListScreen" component={ListScreen} />
            <RootStack.Screen name="PlayerScreen" component={PlayerScreen} />
            <RootStack.Group
              screenOptions={{ presentation: "fullScreenModal" }}
            >
              <RootStack.Screen
                name="ErrorModalScreen"
                component={ErrorModalScreen}
              />
            </RootStack.Group>
          </React.Fragment>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
