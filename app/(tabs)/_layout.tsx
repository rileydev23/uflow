import React, { useEffect, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { setNotificationToken } from "@/services/auth.service";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useSession } from "../ctx";
import { View } from "@/components/Themed";
import LottieView from "lottie-react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const deviceToken = await (
        await Notifications.getDevicePushTokenAsync()
      ).data;

      return deviceToken;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(
  props: Readonly<{
    name: React.ComponentProps<typeof Octicons>["name"];
    color: string;
  }>
) {
  return <Octicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconIonicons(
  props: Readonly<{
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
  }>
) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { session, isLoading, user, signIn } = useSession();
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    if (isLoading || !session || !user._id) {
      return;
    }
    registerForPushNotificationsAsync().then((notificationToken) => {
      const decryptedToken = JSON.parse(atob(session.split(".")[1]));
      if (decryptedToken.hasNotificationToken) {
        return;
      }
      setNotificationToken(notificationToken, session, user._id).then(
        (response) => {
          signIn(user, response.token);
        }
      );
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isLoading, session]);

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
          headerShown: false,
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
        key={"calendar"}
        options={{
          title: "Actividades del mes",
          tabBarIcon: ({ color }) => (
            <TabBarIconIonicons name="calendar-outline" color={color} />
          ),
          tabBarShowLabel: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "500" },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => (
            <TabBarIconIonicons name="settings-outline" color={color} />
          ),
          tabBarShowLabel: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "500" },
        }}
      />
    </Tabs>
  );
}
