import { useColorScheme } from "react-native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as ReactNavigationDefaultTheme,
  DarkTheme as ReactNavigationDarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Main from "./main";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import React from "react";

// Navigation bar transparent
import * as NavigationBar from "expo-navigation-bar";
NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#ffffff01");

export default function Index() {
  const [loading, setLoading] = React.useState(false);

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

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer independent={true} theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Details" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
