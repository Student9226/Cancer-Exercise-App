import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { globalStyles } from '../styles/style';

const ExerciseList = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Hardcoded exercise data
  const exercises = [
    {
      id: '1',
      name: '6 Minute Walk Test',
      subheading: 'A test to measure aerobic capacity...',
      description: 'Walk as far as you can in 6 minutes on a level surface to assess your aerobic endurance. Use the same equipment each time for consistency.',
    },
    {
      id: '2',
      name: 'Biceps Curl',
      subheading: 'Strengthens the upper arm muscles...',
      description: 'Hold a dumbbell in each hand, palms facing up. Bend your elbows to lift the weights toward your shoulders, then lower them back down slowly.',
    },
    {
      id: '3',
      name: 'Bird Dog',
      subheading: 'Improves core stability and balance...',
      description: 'Start on all fours. Extend your right arm forward and left leg backward, hold for a few seconds, then switch sides. Keep your spine neutral.',
    },
    {
      id: '4',
      name: 'Calf Raises',
      subheading: 'Targets the lower leg muscles...',
      description: 'Stand with feet hip-width apart. Rise onto your toes, hold briefly, then lower back down. Use a wall for balance if needed.',
    },
    {
      id: '5',
      name: 'Cool Down',
      subheading: 'Helps your body recover after exercise...',
      description: 'Perform gentle stretches and slow movements for 5-10 minutes to lower your heart rate and prevent stiffness after a workout.',
    },
    {
      id: '6',
      name: 'Dead Bug Beginner',
      subheading: 'Engages the core muscles safely...',
      description: 'Lie on your back with arms and legs up. Lower your right arm and left leg toward the floor, then return to start. Alternate sides.',
    },
    {
      id: '7',
      name: 'Intervals',
      subheading: 'Boosts cardiovascular fitness...',
      description: 'Alternate between high-intensity bursts (e.g., 1 minute of fast walking) and low-intensity recovery (e.g., 2 minutes of slow walking) for 20-30 minutes.',
    },
    {
      id: '8',
      name: 'Lateral Leg Lifts',
      subheading: 'Strengthens the hips and thighs...',
      description: 'Lie on your side with legs straight. Lift your top leg up to a 45-degree angle, hold briefly, then lower it back down. Switch sides.',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedExercise(item)}
      style={{ padding: 10 }}
    >
      <Text style={globalStyles.heading}>{item.name}</Text>
      <Text style={globalStyles.subheading}>{item.subheading}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.section}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {selectedExercise && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedExercise}
          onRequestClose={() => setSelectedExercise(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={globalStyles.heading}>{selectedExercise.name}</Text>
              <Text style={styles.description}>{selectedExercise.description}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedExercise(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default ExerciseList;