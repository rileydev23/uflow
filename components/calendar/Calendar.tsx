import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../Themed";
import { Key, ReactElement, JSXElementConstructor, ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IEvents } from "@/app/(tabs)/calendar";
import DotsEvents from "./DotsEvents";

const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

type day = {
  key: string;
  day: number;
  currentMonth: boolean;
  date: Date;
};
type week = {
  key: number;
  values: day[];
};
function generateArrayOfDays(date: Date) {
  const firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );
  const lastDayPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0);

  const array2D = Array.from({ length: 6 }, (_, i) => {
    return {
      key: i,
      values: Array.from({ length: 7 }, (_, j) => {
        const day = i * 7 + j - firstDayCurrentMonth.getDay() + 1;
        if (day < 1) {
          return {
            key: `${lastDayPreviousMonth.getFullYear()}-${
              lastDayPreviousMonth.getMonth() + 1
            }-${lastDayPreviousMonth.getDate() + day}`,
            day: lastDayPreviousMonth.getDate() + day,
            currentMonth: false,
            date: new Date(
              lastDayPreviousMonth.getFullYear(),
              lastDayPreviousMonth.getMonth(),
              lastDayPreviousMonth.getDate() + day
            ),
          };
        } else if (day > lastDayCurrentMonth.getDate()) {
          return {
            key: `${date.getFullYear()}-${date.getMonth() + 1}-${
              day - lastDayCurrentMonth.getDate()
            }`,
            day: day - lastDayCurrentMonth.getDate(),
            currentMonth: false,
            date: new Date(
              date.getFullYear(),
              date.getMonth() + 1,
              day - lastDayCurrentMonth.getDate()
            ),
          };
        } else {
          return {
            key: `${date.getFullYear()}-${date.getMonth() + 1}-${day}`,
            day: day,
            currentMonth: true,
            date: new Date(date.getFullYear(), date.getMonth(), day),
          };
        }
      }),
    };
  });

  return array2D;
}

export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  label?: string;
  events?: IEvents[];
}
export const DatePicker = ({
  selectedDate,
  setSelectedDate,
  label = "",
  events = [],
}: DatePickerProps) => {
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const changeMonth = (delta: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + delta,
      selectedDate.getDate()
    );

    setSelectedDate(newDate);
  };

  const array2D = generateArrayOfDays(selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthText}>
          {selectedDate.toLocaleString("es-ES", { month: "long" })},{" "}
          {selectedDate.getFullYear()}
        </Text>
        <View style={styles.navigation}>
          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            style={styles.navButton}
          >
            <Ionicons name="chevron-back" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeMonth(1)}
            style={styles.navButton}
          >
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.daysHeader}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayHeaderText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarBody}>
        {array2D.map((weekArray, index) => (
          <View key={index} style={styles.weekRow}>
            {weekArray.values.map(
              (day: {
                key: Key | null | undefined;
                currentMonth: any;
                date: {
                  getMonth: () => number;
                  getFullYear: () => number;
                  getDay: () => number;
                };
                day:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined;
              }) => {
                const event = events.find((event) => event.date === day.key);

                const hasTask = event?.hasTask ?? false;
                const hasPersonalEvent = event?.hasPersonalEvent ?? false;
                const hasEvaluatedEvent = event?.hasEvaluatedEvent ?? false;

                return (
                  <TouchableOpacity
                    key={day.key}
                    onPress={() =>
                      day.currentMonth && handleDateChange(day.date)
                    }
                    style={[
                      styles.dayCell,
                      styles.currentMonthDay,

                      day.currentMonth &&
                      selectedDate.getDate() === day.day &&
                      selectedDate.getMonth() === day.date.getMonth() &&
                      selectedDate.getFullYear() === day.date.getFullYear()
                        ? styles.selectedDay
                        : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        !day.currentMonth && styles.otherMonthDay,
                        day.date && day.date.getDay() === 0 && styles.sunday,
                        day.currentMonth &&
                          selectedDate.getDate() === day.day &&
                          selectedDate.getMonth() === day.date.getMonth() &&
                          selectedDate.getFullYear() ===
                            day.date.getFullYear() &&
                          styles.selectedDayText,
                      ]}
                    >
                      {day.day}
                    </Text>
                    <DotsEvents
                      hasTask={hasTask}
                      hasPersonalEvent={hasPersonalEvent}
                      hasEvaluatedEvent={hasEvaluatedEvent}
                    />
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "500",
  },
  navigation: {
    flexDirection: "row",
    gap: 5,
  },
  navButton: {
    padding: 6,
    backgroundColor: "#ebedef",
    borderRadius: 4,
  },
  navButtonText: {
    fontSize: 18,
    color: "#333",
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
    gap: 8,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: "center",
    opacity: 0.6,
    fontSize: 12,
    fontWeight: "400",
  },
  calendarBody: {
    flexDirection: "column",
    gap: 8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dayCell: {
    minWidth: 45,
    minHeight: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  dayText: {
    fontSize: 16,
  },
  currentMonthDay: {
    backgroundColor: "#fff",
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  selectedDay: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  sunday: {
    color: "red",
  },
  selectedDayText: {
    color: "#fff",
  },
});
