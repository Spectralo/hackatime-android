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
import Credentials from "./credentials";
import reward from "@/app/(stacks)/rewards";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import React from "react";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";
import { useAtom } from "jotai";
NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");
import { StatusBar } from "expo-status-bar";

// Atoms yay!
import { authAtom, loading } from "@/atoms/auth";
import loadingPage from "./loading";
import LiveClock from "./(stacks)/liveclock";

export default function Index() {
  const [IsLoading, setIsLoading] = useAtom(loading);
  const [isAuth, setAuth] = useAtom(authAtom);

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
    setIsLoading(true);
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setAuth(token ? true : false);
      } catch (e) {
        console.log("Error retrieving token:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar backgroundColor={paperTheme.colors.background} />
      <NavigationContainer independent={true} theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {IsLoading ? (
            <Stack.Screen name="Loading" component={loadingPage} />
          ) : (
            <>
              {isAuth ? (
                <>
                  <Stack.Screen name="Main" component={Main} />
                  <Stack.Screen name="reward" component={reward} />
                  <Stack.Screen name="Liveclock" component={LiveClock} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Token" component={Token} />
                  <Stack.Screen name="Credentials" component={Credentials} />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
