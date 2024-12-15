import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Legend = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Nomenclatura</Text>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#A8E6CF" }]}
          />
          <Text style={styles.legendText}>Tarea</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#FFD3B6" }]}
          />
          <Text style={styles.legendText}>Evento Evaluado</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#FFB6C1" }]}
          />
          <Text style={styles.legendText}>Evento No Evaluado</Text>
        </View>
        {/* <View style={styles.legendItem}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#FFF9B0" }]}
          />
          <Text style={styles.legendText}>Evento de Trabajo</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    gap: 8,
    // alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legendContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    gap: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});

export default Legend;
