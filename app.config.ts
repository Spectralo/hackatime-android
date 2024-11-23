import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "hackatime-android",
  slug: "hackatime-android",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "hackandroid",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#f2e8cf",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.spectralo.hackatime",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#f2e8cf",
    },
    package: "com.spectralo.hackatime",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "react-native-android-widget",
      {
        widgets: [
          {
            name: "Hour", // Valid resource name
            label: "Daily hours",
            minWidth: "180dp",
            minHeight: "120dp",
            targetCellWidth: 3,
            targetCellHeight: 2,
            description:
              "This widget displays the hours you have coded today. Refreshes every 30mins",
            previewImage: "./assets/widget-preview/hour.png", // Update the filename if necessary
            updatePeriodMillis: 1800000,
          },
        ],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "b289a892-e1e7-41b2-bd59-2d709f8cce8a",
    },
  },
});
