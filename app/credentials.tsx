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
import { useNavigation } from "@react-navigation/native";
import { Login } from "@/scripts/login";
import { useAtom } from "jotai";

// Auth atom
import { authAtom } from "@/atoms/auth";

export default function Token() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginFailed, setLoginFailed] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [token, setToken] = React.useState("");
  const [auth, setAuth] = useAtom(authAtom);
  const [passhidden, setPasshidden] = React.useState(true);
  const [icon, setIcon] = React.useState("eye");

  const navigation = useNavigation();

  async function handleLogin() {
    setIsLoading(true);
    const loginresult = await Login(false, username, token);
    if (loginresult) {
      setIsLoading(false);
      setAuth(true);
    } else {
      setIsLoading(false);
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
          style={{
            paddingTop: 20,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
          actions={[
            {
              label: "Dismiss",
              onPress: () => setLoginFailed(false),
            },
          ]}
        >
          Either the service is down or the information you entered is invalid.
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
        <Text variant="labelLarge">Please enter your username & password</Text>

        <TextInput
          label="Your username"
          mode="outlined"
          style={{ width: "90%", marginTop: 30 }}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            label="Your password"
            mode="outlined"
            secureTextEntry={passhidden}
            style={{ width: "80%", marginTop: 5 }}
            value={token}
            onChangeText={(text) => setToken(text)}
          />

          <IconButton
            icon={icon}
            size={20}
            onPress={() => {
              setPasshidden(!passhidden),
                setIcon(icon === "eye" ? "eye-off" : "eye");
            }}
            style={{ marginTop: 20 }}
            mode="contained-tonal"
          ></IconButton>
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
          onPress={() => navigation.navigate("Token")}
        >
          Login with a token instead
        </Button>
      </View>
    </>
  );
}
