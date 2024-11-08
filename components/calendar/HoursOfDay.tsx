import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface IDayViewProps {
  timeDivision: 60 | 30 | 15;
}

function timeDivisionFn(timeDivision: 60 | 30 | 15) {
  const intervalsPerHour = 60 / timeDivision;
  const totalIntervals = 24 * intervalsPerHour;

  const hours = Array.from({ length: totalIntervals }, (_, i) => {
    const hour = Math.floor(i / intervalsPerHour);
    const minute = (i % intervalsPerHour) * timeDivision;
    const formattedHour = hour % 12 || 12;
    const period = hour < 12 ? "am" : "pm";
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  });
  return hours;
}

const recordOfColors: Record<
  string,
  { naturalColor: string; lighterColor: string }
> = {
  task: { naturalColor: "#A8E6CF", lighterColor: "#C6E6CF" },
  personalEvent: {
    naturalColor: "#FFB6C1",
    lighterColor: "#FFCBD1",
  },
  evaluatedEvent: {
    naturalColor: "#FFD3B6",
    lighterColor: "#FFE3C6",
  },
};

const DayView = ({ timeDivision }: IDayViewProps) => {
  const hours = timeDivisionFn(timeDivision);
  return (
    <ScrollView style={styles.container}>
      {hours.map((hour, index) => (
        <View key={index} style={styles.hourRow}>
          <View style={styles.timeHeader}>
            <Text style={styles.hourText}>{hour}</Text>
            <View style={{ height: 1, backgroundColor: "#DDD", flex: 1 }} />
          </View>

          <View style={styles.eventContainer}>
            {hour === "8:00 am" && (
              <View style={{ gap: 4 }}>
                <View
                  style={[
                    styles.event,
                    {
                      backgroundColor: recordOfColors["task"].lighterColor,
                      borderLeftWidth: 4,
                      borderLeftColor: recordOfColors["task"].naturalColor,
                    },
                  ]}
                >
                  <Text style={styles.eventText}>Diseño prototipo</Text>
                  <Text style={styles.eventTime}>8:00 - 9:00 AM</Text>
                </View>
                <View
                  style={[
                    styles.event,
                    {
                      backgroundColor:
                        recordOfColors["personalEvent"].lighterColor,
                      borderLeftWidth: 4,
                      borderLeftColor:
                        recordOfColors["personalEvent"].naturalColor,
                    },
                  ]}
                >
                  <Text style={styles.eventText}>Ir al cine</Text>
                  <Text style={styles.eventTime}>8:00 - 10:00 AM</Text>
                </View>
              </View>
            )}
            {hour === "12:00 pm" && (
              <View
                style={[
                  styles.event,
                  {
                    backgroundColor:
                      recordOfColors["evaluatedEvent"].lighterColor,
                    borderLeftWidth: 4,
                    borderLeftColor:
                      recordOfColors["evaluatedEvent"].naturalColor,
                  },
                  ,
                ]}
              >
                <Text style={styles.eventText}>Comidita</Text>
                <Text style={styles.eventTime}>12:00 - 1:00 PM</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  hourRow: {},
  hourText: {
    width: 62,
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
  eventContainer: {
    // marginTop: 5,
    marginLeft: 74,
    borderLeftWidth: 1,
    borderColor: "#DDD",
    minHeight: 40,
    paddingHorizontal: 6,
  },
  event: {
    padding: 12,
    borderRadius: 8,
    gap: 2,
  },
  eventText: {
    fontWeight: "bold",
    color: "#333",
  },
  eventTime: {
    fontSize: 12,
    color: "#666",
  },
  timeHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
});

export default DayView;
