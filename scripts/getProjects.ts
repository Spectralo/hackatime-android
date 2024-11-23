import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export default async function getProjects(
  specificproject: Boolean,
  name: string,
) {
  if (specificproject) {
    return await fetchSpecificProject(name);
  } else {
    try {
      let lastPingDate = await AsyncStorage.getItem("lastPingDateProjects");
      if (!lastPingDate) {
        await fetchApiData();
      } else {
        let lastPingDateInt = parseInt(lastPingDate);
        let currentDate = new Date().getTime();
        let timeDiff = currentDate - lastPingDateInt;
        let minDiff = Math.round(timeDiff / 60000);

        // Only fetch if it's been more than 2.5 minutes
        if (minDiff >= 5) {
          await fetchApiData();
        }
      }

      let projectsList = await AsyncStorage.getItem("projectslist");
      if (projectsList) {
        return JSON.parse(projectsList);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error in getProjects:", error);
      return [];
    }
  }
}

async function fetchApiData() {
  try {
    let token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await Axios.get(
      "https://waka.hackclub.com/api/summary?interval=all_time",
      {
        responseType: "json",
        headers: {
          Authorization: "Basic " + token,
        },
      },
    );

    const projects = response.data.projects || [];
    await AsyncStorage.setItem("projectslist", JSON.stringify(projects));
    await AsyncStorage.setItem(
      "lastPingDateProjects",
      new Date().getTime().toString(),
    );
  } catch (error) {
    console.error("Error fetching API data:", error);
    await AsyncStorage.setItem("projectslist", JSON.stringify([]));
  }
}

async function fetchSpecificProject(name = "unknown") {
  try {
    let token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await Axios.get(
      "https://waka.hackclub.com/api/summary?interval=all_time",
      {
        responseType: "json",
        headers: {
          Authorization: "Basic " + token,
        },
      },
    );
    return (
      response.data.projects.find((project) => project.key === name)?.total ||
      null
    );
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
}
