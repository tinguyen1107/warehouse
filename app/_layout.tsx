import { Tabs } from "expo-router";
import { ReactNode } from "react";
import { Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DropdownComponent } from "../components";
import { Icon } from "react-native-elements";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { apolloClient } from "../libs/graphql";
import { ApolloProvider } from "@apollo/client";

function LogoTitle(props: { url: string }): ReactNode {
  return (
    <Image style={{ width: 20, height: 20 }} source={{ uri: props.url }} />
  );
}

const tabBarGeneralConfig: BottomTabNavigationOptions = {
  tabBarActiveTintColor: "#1790D0",
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "500",
  },
};

const data = [
  { label: "Front Camera", value: "front" },
  { label: "Back Camera", value: "back" },
];

export default function Layout() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Scan",
              tabBarIcon: (props) => (
                // <LogoTitle url="https://reactnative.dev/img/tiny_logo.png" />
                <Icon name="line-scan" type="material-community" {...props} />
              ),
              headerTransparent: true,
              headerLeft: (props) => (
                <DropdownComponent
                  placeholder="Default camera"
                  items={data}
                  onSelected={(item) => {
                    console.log(20125117, "switch camera", item);
                  }}
                />
              ),
              ...tabBarGeneralConfig,
              headerTitle: () => <></>,
            }}
          />
          <Tabs.Screen
            name="history/index"
            options={{
              tabBarLabel: "History",
              tabBarIcon: (props) => (
                // <LogoTitle url="https://reactnative.dev/img/tiny_logo.png" />
                <Icon
                  name="clock-outline"
                  type="material-community"
                  {...props}
                />
              ),
              headerTitle: "Scan history",
              headerShadowVisible: true,
              ...tabBarGeneralConfig,
            }}
          />
          <Tabs.Screen
            name="settings/index"
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: (props) => (
                // <LogoTitle url="https://reactnative.dev/img/tiny_logo.png" />
                <Icon name="cog-outline" type="material-community" {...props} />
              ),
              headerTitle: "Settings",
              ...tabBarGeneralConfig,
            }}
          />
        </Tabs>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
