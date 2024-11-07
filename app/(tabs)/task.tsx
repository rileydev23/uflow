import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { DatePicker } from "@/components/calendar/Calendar";
import { useState } from "react";
import HorizontalCalendar from "@/components/calendar/HorizontalCalendar";
import Legend from "@/components/calendar/Legend";

export interface IEvents {
  date: string;
  hasTask: boolean;
  hasPersonalEvent: boolean;
  hasEvaluatedEvent: boolean;
}

export default function TaskScreen() {
  const [date, setDate] = useState(new Date());
  const events: IEvents[] = [
    {
      date: "2024-11-01",
      hasTask: true,
      hasPersonalEvent: false,
      hasEvaluatedEvent: true,
    },
    {
      date: "2024-11-03",
      hasTask: false,
      hasPersonalEvent: true,
      hasEvaluatedEvent: false,
    },
    {
      date: "2024-11-09",
      hasTask: true,
      hasPersonalEvent: false,
      hasEvaluatedEvent: false,
    },
    {
      date: "2024-11-10",
      hasTask: true,
      hasPersonalEvent: true,
      hasEvaluatedEvent: true,
    },
    {
      date: "2024-11-15",
      hasTask: true,
      hasPersonalEvent: true,
      hasEvaluatedEvent: false,
    },
    {
      date: "2024-11-16",
      hasTask: false,
      hasPersonalEvent: false,
      hasEvaluatedEvent: true,
    },
    {
      date: "2024-11-18",
      hasTask: false,
      hasPersonalEvent: true,
      hasEvaluatedEvent: true,
    },
    {
      date: "2024-11-21",
      hasTask: true,
      hasPersonalEvent: false,
      hasEvaluatedEvent: false,
    },
    {
      date: "2024-11-23",
      hasTask: true,
      hasPersonalEvent: true,
      hasEvaluatedEvent: false,
    },
    {
      date: "2024-11-25",
      hasTask: false,
      hasPersonalEvent: true,
      hasEvaluatedEvent: true,
    },
  ];

  return (
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <HorizontalCalendar selectedDate={date} setSelectedDate={setDate} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 18,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
