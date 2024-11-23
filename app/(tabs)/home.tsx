import { View } from "react-native";
import {
  Text,
  Card,
  Button,
  Icon,
  useTheme,
  IconButton,
  Portal,
  Dialog,
  List,
} from "react-native-paper";
import Hourcard from "../../components/hourcard";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import gethours from "@/scripts/gethours";
import { FlatList } from "react-native";

// Atoms yay !
import { goalAtom, projectsList, weeklyGoalAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import getProjects from "@/scripts/getProjects";

export default function Home() {
  const [projectsDialogVisible, setprojectsDialogVisible] = useState(false);
  const theme = useTheme();
  const [goal, setGoal] = useAtom(goalAtom);
  const [weeklyGoal, setWeeklyGoal] = useAtom(weeklyGoalAtom);
  const navigation = useNavigation();
  const [projects, setProjects] = useAtom(projectsList);

  useEffect(() => {
    async function getProjectsDict() {
      const fetchedProjects = await getProjects();
      console.log(fetchedProjects);
      setProjects(fetchedProjects);
    }
    getProjectsDict();
  }, []);

  // Load the goal from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadGoal() {
      const storedGoal = await AsyncStorage.getItem("goal");
      if (storedGoal) setGoal(storedGoal);
    }
    async function loadWeeklyGoal() {
      const storedWeeklyGoal = await AsyncStorage.getItem("weeklygoal");
      setWeeklyGoal(storedWeeklyGoal);
    }
    loadGoal();
    loadWeeklyGoal();
  }, []);

  setInterval(() => {
    // Check if you completed the goal
    async function checkGoal() {
      let hours = await gethours();
      let goalint = parseFloat(goal);
      let lastReward = await AsyncStorage.getItem("lastReward");
      if (hours >= goalint && lastReward !== new Date().toDateString()) {
        navigation.navigate("reward");
        AsyncStorage.setItem("lastReward", new Date().toDateString());
      }
    }
    checkGoal();
  }, 60000);

  return (
    <View
      style={{
        flex: 1,
        margin: 20,
      }}
    >
      <Hourcard />
      <Card
        style={{
          padding: 10,
          paddingVertical: 10,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MaterialIcons
            name="schedule"
            color={theme.colors.primary}
            size={30}
          ></MaterialIcons>

          <Text variant="titleMedium" style={{ marginLeft: 10 }}>
            Live Project Clock
          </Text>
          <Button
            mode="contained-tonal"
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              setprojectsDialogVisible(true);
            }}
          >
            Open
          </Button>
        </View>
      </Card>
      <Portal>
        <Dialog
          visible={projectsDialogVisible}
          onDismiss={() => setprojectsDialogVisible(false)}
        >
          <Dialog.Title>Choose your project</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={projects}
              style={{ maxHeight: 400 }}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <List.Item
                  title={item.key}
                  s
                  onPress={() => {
                    setprojectsDialogVisible(false);
                    navigation.navigate("Liveclock", { project: item.key });
                  }}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-between" }}>
            <Button
              onPress={() => {
                setprojectsDialogVisible(false);
              }}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
