import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

export default function HourWidget() {
  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2e8cf",
        borderRadius: 16,
      }}
    >
      <TextWidget
        text="Today's time"
        style={{
          fontSize: 32,
          fontFamily: "Inter",
          color: "#000000",
        }}
      />
      <TextWidget
        text="01:02"
        style={{
          fontSize: 64,
        }}
      />
    </FlexWidget>
  );
}
