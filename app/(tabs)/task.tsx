import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { DatePicker } from "@/components/calendar/Calendar";
import { useCallback, useEffect, useState } from "react";
import HorizontalCalendar from "@/components/calendar/HorizontalCalendar";
import Legend from "@/components/calendar/Legend";
import DayView from "@/components/calendar/HoursOfDay";
import { getAllEventsForUser } from "@/services/semester.service";
import { useSession } from "../ctx";

export interface IEvent {
  date: string;
  id: string;
  title: string;
  type: "evaluado" | "no_evaluado";
  time: {
    date: string;
    hour: string;
  };
}

export interface IEventSubject {
  id: string;
  name: string;
  code: string;
}

export default function TaskScreen() {
  const { session, user } = useSession();
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState<
    {
      subject: IEventSubject;
      event: IEvent;
    }[]
  >([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!user || !session) {
      setRefreshing(false);
      return;
    }
    getAllEventsForUser(user._id, session).then((res) => {
      setEvents(res);
      setRefreshing(false);
    });
  }, []);

  const eventsForMonth = useCallback(() => {
    return events.filter(
      ({ event }) => new Date(event.date).getMonth() === date.getMonth()
    ).length;
  }, [events]);

  useEffect(() => {
    onRefresh();
  }, []);

  const eventsBySelectedDate = useCallback(() => {
    return events.filter(
      ({ event }) =>
        new Date(event.date).getDate() === date.getDate() &&
        new Date(event.date).getMonth() === date.getMonth()
    );
  }, [date]);

  return (
    <ScrollView
      style={styles.scrollview}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <HorizontalCalendar
          selectedDate={date}
          setSelectedDate={setDate}
          eventsForMonth={eventsForMonth()}
        />
        <DayView timeDivision={60} currentEvents={eventsBySelectedDate()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 18,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
