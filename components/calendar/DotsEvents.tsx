import { View } from "../Themed";

interface DotsEventsProps {
  hasTask: boolean;
  hasPersonalEvent: boolean;
  hasEvaluatedEvent: boolean;
}

const DotsEvents = ({
  hasTask,
  hasPersonalEvent,
  hasEvaluatedEvent,
}: DotsEventsProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
        gap: 2,
      }}
    >
      {hasTask && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 100,
            backgroundColor: "#A8E6CF",
          }}
        />
      )}
      {hasPersonalEvent && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 100,
            backgroundColor: "#FFB6C1",
          }}
        />
      )}
      {hasEvaluatedEvent && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 100,
            backgroundColor: "#FFD3B6",
          }}
        />
      )}
      {/* <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 100,
          backgroundColor: "#FFF9B0",
        }}
      /> */}
    </View>
  );
};

export default DotsEvents;
