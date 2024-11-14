import { View } from "react-native";
import {
  Text,
  TextInput,
  IconButton,
  Button,
  ActivityIndicator,
  Banner,
  Portal,
  Dialog,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import Axios from "axios";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";

export default function Token() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [loginFailed, setLoginFailed] = React.useState(false);
  const [helpVisible, setHelpVisible] = React.useState(false);

  async function verifytoken() {
    console.log("Verifying token...");
    console.log(token);
    setIsLoading(true);
    const base64token = base64.encode(token);
    console.log(base64token);
    Axios.get(
      "https://waka.hackclub.com/api/summary?from=2020-01-01&to=2020-01-02",
      // Arbitrary date range, just to check if the token is valid
      {
        responseType: "json",
        headers: {
          Authorization: "Basic " + base64token,
        },
      },
    )
      .then((response) => {
        console.log(response.data);
        SecureStore.setItemAsync("token").then(() => {
          setIsLoading(false);
          console.log("Token saved");
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setLoginFailed(true);
      });
  }

  return isLoading ? (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator animating={true} size={"large"} />
    </View>
  ) : (
    <>
      {loginFailed ? (
        <Banner
          visible={true}
          style={{ paddingTop: 20 }}
          actions={[
            {
              label: "Dismiss",
              onPress: () => setLoginFailed(false),
            },
          ]}
        >
          Either the service is down or the token is invalid
        </Banner>
      ) : null}

      <View
        style={{
          paddingTop: insets.top,
          flex: 1,
          justifyContent: "center",
          marginLeft: 30,
        }}
      >
        <Text variant="displaySmall">Login</Text>
        <Text variant="labelLarge">Please enter your hackatime token</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <TextInput
            label="Your hackatime token"
            mode="outlined"
            style={{ width: "80%" }}
            value={token}
            onChangeText={(text) => setToken(text)}
          />
          <IconButton
            icon="help"
            mode="contained"
            size={20}
            style={{ marginLeft: 10 }}
            onPress={() => setHelpVisible(true)}
          />
        </View>
        <Button
          mode="contained"
          style={{ marginTop: 30, width: "90%" }}
          onPress={() => verifytoken()}
        >
          Login
        </Button>
      </View>
      <Portal>
        <Dialog visible={helpVisible} onDismiss={() => setHelpVisible(false)}>
          <Dialog.Title>How to get your token ?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Upon signing in at https://waka.hackclub.com/, just click on your
              username (Top right corner) and then, click on "Show API key"
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setHelpVisible(false)}>Understood !</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
