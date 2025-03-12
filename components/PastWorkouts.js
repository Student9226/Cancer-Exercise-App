import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PastWorkouts({ setScreenName, workouts, setWorkouts }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem('workouts');
        const workoutData = storedWorkouts ? JSON.parse(storedWorkouts) : [];
        setWorkouts(workoutData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [setWorkouts]); // Re-fetch when setWorkouts changes

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Text>Loading past workouts...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <View style={[globalStyles.section, { borderBottomColor: 'grey', borderBottomWidth: 1 }]}>
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 10 }}
            onPress={() => setScreenName('Add Workout')}
          >
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>+Add</Text>
          </TouchableOpacity>
          <Text style={globalStyles.heading}>Your Past Workouts</Text>
          <Text style={globalStyles.subheading}>Select a workout to view more details.</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {workouts.length === 0 ? (
          <Text style={globalStyles.subheading}>No workouts recorded yet.</Text>
        ) : (
          workouts.map((workout, index) => (
            <View key={workout.id} style={globalStyles.section}>
              <TouchableOpacity>
                <Text style={globalStyles.heading}>
                  {workout.name} ({workout.type})
                </Text>
                <Text style={globalStyles.subheading}>
                  Date: {new Date(workout.timestamp).toLocaleDateString()}
                </Text>
                <Text style={globalStyles.subheading}>Duration: {workout.duration} min</Text>
                <Text style={globalStyles.subheading}>Intensity: {workout.intensity}</Text>
                {workout.distance > 0 && (
                  <Text style={globalStyles.subheading}>Distance: {workout.distance} km</Text>
                )}
                <Text style={globalStyles.subheading}>Fatigue: {workout.fatigue}</Text>
              </TouchableOpacity>
              {index < workouts.length - 1 && <View style={globalStyles.divider} />}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}