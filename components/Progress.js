import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { LineChart } from 'react-native-gifted-charts';

const initialLayout = { width: Dimensions.get('window').width };

const LineGraph = ({ title, data }) => {
  // Ensure data is valid before rendering
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0 || data.datasets[0].data.length === 0) {
    return (
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>{title}</Text>
        <Text>No data available yet</Text>
      </View>
    );
  }

  // Convert data to gifted-charts format
  const chartData = data.datasets[0].data.map((value, index) => ({
    value: value,
    label: data.labels[index],
  }));

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphTitle}>{title}</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        color={data.datasets[0].color ? data.datasets[0].color() : '#008000'} // Use custom color if provided (e.g., for BP)
        dataPointsRadius={4}
        dataPointsColor="#008000"
        lineWidth={2}
        curved // Equivalent to bezier
        textColor="#000000"
        textFontSize={12}
        xAxisLabelTextStyle={{ color: '#000000' }}
        yAxisTextStyle={{ color: '#000000' }}
        style={{ borderRadius: 16 }}
      />
    </View>
  );
};

const Progress = ({ vitalsHistory = [], testResults = [] }) => {
  const [index, setIndex] = useState(0);
  const [chartData, setChartData] = useState({
    sixMinuteWalk: { labels: [], datasets: [{ data: [] }] },
    sitToStand: { labels: [], datasets: [{ data: [] }] },
    waistMeasurement: { labels: [], datasets: [{ data: [] }] },
    bloodPressure: { labels: [], datasets: [{ data: [], color: () => '#FF0000' }] },
    weight: { labels: [], datasets: [{ data: [] }] },
  });

  useEffect(() => {
    try {
      // Process Six Minute Walk
      const walkTests = testResults.filter((t) => t.testType === 'walkTest');
      const walkLabels = walkTests.map((t) =>
        new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      const walkData = walkTests.map((t) => parseFloat(t.distance) || 0);

      // Process Sit-to-Stand
      const sitTests = testResults.filter((t) => t.testType === 'sitToStand');
      const sitLabels = sitTests.map((t) =>
        new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      const sitData = sitTests.map((t) => t.count || 0);

      // Process Waist Measurement
      const waistLabels = vitalsHistory.map((v) =>
        new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      const waistData = vitalsHistory.map((v) => v.waist || 0);

      // Process Blood Pressure (Systolic only for simplicity)
      const bpLabels = vitalsHistory.map((v) =>
        new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      const bpData = vitalsHistory.map((v) => v.systolic || 0);
      const weightLabels = vitalsHistory.map((v) =>
      new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const weightData = vitalsHistory.map((v) => v.weight || 0);

      setChartData({
        sixMinuteWalk: { labels: walkLabels, datasets: [{ data: walkData }] },
        sitToStand: { labels: sitLabels, datasets: [{ data: sitData }] },
        waistMeasurement: { labels: waistLabels, datasets: [{ data: waistData }] },
        bloodPressure: {
          labels: bpLabels,
          datasets: [{ data: bpData, color: () => '#FF0000' }],
        },
        weight: { labels: weightLabels, datasets: [{ data: weightData }] },
      });
    } catch (error) {
      console.error('Error processing chart data:', error);
      setChartData({
        sixMinuteWalk: { labels: [], datasets: [{ data: [] }] },
        sitToStand: { labels: [], datasets: [{ data: [] }] },
        waistMeasurement: { labels: [], datasets: [{ data: [] }] },
        bloodPressure: { labels: [], datasets: [{ data: [] }] },
        weight: { labels: [], datasets: [{ data: [] }] },
      });
    }
  }, [vitalsHistory, testResults]);

  const routes = [
    { key: 'sixMinuteWalk', title: 'Six Minute Walk' },
    { key: 'sitToStand', title: '30 Sec Sit to Stand' },
    { key: 'waistMeasurement', title: 'Waist Measurement' },
    { key: 'bloodPressure', title: 'Blood Pressure' },
    { key: 'weight', title: 'Weight' },
  ];

  const renderScene = SceneMap({
    sixMinuteWalk: () => <LineGraph title="Six Minute Walk (m)" data={chartData.sixMinuteWalk} />,
    sitToStand: () => <LineGraph title="30 Sec Sit to Stand (count)" data={chartData.sitToStand} />,
    waistMeasurement: () => (
      <LineGraph title="Waist Measurement (in)" data={chartData.waistMeasurement} />
    ),
    bloodPressure: () => (
      <LineGraph title="Blood Pressure (mmHg)" data={chartData.bloodPressure} />
    ),
    weight: () => <LineGraph title="Weight (lbs)" data={chartData.weight} />,
  });

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            indicatorStyle={styles.tabIndicator}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: { backgroundColor: 'darkgreen' },
  tabLabel: { fontSize: 12, color: 'white', textTransform: 'none' },
  tabIndicator: { backgroundColor: 'white', height: 2 },
  graphContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  graphTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
});

export default Progress;