import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useSession } from "../ctx";
import { View } from "@/components/Themed";
import LottieView from "lottie-react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>["name"];
  color: string;
}) {
  return <Octicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconIonicons(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{
            width: 28,
            height: 28,
          }}
          source={require("../../assets/lottie/loadinghome.json")}
        />
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: "Tareas del día",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ordered" color={color} />
          ),
          tabBarShowLabel: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "500" },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Actividades del mes",
          tabBarIcon: ({ color }) => (
            <TabBarIconIonicons name="calendar-outline" color={color} />
          ),
          tabBarShowLabel: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "500" },
        }}
      />
    </Tabs>
  );
}
