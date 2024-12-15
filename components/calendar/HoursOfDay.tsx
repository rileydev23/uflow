import { IEvent, IEventSubject } from "@/app/(tabs)/task";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface IDayViewProps {
  timeDivision: 60 | 30 | 15;
  currentEvents?: {
    subject: IEventSubject;
    event: IEvent;
  }[];
}

function timeDivisionFn(timeDivision: 60 | 30 | 15) {
  const intervalsPerHour = 60 / timeDivision;
  const totalIntervals = 24 * intervalsPerHour;

  const hours = Array.from({ length: totalIntervals }, (_, i) => {
    const hour = Math.floor(i / intervalsPerHour);
    const minute = (i % intervalsPerHour) * timeDivision;
    const formattedHour = hour % 12 || 12;
    const period = hour < 12 ? "am" : "pm";
    return {
      text: `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`,
      hour: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`,
    };
  });
  return hours;
}

const recordOfColors: Record<
  string,
  { naturalColor: string; lighterColor: string }
> = {
  task: { naturalColor: "#A8E6CF", lighterColor: "#C6E6CF" },
  no_Evaluado: {
    naturalColor: "#FFB6C1",
    lighterColor: "#FFCBD1",
  },
  evaluado: {
    naturalColor: "#FFD3B6",
    lighterColor: "#FFE3C6",
  },
};

const DayView = ({ timeDivision, currentEvents }: IDayViewProps) => {
  console.log(currentEvents);
  const hours = timeDivisionFn(timeDivision);
  return (
    <ScrollView style={styles.container}>
      {hours.map((hour, index) => (
        <View key={index} style={styles.hourRow}>
          <View style={styles.timeHeader}>
            <Text style={styles.hourText}>{hour.text}</Text>
            <View style={{ height: 1, backgroundColor: "#DDD", flex: 1 }} />
          </View>

          <View style={styles.eventContainer}>
            {currentEvents
              ?.filter(({ event }) => event.time?.hour === hour.hour)
              .map(({ subject, event }, index) => (
                <View
                  key={index}
                  style={[
                    styles.event,
                    {
                      backgroundColor: recordOfColors[event.type].lighterColor,
                      borderLeftWidth: 4,
                      borderLeftColor: recordOfColors[event.type].naturalColor,
                    },
                  ]}
                >
                  <Text style={styles.eventText}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>
                    {subject.code} - {subject.name}
                  </Text>
                </View>
              ))}
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
    gap: 6,
  },
  event: {
    padding: 12,
    borderRadius: 8,
    gap: 4,
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
  eventSubtitle: {
    fontSize: 12,
    opacity: 0.4,
  },
});

export default DayView;
