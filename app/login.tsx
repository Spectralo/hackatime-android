import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FastImage
        source={require("../assets/images/logo.png")}
        style={{ height: "30%", width: "100%" }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Welcome to Hackatime Android !
      </Text>
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate("Credentials");
        }}
      >
        Login
      </Button>
    </View>
  );
}
