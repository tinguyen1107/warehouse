import { useRouter } from "expo-router";
import { Button, SafeAreaView, Text, View } from "react-native";

export default function HistoryScreen() {
  const route = useRouter();
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Text style={{ fontSize: 20 }}>History screen</Text>
      </View>
      <Button title="Move to home" onPress={() => route.push("/home")} />
    </SafeAreaView>
  );
}
