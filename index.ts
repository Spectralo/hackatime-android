import registerRootComponent from "expo/build/launch/registerRootComponent";
import { registerWidgetTaskHandler } from "react-native-android-widget";

import Index from "@/app/index";
import { widgetTaskHandler } from "./widget-task-handler";

registerRootComponent(Index);
registerWidgetTaskHandler(widgetTaskHandler);
