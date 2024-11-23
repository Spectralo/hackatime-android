import { View } from "react-native";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { goalAtom, weeklyGoalAtom } from "@/atoms/atoms";
import * as SecureStore from "expo-secure-store";
import * as Clipboard from "expo-clipboard";
import { authAtom } from "@/atoms/auth";

export default function Settings() {
  const [goal, setGoal] = useAtom(goalAtom);
  const [weeklyGoal, setWeeklyGoal] = useAtom(weeklyGoalAtom);
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState("");
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync("undecryptedtoken");
      if (token) {
        setToken(token);
      }
    };
    getToken();
  }, []);

  async function setClipboard() {
    await Clipboard.setStringAsync(token);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("undecryptedtoken");
    await SecureStore.deleteItemAsync("token");
    setAuth(false);
  }

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
        Settings
      </Text>
      <Card style={{ padding: 10 }}>
        <Text variant="titleLarge">Your goals :</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              marginLeft: 20,
            }}
          >
            Daily goal :
          </Text>
          <TextInput
            mode="outlined"
            label="Daily hours"
            value={goal}
            keyboardType="numeric"
            style={{
              marginTop: 10,
            }}
            onChangeText={(text) => {
              AsyncStorage.setItem("goal", text); // Save to AsyncStorage
              setGoal(text); // Update the atom
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              marginLeft: 20,
            }}
          >
            Weekly goal :
          </Text>
          <TextInput
            mode="outlined"
            label="Weekly hours"
            value={weeklyGoal}
            keyboardType="numeric"
            style={{
              marginTop: 10,
            }}
            onChangeText={(text) => {
              AsyncStorage.setItem("weeklygoal", text); // Save to AsyncStorage
              setWeeklyGoal(text); // Update the atom
            }}
          />
        </View>
      </Card>
      <Card style={{ padding: 10, marginTop: 20 }}>
        <View>
          <Text variant="titleLarge">Token:</Text>
          <Button
            style={{ marginTop: 20, marginHorizontal: 20 }}
            mode="contained-tonal"
            onPress={() => setVisible(true)}
          >
            Get your token
          </Button>
          <Button
            style={{
              marginTop: 20,
              marginHorizontal: 20,
            }}
            mode="contained-tonal"
            onPress={logout}
          >
            Log-out
          </Button>
        </View>
      </Card>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Copy your token</Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                mode="outlined"
                label="Token"
                value={token}
                style={{
                  marginTop: 10,
                  width: "80%",
                }}
              ></TextInput>
              <IconButton
                mode="contained-tonal"
                icon="content-copy"
                onPress={() => {
                  setClipboard();
                }}
              ></IconButton>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
