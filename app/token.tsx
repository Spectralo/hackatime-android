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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";

// Auth atom
import { authAtom } from "@/atoms/auth";

// Custom login script
import { Login } from "@/scripts/login";

export default function Token() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const [token, setToken] = useState("");
  const [auth, setAuth] = useAtom(authAtom);
  const [loginFailed, setLoginFailed] = React.useState(false);
  const [helpVisible, setHelpVisible] = React.useState(false);

  const navigation = useNavigation();

  async function handleLogin() {
    setIsLoading(true);
    const loginresult = await Login(true, "", token);
    console.log(loginresult);
    setIsLoading(false);
    if (loginresult == true) {
      setAuth(true);
    } else {
      setLoginFailed(true);
    }
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
          onPress={() => handleLogin()}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          style={{ marginTop: 10, width: "90%" }}
          onPress={() => navigation.navigate("Credentials")}
        >
          Login via username and password instead
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
