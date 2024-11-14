import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import Hourcard from "../../components/hourcard";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
      }}
    >
      <Hourcard />
    </View>
  );
}
