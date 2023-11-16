import { Tabs } from "expo-router";
import { ReactNode } from "react";
import { Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function LogoTitle(): ReactNode {
  return (
    <Image
      style={{ width: 20, height: 20 }}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: LogoTitle,
            headerTitle: "Home",
          }}
        />
        <Tabs.Screen
          name="scan/index"
          options={{
            tabBarLabel: "Scan",
            tabBarIcon: LogoTitle,
          }}
        />
        <Tabs.Screen
          name="history/index"
          options={{
            tabBarLabel: "History",
            tabBarIcon: LogoTitle,
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: LogoTitle,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
