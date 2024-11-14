import { View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
      }}
    >
      <Text variant="headlineLarge">Settings</Text>
      <Text
        variant="titleLarge"
        style={{
          marginTop: 10,
        }}
      >
        Account
      </Text>
      <Button
        mode="contained-tonal"
        style={{
          marginTop: 10,
        }}
        onPress={() => {}}
      >
        Sign out
      </Button>
      <Text
        variant="titleLarge"
        style={{
          marginTop: 20,
        }}
      >
        App Settings
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          justifyContent: "space-between",
        }}
      >
        <Text
          variant="bodyLarge"
          style={{
            marginLeft: 10,
          }}
        >
          Set your goal :
        </Text>
        <TextInput
          mode="outlined"
          label="Goal"
          keyboardType="numeric"
          style={{
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
}
