import React from "react";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import HourWidget from "@/widgets/HourWidget";

const nameToWidget = {
  // Hour will be the **name** with which we will reference our widget.
  Hour: HourWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
      console.log("Widget added");
      props.renderWidget(<Widget />);
      break;

    case "WIDGET_UPDATE":
      props.renderWidget(<Widget />);
      break;

    case "WIDGET_CLICK":
      props.renderWidget(<Widget />);
    default:
      break;
  }
}
