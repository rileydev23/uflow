import { Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "../ctx";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";

export default function TabOneScreen() {
  const { user } = useSession();
  // Sample data for upcoming tasks and courses
  const upcomingTasks = [
    { id: "1", name: "Math Assignment 2", due: "Tomorrow" },
    { id: "2", name: "Physics Quiz", due: "Next Monday" },
  ];

  const courses = [
    { id: "1", name: "ESPECIALIZACIÓN TECNOLÓGICA III", code: "ICC737" },
    { id: "2", name: "PRUEBAS DE SOFTWARE", code: "ICC735" },
    { id: "3", name: "ARQUITECTURA DE SOFTWARE", code: "ICC731" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Hola, {user.name}!</Text>

      {/* Upcoming Tasks Section */}
      <Text style={styles.sectionTitle}>Tareas próximas</Text>
      <FlatList
        data={upcomingTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDue}>Due: {item.due}</Text>
            <View></View>
          </View>
        )}
      />

      {/* Courses Section */}
      <Text style={styles.sectionTitle}>Cursos</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseItem}>
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.courseCode}>{item.code}</Text>
            <ProgressChart
              data={{
                labels: ["Swim", "Bike", "Run"], // optional
                data: [0.4, 0.6, 0.8],
              }}
              width={50}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
              }}
              hideLegend={false}
            />
          </TouchableOpacity>
        )}
      />

      {/* Navigation Buttons */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 18,
    backgroundColor: "#fff",
  },
  greeting: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  taskItem: {
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    marginBottom: 10,
  },
  taskName: { fontSize: 16, fontWeight: "500" },
  taskDue: { fontSize: 14, color: "#757575" },
  courseItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  courseName: { fontSize: 16, fontWeight: "500" },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  courseCode: { fontSize: 14, opacity: 0.6 },
});
