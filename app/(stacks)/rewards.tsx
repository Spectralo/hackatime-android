import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Reward() {
  const [text, setText] = useState("");
  const codingQuotes = [
    "First, solve the problem. Then, write the code. – John Johnson",
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "The best way to predict the future is to invent it. – Alan Kay",
    "It’s not a bug; it’s an undocumented feature. – Anonymous",
    "A good programmer is someone who always looks both ways before crossing a one-way street. – Doug Linder",
    "Programming is the art of telling another human what one wants the computer to do. – Donald Knuth",
    "Programs must be written for people to read, and only incidentally for machines to execute. – Harold Abelson",
    "Simplicity is the soul of efficiency. – Austin Freeman",
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
    "Before software can be reusable, it first has to be usable. – Ralph Johnson",
    "Make it work, make it right, make it fast. – Kent Beck",
    "The most damaging phrase in the language is: ‘We’ve always done it this way.’ – Grace Hopper",
    "Learning to write programs stretches your mind and helps you think better. – Bill Gates",
    "Code never lies, comments sometimes do. – Ron Jeffries",
    "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
    "Software and cathedrals are much the same – first we build them, then we pray. – Anonymous",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in. – Edsger Dijkstra",
    "Programming isn't about what you know; it’s about what you can figure out. – Chris Pine",
    "Don’t comment bad code – rewrite it. – Brian Kernighan",
  ];

  const navigation = useNavigation();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * codingQuotes.length);
    setText(codingQuotes[randomIndex]);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <Text
        variant="displaySmall"
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        You achieved your goal today !
      </Text>
      <Text
        style={{
          fontSize: 100,
        }}
      >
        💫
      </Text>
      <Text
        variant="titleMedium"
        style={{
          marginTop: 20,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {text}
      </Text>
      <Button
        mode="contained"
        style={{
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Let's go!
      </Button>
    </View>
  );
}
