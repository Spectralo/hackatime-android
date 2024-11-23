import { View } from "react-native";
import { Text } from "react-native-paper";
import HourWidget from "@/widgets/HourWidget";
import { WidgetPreview } from "react-native-android-widget";

export default function Widgets() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <WidgetPreview
        renderWidget={() => <HourWidget />}
        width={320}
        height={200}
      />
    </View>
  );
}
