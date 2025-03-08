import { Text, SafeAreaView, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Vitals({ setScreenName, onSaveVitals }) {
  const [waist, setWaist] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [weight, setWeight] = useState('');
  const [field, setField] = useState(1);
  const [error, setError] = useState('');

  const handleBack = () => {
    if (field !== 1) {
      setField(field - 1);
    } else {
      setScreenName('Dashboard');
    }
  };

  const handleNext = () => {
    if (!isNextEnabled()) {
      setError('Please enter a valid value.');
      return;
    }
    setError('');
    if (field !== 3) {
      setField(field + 1);
    } else {
      onSaveVitals({
        waist: parseFloat(waist) || 0,
        systolic: parseInt(systolic) || 0,
        diastolic: parseInt(diastolic) || 0,
        weight: parseFloat(weight) || 0,
      });
      setScreenName('Dashboard');
    }
  };

  const handleCancel = () => {
    setWaist('');
    setSystolic('');
    setDiastolic('');
    setWeight('');
    setField(1);
    setError('');
    setScreenName('Dashboard');
  };

  const isNextEnabled = () => {
    if (field === 1) return waist.trim() !== '' && !isNaN(parseFloat(waist));
    if (field === 2)
      return (
        systolic.trim() !== '' &&
        diastolic.trim() !== '' &&
        !isNaN(parseInt(systolic)) &&
        !isNaN(parseInt(diastolic))
      );
    if (field === 3) return weight.trim() !== '' && !isNaN(parseFloat(weight));
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Enter Vitals</Text>
      <Text style={styles.subheading}>
        Add your waist measurements, blood pressure, and weight values to track your progress
        over time.
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {field === 1 && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Waist Measurement</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={waist}
            onChangeText={setWaist}
          />
          <Text style={styles.unit}>inches</Text>
        </View>
      )}
      {field === 2 && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Pressure</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.inputHalf}
              keyboardType="numeric"
              value={systolic}
              onChangeText={setSystolic}
            />
            <Text style={styles.separator}>/</Text>
            <TextInput
              style={styles.inputHalf}
              keyboardType="numeric"
              value={diastolic}
              onChangeText={setDiastolic}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.unit}>Systolic (mmHg)</Text>
            <Text style={styles.unit}>Diastolic (mmHg)</Text>
          </View>
        </View>
      )}
      {field === 3 && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={weight}
            onChangeText={setWeight}
          />
          <Text style={styles.unit}>lbs</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isNextEnabled() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!isNextEnabled()}
        >
          <Text style={styles.buttonText}>{field === 3 ? 'Save' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  subheading: { fontSize: 16, textAlign: 'center', marginVertical: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  inputGroup: { alignItems: 'center', marginTop: 20 },
  label: { fontSize: 20, fontWeight: 'bold' },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputHalf: {
    fontSize: 20,
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
    marginVertical: 10,
  },
  separator: { fontSize: 30, marginHorizontal: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  unit: { fontSize: 16, textAlign: 'center', marginVertical: 5 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: { padding: 10, backgroundColor: '#007AFF', borderRadius: 5, minWidth: 80 },
  disabledButton: { backgroundColor: 'gray' },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});