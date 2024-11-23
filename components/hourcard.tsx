import { View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useAtom } from "jotai";
import { goalAtom, weeklyGoalAtom } from "@/atoms/atoms";
import { useEffect, useState } from "react";
import getHours from "@/scripts/gethours";
import getEmmojiRating from "@/scripts/emmojirating";
import { useNavigation } from "@react-navigation/native";
import getWeekTime from "@/scripts/getweekhours";

export default function HourCard() {
  const [goal] = useAtom(goalAtom); // Access the shared goal state
  const [weeklygoal] = useAtom(weeklyGoalAtom);
  const [hours, setHours] = useState(0);
  const [emojiRating, setEmojiRating] = useState("🤔");
  const [percentage, setPercentage] = useState(0);

  let navigation = useNavigation();

  async function fetchData() {
    const todayHours = await getHours();
    const weekHours = await getWeekTime();
    const rating = await getEmmojiRating(todayHours, goal);
    setHours(todayHours);
    setEmojiRating(rating);
    console.log("week hours" + weekHours);
    let percentageweekly =
      Math.floor((weekHours / parseInt(weeklygoal)) * 100 * 100) / 100;
    setPercentage(percentageweekly);
  }

  fetchData();

  setInterval(() => {
    fetchData();
  }, 30000);

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Card style={{ flex: 1 }}>
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
            <Text variant="displayLarge">{emojiRating}</Text>
          </Card.Content>
        </Card>
      </View>
      <View>
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
        <Card
          style={{
            marginTop: 10,
          }}
        >
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text variant="displaySmall">{percentage}% </Text>
              <Text variant="bodyLarge">of your weekly goal!</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
