import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { DatePickerProps } from "./Calendar";
import { Feather, Ionicons } from "@expo/vector-icons";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const DAY_CONTAINER_WIDTH = 58.8; // Width of each day item, adjust as needed

const getDaysInMonth = (date: Date) => {
  const days = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= lastDay; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

const HorizontalCalendar = ({
  selectedDate,
  setSelectedDate,
  label = "",
}: DatePickerProps) => {
  const daysInMonth = getDaysInMonth(selectedDate);

  const handleDayPress = (date: Date, index: number) => {
    setSelectedDate(date);
  };

  const centerSelectedDay = (index: number) => {
    const scrollOffset = index * DAY_CONTAINER_WIDTH - DAY_CONTAINER_WIDTH * 3; // Center around the 3rd visible item
    scrollViewRef.current?.scrollTo({
      x: Math.max(scrollOffset, 0),
      animated: true,
    });
  };
  const scrollViewRef = useRef<ScrollView>(null);

  //   useCallback to check if date is changed to move

  const suscribeToChange = useCallback(() => {
    const index = daysInMonth.findIndex(
      (date) =>
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth()
    );
    centerSelectedDay(index);
  }, [selectedDate]);

  suscribeToChange();

  useEffect(() => {
    suscribeToChange();
  }, []);

  return (
    <View style={styles.container}>
      {/* Display Selected Date and Activity Count */}
      <View style={styles.headerFather}>
        <View style={styles.header}>
          <Text style={styles.dateText}>
            {selectedDate.getDate()}{" "}
            {capitalizeFirstLetter(
              selectedDate.toLocaleString("es-ES", { month: "long" })
            )}
          </Text>
          <Text style={styles.activitiesText}>5 actividades este mes</Text>
        </View>
        <TouchableOpacity
          onPress={() => setSelectedDate(new Date())}
          style={[
            styles.todayPicker,
            selectedDate.getDate() === new Date().getDate() &&
            selectedDate.getMonth() === new Date().getMonth()
              ? { backgroundColor: "#007AFF" }
              : { backgroundColor: "#ebedef" },
          ]}
        >
          {/* ir a hoy */}
          <Feather
            name="clock"
            size={18}
            color={
              selectedDate.getDate() === new Date().getDate() &&
              selectedDate.getMonth() === new Date().getMonth()
                ? "white"
                : "black"
            }
          />
        </TouchableOpacity>
      </View>

      {/* Horizontal Calendar Scroll */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarContainer}
      >
        {daysInMonth.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              selectedDate.getDate() === date.getDate() &&
              selectedDate.getMonth() === date.getMonth()
                ? styles.selectedDayContainer
                : null,
            ]}
            onPress={() => handleDayPress(date, index)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDate.getDate() === date.getDate()
                  ? styles.selectedDayText
                  : null,
              ]}
            >
              {date.getDate()}
            </Text>
            <Text
              style={[
                styles.dayOfWeekText,
                selectedDate.getDate() === date.getDate()
                  ? styles.selectedDayText
                  : null,
              ]}
            >
              {daysOfWeek[date.getDay()]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    // padding: 20,
    // backgroundColor: "green",
  },
  header: {
    // marginBottom: 16,
  },
  dateText: {
    fontSize: 26,
    fontWeight: "bold",
    opacity: 0.9,
  },
  activitiesText: {
    fontSize: 14,
    opacity: 0.5,
  },
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dayContainer: {
    width: 50,
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  selectedDayContainer: {
    backgroundColor: "#007AFF",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dayOfWeekText: {
    fontSize: 12,
    color: "#888",
  },
  selectedDayText: {
    color: "white",
  },
  todayPicker: {
    padding: 8,
    backgroundColor: "#ebedef",
    borderRadius: 50,
  },
  headerFather: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HorizontalCalendar;
