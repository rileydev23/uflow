import React from "react";

import { Redirect, Stack } from "expo-router";
import { useSession } from "@/app/ctx";
import { Text, View } from "@/components/Themed";
import LottieView from "lottie-react-native";

export default function ModalLayout() {
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
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}
