import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export default async function getTime() {
  try {
    let lastPingDate = await AsyncStorage.getItem("lastPingDate");
    if (!lastPingDate) {
      console.log("First time for today");
      await fetchApiData();
    } else {
      let lastPingDateInt = parseInt(lastPingDate);
      let currentDate = new Date().getTime();
      let timeDiff = currentDate - lastPingDateInt;
      let minDiff = Math.round(timeDiff / 60000);

      // Only fetch if it's been more than 2.5 minutes
      if (minDiff >= 5) {
        await fetchApiData();
        console.log("We're getting data again!");
      }
    }

    let hour = await AsyncStorage.getItem("lastPing");
    if (hour) {
      let floathour = parseFloat(hour);
      let roundedhour = Math.round(floathour * 100) / 100;
      return roundedhour;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error in getTime:", error);
    return 0;
  }
}

async function fetchApiData() {
  try {
    let token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await Axios.get(
      "https://waka.hackclub.com/api/summary?interval=today",
      {
        responseType: "json",
        headers: {
          Authorization: "Basic " + token,
        },
      },
    );

    const totalHours = response.data.categories[0]?.total || 0;
    const roundedHours = Math.round((totalHours / 60 / 60) * 100) / 100;

    await AsyncStorage.setItem("lastPing", JSON.stringify(roundedHours));
    await AsyncStorage.setItem("lastPingDate", new Date().getTime().toString());
  } catch (error) {
    console.error("Error fetching API data:", error);
    await AsyncStorage.setItem("lastPing", "0");
  }
}
