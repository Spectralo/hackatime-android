import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export default async function getTime() {
  let token = await SecureStore.getItemAsync("token");
  let lastPingDate = await AsyncStorage.getItem("lastPingDate");
  const currentTime = new Date();
  const lastPingDateObj = new Date(lastPingDate);
  let timeDifference = currentTime.getTime() - lastPingDateObj.getTime();
  console.log(currentTime);
  console.log(lastPingDateObj);
  console.log("Time difference: ", timeDifference);

  fetchApiDate();

  if (lastPingDate == null || lastPingDate == undefined) {
    console.log("First login or thats strange :/");
  } else if (timeDifference > 1) {
    console.log("Time difference is greater than 3000, lets ping the API :)");
  } else {
    let lastPing = await AsyncStorage.getItem("lastPing");
    console.log(
      "Time difference is less than 3000, lets get the hours from the cache :)",
    );
  }
}

async function fetchApiDate() {
  try {
    Axios.get("https://waka.hackclub.com/api/summary?interval=today", {
      responseType: "json",
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then((response) => {
        console.log(response.data.categories[0].total);
        AsyncStorage.setItem(
          "lastPing",
          JSON.stringify(
            Math.round((response.data.categories[0].total / 60 / 60) * 100) /
              100,
          ),
        );
        AsyncStorage.setItem("lastPingDate", new Date().toLocaleDateString());
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log("Error retrieving token:", e);
  }
}
