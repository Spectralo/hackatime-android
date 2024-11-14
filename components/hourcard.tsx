import { Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getHours from "../scripts/gethours";

export default function hourCard() {
  const [hours, setHours] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    getHours();
  }, []);

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Card
          style={{
            flex: 1,
          }}
        >
          <Card.Title title="Today hours" />
          <Card.Content>
            <Text variant="displayLarge">{hours} h</Text>
          </Card.Content>
        </Card>
        <Card
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          <Card.Content>
            <Text variant="displayLarge">😊</Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={{ marginTop: 10 }}>
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyLarge">Set your goal</Text>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("Settings")}
          >
            <Text variant="bodyLarge">Go</Text>
          </Button>
        </Card.Content>
      </Card>
    </>
  );
}
