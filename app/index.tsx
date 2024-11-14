import { useColorScheme } from "react-native";
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  ActivityIndicator,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as ReactNavigationDefaultTheme,
  DarkTheme as ReactNavigationDarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Main from "./main";
import Token from "./token";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import React from "react";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";
NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function Index() {
  const [loading, setLoading] = React.useState(false);
  const [isAuth, setAuth] = React.useState(false);

  const Stack = createStackNavigator();

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  const navTheme = {
    ...(colorScheme === "dark"
      ? ReactNavigationDarkTheme
      : ReactNavigationDefaultTheme),
    colors: {
      ...(colorScheme === "dark"
        ? ReactNavigationDarkTheme.colors
        : ReactNavigationDefaultTheme.colors),
      ...paperTheme.colors,
    },
  };

  // Checking token in secure storage (Keep in mind that it's encoded in base64)
  useEffect(() => {
    // Check for the token in SecureStore
    setLoading(true);
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setAuth(token ? true : false);
      } catch (e) {
        console.log("Error retrieving token:", e);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  return loading ? (
    <>
      <ActivityIndicator animating={true} size={"large"} />
    </>
  ) : (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer independent={true} theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuth ? (
            <Stack.Screen name="Main" component={Main} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Token" component={Token} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
