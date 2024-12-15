import { useSession } from "@/app/ctx";
import { Text, View } from "@/components/Themed";
import { getEventsFromSubjectId } from "@/services/semester.service";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function HeaderGoBack({ title }: Readonly<{ title: string }>) {
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
  const { user, session } = useSession();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!session) return;
    getEventsFromSubjectId(user._id, id as string, session).then(setData);
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGoBack title="Eventos" />
      <Text style={styles.titleSubject}>
        {data.subject?.code} - {data.subject?.name}
      </Text>
      <FlatList
        data={data.events ?? []}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <View style={styles.eventCardTitle}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text
                style={[
                  styles.grade,
                  {
                    color: item.grade >= 4.0 ? "#1e6aff" : "#ea4e8a",
                  },
                ]}
              >
                {item.grade}
              </Text>
            </View>

            <View style={styles.descParent}>
              <View style={styles.descItem}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={14}
                  style={styles.details}
                />
                <Text style={styles.details}>
                  {new Date(item.date).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </Text>
              </View>
              <Text style={styles.details}>•</Text>
              <View style={styles.descItem}>
                <Ionicons
                  name="bar-chart-outline"
                  size={14}
                  style={styles.details}
                />
                <Text style={styles.details}>{item.weight}%</Text>
              </View>
            </View>

            {/* <Text>Tipo: {item.type}</Text> */}
          </View>
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              flex: 1,
              justifyContent: "center",
              textAlign: "center",
              opacity: 0.5,
            }}
          >
            No hay eventos
          </Text>
        )}
      />
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
  eventCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 4,
    flex: 1,
  },
  grade: {
    fontSize: 26,
    fontWeight: "500",
    opacity: 0.7,
  },
  eventCardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    gap: 48,
  },
  details: { opacity: 0.5, fontSize: 13 },
  descItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  descParent: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    gap: 8,
  },
  titleSubject: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});
