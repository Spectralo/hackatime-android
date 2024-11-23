import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "./(tabs)/home";
import Settings from "./(tabs)/settings";
import Widgets from "./(tabs)/widgets";
import { MaterialIcons } from "@expo/vector-icons";

export default function Main() {
  const Tab = createMaterialBottomTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      labeled={false}
      style={{
        paddingTop: insets.top,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
