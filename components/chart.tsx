import { useThemeContext } from "@/context/ThemeContext";
import { CryptoChartProps, PricePoint } from "@/type";
import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const screenWidth = Dimensions.get("window").width;

const CryptoChart = ({ title, data }: CryptoChartProps) => {
  const { theme } = useThemeContext();

  if (!data || data.length === 0) {
    return (
      <ThemedView
        style={{
          backgroundColor: theme === "dark" ? "#0d0d0d" : "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          height: 150,
        }}
      >
        <ThemedText style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          No chart data available
        </ThemedText>
      </ThemedView>
    );
  }

  const prices = data.map((p: PricePoint) => p.y);

  return (
    <View style={{ paddingVertical: 10 }}>
      {title && (
        <ThemedText
          style={{
            color: theme === "dark" ? "#fff" : "#000",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 6,
          }}
        >
          {title}
        </ThemedText>
      )}

      <LineChart
        data={{
          labels: [], 
          datasets: [{ 
            data: prices,
            color: (opacity = 1) => theme === 'dark' ? "#fea500" : "#ffb74d", 
          }],
        }}
        width={screenWidth} 
        height={150}
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={true}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        chartConfig={{
          backgroundGradientFrom: theme === "dark" ? "#0d0d0d" : "#fff",
          backgroundGradientTo: theme === "dark" ? "#0d0d0d" : "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) =>
            theme === "dark"
              ? `rgba(255,255,255,${opacity})`
              : `rgba(0,0,0,${opacity})`,
        }}
        bezier={true} 
        style={{
          borderRadius: 10,
          marginLeft: -50,
        }}
      />
    </View>
  );
};

export default CryptoChart;
