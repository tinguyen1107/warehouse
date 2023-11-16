import { useRouter } from "expo-router";
import { Button, SafeAreaView, Text, View } from "react-native";

export default function HomeScreen() {
  const route = useRouter();
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Welcome to warehouse application</Text>
        <Button title="Start Scan now" onPress={() => route.push("/scan")} />
      </View>
    </SafeAreaView>
  );
}
