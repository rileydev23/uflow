import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "../ctx";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";
const { width } = Dimensions.get("window");

interface SemesterCardProps {
  semester: string;
  course: string;
  weeks: string;
  notes: string;
  average: string;
}

const SemesterCard = ({
  semester,
  course,
  weeks,
  notes,
  average,
}: SemesterCardProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>{semester}</Text>
    <Text style={styles.subtitle}>{course}</Text>

    <View style={styles.progressContainer}>
      <View style={styles.progressItem}>
        <ProgressChart
          data={{
            labels: ["grade"],
            data: [0.4],
          }}
          width={80}
          height={80}
          strokeWidth={10}
          radius={28}
          chartConfig={{
            backgroundGradientFrom: "#007BFF",
            backgroundGradientTo: "#007BFF",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 0,
            barPercentage: 0.9,
          }}
          style={{ alignSelf: "center", backgroundColor: "white" }}
          hideLegend
        />
        <Text style={styles.progressLabel}>{weeks}</Text>
        <Text style={styles.progressCaption}>Semana</Text>
      </View>

      <View style={styles.progressItem}>
        <ProgressChart
          data={{
            labels: ["grade"],
            data: [0.4],
          }}
          width={80}
          height={80}
          strokeWidth={10}
          radius={28}
          chartConfig={{
            backgroundGradientFrom: "#007BFF",
            backgroundGradientTo: "#007BFF",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 0,
            barPercentage: 0.9,
          }}
          style={{ alignSelf: "center", backgroundColor: "white" }}
          hideLegend
        />
        <Text style={styles.progressLabel}>{notes}</Text>
        <Text style={styles.progressCaption}>Notas</Text>
      </View>

      <View style={styles.progressItem}>
        <ProgressChart
          data={{
            labels: ["grade"],
            data: [0.4],
          }}
          width={80}
          height={80}
          strokeWidth={10}
          radius={28}
          chartConfig={{
            backgroundGradientFrom: "#007BFF",
            backgroundGradientTo: "#007BFF",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 0,
            barPercentage: 0.9,
          }}
          style={{ alignSelf: "center", backgroundColor: "white" }}
          hideLegend
        />
        <Text style={styles.progressLabel}>{average}</Text>
        <Text style={styles.progressCaption}>Promedio</Text>
      </View>
    </View>
  </View>
);
export default function TabOneScreen() {
  const { user } = useSession();
  // Sample data for upcoming tasks and courses
  const upcomingTasks = [
    { id: "1", name: "Pruebas de Software", due: "Mañana" },
    { id: "2", name: "Proyecto UI", due: "Lunes 26" },
  ];
  const dataSemesters = [
    {
      id: "1",
      semester: "Semestre 3",
      course: "Ingeniería Informática",
      weeks: "10/20",
      notes: "13/24",
      average: "4.7",
    },
    {
      id: "2",
      semester: "Semestre 4",
      course: "Ingeniería Informática",
      weeks: "8/20",
      notes: "15/24",
      average: "4.5",
    },
    {
      id: "3",
      semester: "Semestre 5",
      course: "Ingeniería Informática",
      weeks: "12/20",
      notes: "18/24",
      average: "4.8",
    },
    // Add more cards as needed
  ];
  const courses = [
    {
      id: "1",
      name: "ESPECIALIZACIÓN TECNOLÓGICA III",
      code: "ICC737",
      grade: 6.5,
      totalEvaluations: 7,
      currentEvaluation: 3,
    },
    {
      id: "2",
      name: "PRUEBAS DE SOFTWARE",
      code: "ICC735",
      grade: 4.1,
      totalEvaluations: 3,
      currentEvaluation: 1,
    },
    {
      id: "3",
      name: "ARQUITECTURA DE SOFTWARE",
      code: "ICC731",
      grade: 2.5,
      totalEvaluations: 5,
      currentEvaluation: 2,
    },
    {
      id: "4",
      name: "TRABAJO DE T´TITULO",
      code: "ICC666",
      grade: 5.5,
      totalEvaluations: 2,
      currentEvaluation: 1,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Hola, {user.name}!</Text>

      <FlatList
        data={dataSemesters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SemesterCard
            semester={item.semester}
            course={item.course}
            weeks={item.weeks}
            notes={item.notes}
            average={item.average}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Courses Section */}
      <View style={{ flex: 4, gap: 16 }}>
        <Text style={styles.sectionTitle}>Cursos</Text>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.courseItem}>
              <View style={{ gap: 2, flex: 1 }}>
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.courseCode}>{item.code}</Text>
              </View>
              <View style={{ width: 80, height: 80 }}>
                <ProgressChart
                  data={{
                    labels: ["grade"],
                    data: [item.currentEvaluation / item.totalEvaluations],
                  }}
                  width={80}
                  height={80}
                  strokeWidth={10}
                  radius={28}
                  chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    strokeWidth: 0,
                    barPercentage: 0.9,
                  }}
                  style={{ alignSelf: "center", backgroundColor: "white" }}
                  hideLegend
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    position: "absolute",
                    fontWeight: "600",
                    top: 27,
                    left: 0,
                    right: 0,
                  }}
                >
                  {item.currentEvaluation}/{item.totalEvaluations}
                </Text>
              </View>
              <View style={{ width: 80, height: 80 }}>
                <ProgressChart
                  data={{
                    labels: ["grade"],
                    data: [item.grade / 7],
                  }}
                  width={80}
                  height={80}
                  strokeWidth={10}
                  radius={28}
                  chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    strokeWidth: 0,
                    barPercentage: 0.9,
                  }}
                  style={{ alignSelf: "center", backgroundColor: "white" }}
                  hideLegend
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    position: "absolute",
                    fontWeight: "600",
                    top: 27,
                    left: 0,
                    right: 0,
                  }}
                >
                  {item.grade}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Tareas próximas</Text>
        <FlatList
          data={upcomingTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text style={styles.taskDue}>Fecha de entrega: {item.due}</Text>
              <View></View>
            </View>
          )}
        />
      </View> */}
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
