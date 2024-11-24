import React from "react";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import HourWidget from "@/widgets/HourWidget";
import getTime from "./scripts/gethours";

const nameToWidget = {
  // Hour will be the **name** with which we will reference our widget.
  Hour: HourWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  let hour = await getTime();
  let str = hour.toString();

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
      props.renderWidget(<Widget hour={str} />);
      break;

    case "WIDGET_UPDATE":
      props.renderWidget(<Widget hour={str} />);
      break;

    case "WIDGET_CLICK":
      props.renderWidget(<Widget hour={str} />);
    default:
      break;
  }
}
