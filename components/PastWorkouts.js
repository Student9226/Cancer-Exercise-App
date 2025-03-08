import { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/style';
import { getWorkouts } from './db';

export default function PastWorkouts({ setScreenName }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutData = await getWorkouts();
        setWorkouts(workoutData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

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
          workouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={globalStyles.section}>
              <Text style={globalStyles.heading}>
                {workout.name} ({workout.type})
              </Text>
              <Text style={globalStyles.subheading}>
                Date: {new Date(workout.timestamp).toLocaleDateString()}
              </Text>
              <Text style={globalStyles.subheading}>Duration: {workout.duration} min</Text>
              <Text style={globalStyles.subheading}>Intensity: {workout.intensity}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}