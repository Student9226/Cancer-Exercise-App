import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FirstScreen from "./components/FirstScreen";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import Vitals from "./components/Vitals";
import AddWorkout from "./components/AddWorkout";
import PastWorkouts from "./components/PastWorkouts";
import Resources from "./components/Resources";
import Drawer from "./components/Drawer";
import WalkTest from "./components/WalkTest";
import UserDetails from "./components/UserDetails";
import { globalStyles } from "./styles/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ color: "#000" }}>
            Something went wrong: {this.state.error?.toString()}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [screenName, setScreenName] = React.useState("FirstScreen");
  const [testType, setTestType] = React.useState("sitToStand");
  const [vitalsHistory, setVitalsHistory] = React.useState([]);
  const [testResults, setTestResults] = React.useState([]);
  const [userProfile, setUserProfile] = React.useState(null);
  const [vitals, setVitals] = React.useState({
    waist: "",
    systolic: 0,
    diastolic: 0,
    weight: 0,
  });

  const loadData = async () => {
    try {
      const storedVitals = await AsyncStorage.getItem("vitalsHistory");
      if (storedVitals) setVitalsHistory(JSON.parse(storedVitals) || []);

      const storedTests = await AsyncStorage.getItem("testResults");
      if (storedTests) setTestResults(JSON.parse(storedTests));

      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
        setIsCompleted(true); // If profile exists, assume onboarding is done
        setScreenName("Dashboard"); // Skip FirstScreen if profile is loaded
      }
    } catch (error) {
      console.error("Error loading data from AsyncStorage:", error);
    }
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
  };

  // Load data when app mounts
  React.useEffect(() => {
    loadData();
  }, []);

  const handleSaveVitals = (newVitals) => {
    setVitals(newVitals);
    const newEntry = { ...newVitals, timestamp: Date.now() };
    setVitalsHistory((prev) => {
      const updatedVitals = [...prev, newEntry];
      saveData("vitalsHistory", updatedVitals); // Save updated vitals
      return updatedVitals;
    });
  };

  const handleSaveTestResult = (result) => {
    setTestResults((prev) => {
      const updatedTests = [...prev, result];
      saveData("testResults", updatedTests); // Save updated test results
      return updatedTests;
    });
    setScreenName("Dashboard");
  };

  const toggleDrawer = (newScreen) => {
    setScreenName(newScreen);
    setIsDrawerOpen(false);
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ErrorBoundary>
          <SafeAreaWrapper>
            <View style={globalStyles.header}>
              {!isDrawerOpen && isCompleted && screenName !== "FirstScreen" && (
                <TouchableOpacity
                  onPress={() => setIsDrawerOpen(true)}
                  style={globalStyles.hamburgerButton}
                >
                  <Text style={globalStyles.hamburgerIcon}>☰</Text>
                </TouchableOpacity>
              )}
              <Text style={globalStyles.headerText}>
                {screenName === "FirstScreen"
                  ? "Cancer Exercise App"
                  : screenName === "WalkTest"
                  ? "Test"
                  : screenName}
              </Text>
            </View>

            <>
              {screenName === "FirstScreen" && (
                <FirstScreen
                  setScreenName={setScreenName}
                  setIsCompleted={setIsCompleted}
                  setUserProfile={(profile) => {
                    setUserProfile(profile);
                    saveData("userProfile", profile); // Save user profile when set
                  }}
                />
              )}
              {screenName === "Dashboard" && (
                <Dashboard
                  setScreenName={setScreenName}
                  setTestType={setTestType}
                />
              )}
              {screenName === "Progress" && (
                <Progress
                  vitalsHistory={vitalsHistory}
                  testResults={testResults}
                />
              )}
              {screenName === "Vitals" && (
                <Vitals
                  setScreenName={setScreenName}
                  onSaveVitals={handleSaveVitals}
                />
              )}
              {screenName === "Add Workout" && <AddWorkout />}
              {screenName === "Past Workouts" && (
                <PastWorkouts setScreenName={setScreenName} />
              )}
              {screenName === "Resources" && <Resources />}
              {screenName === "WalkTest" && (
                <WalkTest
                  testType={testType}
                  onSaveTestResult={handleSaveTestResult}
                />
              )}
              {screenName === "User Details" && (
                <UserDetails userProfile={userProfile} />
              )}
            </>

            {isDrawerOpen && (
              <Drawer
                toggleDrawer={toggleDrawer}
                setScreenName={setScreenName}
              />
            )}
          </SafeAreaWrapper>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const SafeAreaWrapper = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#ecf0f1",
      }}
    >
      {children}
    </View>
  );
};
