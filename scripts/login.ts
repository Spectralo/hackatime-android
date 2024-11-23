import Axios from "axios";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function Login(
  withtoken: boolean = false,
  username: string = "",
  password: string,
) {
  let authorized = false;

  if (withtoken) {
    console.log("Logging in with token");
    // Handle token login

    const base64token = base64.encode(password);
    await Axios.get(
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
        // Token is valid
        SecureStore.setItemAsync("token", base64token);
        SecureStore.setItemAsync("undecryptedtoken", password);
        AsyncStorage.setItem("goal", "1");
        AsyncStorage.setItem("weeklygoal", "10");
        AsyncStorage.setItem("lastPingDateWeekly", "0");

        authorized = true;
      })
      .catch((error) => {
        console.log("We're not authorized");
        // Token is invalid
        authorized = false;
      });
  } else {
    // Logging in with username and password
    console.log("Logging in with username and password");

    const extractApiKey = (htmlString: string) => {
      const match = htmlString.match(
        /id="api-key-container"[^>]*value="([^"]*)"/,
      );
      return match ? match[1] : null;
    };

    await Axios.post(
      "https://waka.hackclub.com/login",
      // Use URLSearchParams to properly format form data
      new URLSearchParams({
        username: username,
        password: password,
      }).toString(),
    )
      .then((response) => {
        const apiKey = extractApiKey(response.data);
        if (apiKey == null) {
          authorized = false;
        } else {
          // Token is valid
          let base64token = base64.encode(apiKey);
          SecureStore.setItemAsync("token", base64token);
          SecureStore.setItemAsync("undecryptedtoken", apiKey);
          AsyncStorage.setItem("goal", "1");
          AsyncStorage.setItem("weeklygoal", "10");
          AsyncStorage.setItem("lastPingDateWeekly", "0");
          authorized = true;
        }
      })
      .catch((error) => {
        console.log("Something went wrong");
        console.log(error);
        authorized = false;
      });
  }
  return authorized;
}
