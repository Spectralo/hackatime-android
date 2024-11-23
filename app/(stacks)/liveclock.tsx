import getProjects from "@/scripts/getProjects";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Appbar, Card, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LiveClock({ route }) {
  const { project } = route.params;
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      async function getTime() {
        let timeins = await getProjects(true, project);
        console.log(timeins);
        let timeinsintegrer = parseInt(timeins);
        let hrs = Math.floor(timeinsintegrer / 3600)
          .toString()
          .padStart(2, "0");
        let mins = Math.floor((timeinsintegrer % 3600) / 60)
          .toString()
          .padStart(2, "0");
        setHours(hrs);
        setMinutes(mins);
      }
      getTime();
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [project]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        ></Appbar.BackAction>
        <Appbar.Content title="Live Clock" />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 200,
            height: 200, // Set explicit height
            lineHeight: 200, // Match the height
          }}
        >
          {hours}
        </Text>
        <Text
          style={{
            transform: [{ rotate: "90deg" }],
            fontWeight: "bold",
            fontSize: 200,
            height: 200,
            lineHeight: 200,
            marginTop: -100, // Negative margin to pull it up
            marginBottom: -100, // Negative margin to pull next item up
            color: theme.colors.inversePrimary,
          }}
        >
          :
        </Text>
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 200,
            height: 200,
            lineHeight: 240,
          }}
        >
          {minutes}
        </Text>
        <Card style={{ padding: 10, marginTop: "10%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Current project : {project}
          </Text>
        </Card>
      </View>
    </View>
  );
}
