import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
//import { getExercises } from './db';
import { globalStyles } from '../styles/style';

const ExerciseList = () => {
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getExercises();
      setExercises(data);
    } catch (err) {
      setError('Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

if (loading) return <Text>Loading exercises...</Text>;
if (error) return <Text>{error}</Text>;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExercises();
      setExercises(data);
    };

    fetchData();
  }, []);

  return (
  <View style={globalStyles.section}>
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text style={globalStyles.heading}>{item.name}</Text>
          <Text style={globalStyles.subheading}>{item.description}</Text>
        </View>
      )}
    />
  </View>
);
};

export default ExerciseList;
