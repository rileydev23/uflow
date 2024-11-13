import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function HeaderGoBack({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.pressable}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>{title}</Text>
      <View style={[{ width: 56 }]} />
    </View>
  );
}

export default function EventsFromSubjectId() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGoBack title="Eventos" />
      <Text>EventsFromSubjectId ${id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressable: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: "500",
  },
});
