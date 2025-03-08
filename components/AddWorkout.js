import { useState } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { globalStyles } from '../styles/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { insertWorkout } from './db';

export default function AddWorkout({ setScreenName }) {
  const [workoutScreen, setWorkoutScreen] = useState(1); 
  const [showNextPicker, setShowNextPicker] = useState(false);
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [exerciseType, setExerciseType] = useState('');
  const [intensity, setIntensity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fatigue, setFatigue] = useState('');
  const [aerobicExercise, setAerobicExercise] = useState('');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [kilometers, setKilometers] = useState('0');
  const [note, setNote] = useState('');
  const [inputHeight, setInputHeight] = useState(20);

  const disableBack = workoutScreen === 1;
  const disableNext =
    (workoutScreen === 1 && (!exerciseType || !(workoutDate instanceof Date))) ||
    (workoutScreen === 2 && (!intensity || !fatigue)) ||
    (workoutScreen === 3 && (!aerobicExercise || (hours === '0' && minutes === '0' && seconds === '0')));

  const handleWorkoutDateChange = (event, selectedDate) => {
    setShowNextPicker(false);
    if (selectedDate) {
      setWorkoutDate(selectedDate);
    }
  };

  const handleNextPress = async () => {
    if (!disableNext) {
      if (workoutScreen === 3) {
        const duration = parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60; 
        const workout = {
          type: exerciseType.toLowerCase(),
          name: aerobicExercise + (note ? ` - ${note}` : ''),
          duration,
          intensity,
          timestamp: workoutDate.getTime(),
        };
        await insertWorkout(workout);
        setScreenName('Past Workouts');
      } else {
        setWorkoutScreen(workoutScreen + 1);
      }
    }
  };

  const handleBackPress = () => {
    if (workoutScreen !== 1) {
      setWorkoutScreen(workoutScreen - 1);
    } else {
      setScreenName('Dashboard');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
          {workoutScreen === 1 && (
            <>
              <Text style={globalStyles.heading}>Select the date of your workout</Text>
              <TouchableOpacity
                onPress={() => setShowNextPicker(true)}
                style={[globalStyles.button4, { marginTop: 10 }]}
              >
                <Text style={{ textAlign: 'center' }}>
                  {workoutDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showNextPicker && (
                <DateTimePicker
                  value={workoutDate}
                  mode="date"
                  display="default"
                  onChange={handleWorkoutDateChange}
                />
              )}
              <View style={globalStyles.divider} />
              <Text style={globalStyles.heading}>What kind of exercise was it?</Text>
              <TouchableOpacity
                style={[
                  globalStyles.button2,
                  exerciseType === 'Aerobic' && globalStyles.selectedButton,
                ]}
                onPress={() => setExerciseType('Aerobic')}
              >
                <Text>Aerobic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  globalStyles.button2,
                  exerciseType === 'Resistance' && globalStyles.selectedButton,
                ]}
                onPress={() => setExerciseType('Resistance')}
              >
                <Text>Resistance</Text>
              </TouchableOpacity>
            </>
          )}

          {workoutScreen === 2 && (
            <>
              <Text style={{ color: 'blue', textAlign: 'center', fontSize: 15 }}>
                {workoutDate.toLocaleDateString()}
              </Text>
              <Text style={globalStyles.heading}>{exerciseType} Workout</Text>
              <Text style={globalStyles.subheading}>
                Add details to this workout. You can view your entries in the "Past Workouts" section.
              </Text>
              <View style={globalStyles.divider} />
              <Text style={globalStyles.heading}>Intensity</Text>
              <Text style={globalStyles.subheading}>
                Select a level of intensity from 1 - 10 (1 = very light, 10 = very hard).
              </Text>
              <Picker
                selectedValue={intensity}
                onValueChange={(itemValue) => setIntensity(itemValue)}
                style={globalStyles.dropdown}
              >
                <Picker.Item label="Select an option" value="" />
                {[...Array(10)].map((_, i) => (
                  <Picker.Item key={i} label={`${10 - i}`} value={`${10 - i}`} />
                ))}
              </Picker>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.row}>
                  <Text style={styles.intensityText}>Intensity ratings</Text>
                  <Text style={styles.infoIcon}>[i]</Text>
                </View>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.modalScrollContent}>
                      <Text style={styles.modalTitle}>Rating of Perceived Exertion</Text>
                      <Text style={styles.modalText}>
                        Use this Rating of Perceived Exertion (RPE) as a guide of how hard to exercise.
                      </Text>
                      <Text style={styles.modalText}>9 or 10: Very, very hard...</Text>
                      <Text style={styles.modalText}>7 or 8: Very Hard...</Text>
                      <Text style={styles.modalText}>5 or 6: Hard...</Text>
                      <Text style={styles.modalText}>4: Somewhat hard...</Text>
                      <Text style={styles.modalText}>3: Light...</Text>
                      <Text style={styles.modalText}>2: Very light...</Text>
                      <Text style={styles.modalText}>1: Very, very light...</Text>
                    </ScrollView>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.closeButtonText}>Got It</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View style={globalStyles.divider} />
              <Text style={globalStyles.heading}>Fatigue Level</Text>
              <Picker
                selectedValue={fatigue}
                onValueChange={(itemValue) => setFatigue(itemValue)}
                style={globalStyles.dropdown}
              >
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="No Fatigue" value="No Fatigue" />
                <Picker.Item label="Very Mild" value="Very Mild" />
                <Picker.Item label="Mild" value="Mild" />
                <Picker.Item label="Somewhat Fatigued" value="Somewhat Fatigued" />
                <Picker.Item label="Moderate Fatigue" value="Moderate Fatigue" />
                <Picker.Item label="A little more than Moderate" value="A little more than Moderate" />
                <Picker.Item label="Very Fatigued" value="Very Fatigued" />
                <Picker.Item label="Very, Very Fatigued" value="Very, Very Fatigued" />
                <Picker.Item label="Too Fatigued to do most things" value="Too Fatigued" />
                <Picker.Item label="Extreme Fatigue" value="Extreme Fatigue" />
              </Picker>
            </>
          )}

          {workoutScreen === 3 && (
            <>
              <Text style={globalStyles.heading}>Add Exercises</Text>
              <Picker
                selectedValue={aerobicExercise}
                onValueChange={(itemValue) => setAerobicExercise(itemValue)}
                style={globalStyles.dropdown}
              >
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="Cycling- Mountain Bike" value="Cycling- Mountain Bike" />
                <Picker.Item label="Cycling- Road" value="Cycling- Road" />
                <Picker.Item label="Dragon Boating" value="Dragon Boating" />
                <Picker.Item label="Handcycle" value="Handcycle" />
                <Picker.Item label="Hike" value="Hike" />
                <Picker.Item label="Paddling" value="Paddling" />
                <Picker.Item label="Pickleball" value="Pickleball" />
                <Picker.Item label="Pilates" value="Pilates" />
                <Picker.Item label="Run" value="Run" />
                <Picker.Item label="Snowshoes" value="Snowshoes" />
                <Picker.Item label="Swim" value="Swim" />
                <Picker.Item label="Tai Chi" value="Tai Chi" />
                <Picker.Item label="Walk" value="Walk" />
                <Picker.Item label="Wheelchair" value="Wheelchair" />
                <Picker.Item label="XC Ski" value="XC Ski" />
                <Picker.Item label="Yoga" value="Yoga" />
              </Picker>
              <Text style={globalStyles.subheading}>Add your own:</Text>
              <TextInput
                style={{
                  marginHorizontal: 'auto',
                  height: 25,
                  marginVertical: 5,
                  padding: 5,
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 5,
                }}
                value={aerobicExercise}
                onChangeText={setAerobicExercise}
              />
              <View style={globalStyles.divider} />
              <Text style={[globalStyles.heading, { marginBottom: 0 }]}>Duration</Text>
              <View style={globalStyles.inputContainer}>
                <TextInput
                  style={[globalStyles.input, { width: '20%', marginVertical: 0 }]}
                  keyboardType="numeric"
                  value={hours}
                  onChangeText={(val) => {
                    const sanitized = val.replace(/^0+/, '') || '0';
                    if (!isNaN(sanitized) && sanitized >= 0 && sanitized <= 23) setHours(sanitized);
                  }}
                />
                <TextInput
                  style={[globalStyles.input, { width: '20%', marginVertical: 0 }]}
                  keyboardType="numeric"
                  value={minutes}
                  onChangeText={(val) => {
                    const sanitized = val.replace(/^0+/, '') || '0';
                    if (!isNaN(sanitized) && sanitized >= 0 && sanitized <= 59) setMinutes(sanitized);
                  }}
                />
                <TextInput
                  style={[globalStyles.input, { width: '20%', marginVertical: 0 }]}
                  keyboardType="numeric"
                  value={seconds}
                  onChangeText={(val) => {
                    const sanitized = val.replace(/^0+/, '') || '0';
                    if (!isNaN(sanitized) && sanitized >= 0 && sanitized <= 59) setSeconds(sanitized);
                  }}
                />
              </View>
              <View style={globalStyles.inputContainer}>
                <Text style={[globalStyles.subheading, { width: '20%' }]}>Hours</Text>
                <Text style={[globalStyles.subheading, { width: '20%' }]}>Minutes</Text>
                <Text style={[globalStyles.subheading, { width: '20%' }]}>Seconds</Text>
              </View>
              <View style={globalStyles.divider} />
              <Text style={globalStyles.heading}>Distance (Optional)</Text>
              <View style={globalStyles.inputContainer}>
                <TextInput
                  style={[globalStyles.input, { marginHorizontal: '25%', marginVertical: 0 }]}
                  keyboardType="decimal-pad"
                  maxLength={3}
                  value={kilometers}
                  onChangeText={(val) => setKilometers(val || '0')}
                />
              </View>
              <View style={globalStyles.inputContainer}>
                <Text style={[globalStyles.subheading, { textAlign: 'center' }]}>Kilometers</Text>
              </View>
              <View style={globalStyles.divider} />
              <Text style={globalStyles.heading}>Notes (optional)</Text>
              <TextInput
                multiline={true}
                value={note}
                onChangeText={setNote}
                onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  fontSize: 15,
                  padding: 5,
                  borderRadius: 5,
                  minHeight: inputHeight,
                }}
              />
            </>
          )}
        </ScrollView>
        <View
          style={{
            width: '100%',
            height: '12%',
            backgroundColor: 'blue',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={handleBackPress} disabled={disableBack}>
            <Text
              style={[
                { color: 'white', fontSize: 18 },
                disableBack && { color: 'white' },
              ]}
            >
              {workoutScreen === 1 ? 'Cancel' : 'Back'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPress} disabled={disableNext}>
            <Text
              style={[
                { color: 'white', fontSize: 18 },
                disableNext && { color: 'white' },
              ]}
            >
              {workoutScreen === 3 ? 'Save Workout' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityText: {
    color: 'blue',
    fontSize: 15,
  },
  infoIcon: {
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
  },
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
    maxHeight: '80%',
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});