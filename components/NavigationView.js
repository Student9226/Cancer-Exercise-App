import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function NavigationView({ screen, disableNext, treatment, setScreenName, handleScreenChange, setModalVisible }) {
  const handleNext = () => {
    if (!disableNext) {
      if (screen === 9) {
        if (treatment === 'Surgery') handleScreenChange(10);
        else if (treatment === 'Hormone therapy' || treatment === 'No treatment') handleScreenChange(12);
        else handleScreenChange(11);
      } else if (screen === 10) {
        handleScreenChange(12);
      } else if (screen === 14) {
        setModalVisible(true); // Open modal when "Yes, I want to try this!" is clicked
      } else {
        handleScreenChange(screen + 1);
      }
    }
  };

  const handleBack = () => {
    if (screen === 11 || screen === 10 || screen === 12) {
      handleScreenChange(9);
    } else if (screen > 1) {
      handleScreenChange(screen - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button3, disableNext && styles.disabledButton, screen === 14 && { width: '80%' }]}
        onPress={handleNext}
        disabled={disableNext}
      >
        <Text style={{ color: 'white' }}>
          {screen === 14 ? 'Yes, I want to try this!' : 'Next'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button4, screen === 14 && { width: '80%' }]}
        onPress={handleBack}
        disabled={screen === 1}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button3: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'blue',
  },
  button4: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});