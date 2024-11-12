import { Dimensions, Pressable, StyleSheet } from "react-native";

import { Text } from "@/components/Themed";
import { useSession } from "../ctx";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SettingsScreen() {
  const { user, signOut } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Hola, {user.name}</Text>
      <Pressable onPress={signOut}>
        <Text>salir</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,

    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    paddingVertical: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "500" },
  taskItem: {
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    marginBottom: 10,
  },
  taskName: { fontSize: 16, fontWeight: "500" },
  taskDue: { fontSize: 14, color: "#757575" },
  courseItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseName: { fontSize: 16, fontWeight: "500" },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  courseCode: { fontSize: 14, opacity: 0.6 },
  listContainer: {
    alignItems: "center",
  },
  card: {
    width: (width - 32) * 0.95,
    backgroundColor: "#007BFF",
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
    marginHorizontal: (width - 32) * 0.025,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#007BFF",
  },
  progressItem: {
    alignItems: "center",
    backgroundColor: "#007BFF",
  },
  progressLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
  progressCaption: {
    fontSize: 12,
    color: "#ffffffaa",
    marginTop: 3,
  },
});
