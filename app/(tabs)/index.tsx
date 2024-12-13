import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useSession } from "../ctx";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";
import { getAllSemesters, ISemester } from "@/services/semester.service";
import { useEffect, useState } from "react";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

interface SemesterCardProps {
  name: string;
  course: string;
  currentWeek: number;
  weeks: number;
  notes: string;
  average: number;
}

const SemesterCard = ({
  name,
  course,
  currentWeek,
  weeks,
  notes,
  average,
}: SemesterCardProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.subtitle}>{course}</Text>

    <View style={styles.progressContainer}>
      <View style={styles.progressItem}>
        <ProgressChart
          data={{
            labels: ["grade"],
            data: [currentWeek / weeks],
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
        <Text style={styles.progressLabel}>
          {currentWeek}/{weeks}
        </Text>
        <Text style={styles.progressCaption}>Semana</Text>
      </View>

      <View style={styles.progressItem}>
        <ProgressChart
          data={{
            labels: ["grade"],
            data: [0 / 1],
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
        <Text style={styles.progressLabel}>{notes}/12</Text>
        <Text style={styles.progressCaption}>Notas</Text>
      </View>

      <View style={styles.progressItem}>
        <ProgressChart
          data={{
            labels: ["grade"],
            data: [average],
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
        <Text style={styles.progressLabel}>{average}/7,0</Text>
        <Text style={styles.progressCaption}>Promedio</Text>
      </View>
    </View>
  </View>
);
export default function TabOneScreen() {
  const { user, session } = useSession();
  const [semesters, setSemesters] = useState<ISemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<ISemester | null>(
    null
  );

  useEffect(() => {
    if (!session) return;
    getAllSemesters(user._id, session).then((data) => setSemesters(data));
  }, [session]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Hola, {user.name}!</Text>

      <FlatList
        data={semesters}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SemesterCard
            name={item.name}
            course={"INGENIERÍA INFORMÁTICA"}
            currentWeek={item.currentWeek}
            weeks={item.weeksDuration}
            notes={"1"}
            average={item.average}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onViewableItemsChanged={(viewableItems) => {
          setSelectedSemester(viewableItems.viewableItems[0].item);
        }}
      />

      <View style={{ flex: 8, gap: 16 }}>
        <Text style={styles.sectionTitle}>Cursos</Text>
        <FlatList
          data={selectedSemester?.subjects}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, flex: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseItem}
              onPress={() => router.push(`/(modals)/details/${item._id}`)}
            >
              <View style={{ gap: 2, flex: 1 }}>
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.courseCode}>{item.code}</Text>
              </View>
              <View style={{ width: 80, height: 80 }}>
                <ProgressChart
                  data={{
                    labels: ["grade"],
                    data: [1 / 1],
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
                  1/1
                </Text>
              </View>
              <View style={{ width: 80, height: 80 }}>
                <ProgressChart
                  data={{
                    labels: ["grade"],
                    data: [item.average / 7],
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
                  {item.average}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  textAlign: "center",

                  opacity: 0.5,
                }}
              >
                No hay cursos en este semestre
              </Text>
            </View>
          )}
        />
      </View>
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
    paddingVertical: 8,
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
