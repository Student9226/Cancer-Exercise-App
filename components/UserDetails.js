import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetails({ userProfile, setUserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile || {});
  const [showNextPicker, setShowNextPicker] = useState(false);
  const [showLastPicker, setShowLastPicker] = useState(false);

  if (!userProfile) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.subheading}>No user details available yet.</Text>
      </View>
    );
  }

  const handleSave = async () => {
    try {
      // Comprehensive validation
      const validatedProfile = { ...editedProfile };

      if (!validatedProfile.name?.trim()) {
        Alert.alert('Error', 'Name is required.');
        return;
      }
      if (!validatedProfile.gender) validatedProfile.gender = 'unspecified'; // Default if not set
      if (!validatedProfile.weight || isNaN(validatedProfile.weight) || validatedProfile.weight <= 0) {
        Alert.alert('Error', 'Please enter a valid weight.');
        return;
      }
      if (!validatedProfile.height || isNaN(validatedProfile.height) || validatedProfile.height <= 0) {
        Alert.alert('Error', 'Please enter a valid height.');
        return;
      }
      if (!validatedProfile.age || isNaN(validatedProfile.age) || validatedProfile.age <= 0) {
        Alert.alert('Error', 'Please enter a valid age.');
        return;
      }
      if (!validatedProfile.cancerType) validatedProfile.cancerType = 'Other'; // Default if not set
      if (!validatedProfile.stage) validatedProfile.stage = 'Unknown'; // Default if not set
      if (!validatedProfile.treatment) validatedProfile.treatment = 'No treatment'; // Default if not set
      if (!validatedProfile.treatmentFrequency) validatedProfile.treatmentFrequency = 'None'; // Default if not set
      if (!validatedProfile.nextTreatmentDate) validatedProfile.nextTreatmentDate = Date.now();
      if (!validatedProfile.lastTreatmentDate) validatedProfile.lastTreatmentDate = Date.now();
      if (isNaN(validatedProfile.aerobicDays) || validatedProfile.aerobicDays < 0) validatedProfile.aerobicDays = 0;
      if (isNaN(validatedProfile.strengthDays) || validatedProfile.strengthDays < 0) validatedProfile.strengthDays = 0;

      // Save to AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(validatedProfile));
      
      // Update parent state
      setUserProfile(validatedProfile);
      
      // Exit editing mode
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditedProfile(userProfile); // Reset to original profile
    setIsEditing(false);
  };

  const handleDateChange = (field, event, selectedDate) => {
    if (field === 'nextTreatmentDate') setShowNextPicker(false);
    if (field === 'lastTreatmentDate') setShowLastPicker(false);
    if (selectedDate) {
      setEditedProfile({ ...editedProfile, [field]: selectedDate.getTime() });
    }
  };

  const renderField = (label, key, type = 'text', options = null) => {
    if (isEditing) {
      if (type === 'picker' && options) {
        return (
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <Picker
              selectedValue={editedProfile[key]}
              onValueChange={(itemValue) => setEditedProfile({ ...editedProfile, [key]: itemValue })}
              style={globalStyles.dropdown}
            >
              {options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        );
      } else if (type === 'date') {
        return (
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <TouchableOpacity
              onPress={() => (key === 'nextTreatmentDate' ? setShowNextPicker(true) : setShowLastPicker(true))}
              style={globalStyles.button2}
            >
              <Text>{new Date(editedProfile[key]).toLocaleDateString()}</Text>
            </TouchableOpacity>
            {(key === 'nextTreatmentDate' && showNextPicker) || (key === 'lastTreatmentDate' && showLastPicker) ? (
              <DateTimePicker
                value={new Date(editedProfile[key])}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(key, event, date)}
              />
            ) : null}
          </View>
        );
      } else {
        return (
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <TextInput
              style={globalStyles.input}
              value={String(editedProfile[key] || '')}
              onChangeText={(value) => {
                if (type === 'number') {
                  setEditedProfile({ ...editedProfile, [key]: value ? parseFloat(value) : 0 });
                } else {
                  setEditedProfile({ ...editedProfile, [key]: value });
                }
              }}
              keyboardType={type === 'number' ? 'numeric' : 'default'}
            />
          </View>
        );
      }
    } else {
      if (type === 'date') {
        return (
          <Text style={styles.detail}>
            {label}: <Text style={styles.detailValue}>{new Date(userProfile[key]).toLocaleDateString()}</Text>
          </Text>
        );
      } else if (key === 'height') {
        return (
          <Text style={styles.detail}>
            {label}: <Text style={styles.detailValue}>{Math.floor(userProfile[key] / 12)} ft {userProfile[key] % 12} in</Text>
          </Text>
        );
      } else {
        return (
          <Text style={styles.detail}>
            {label}: <Text style={styles.detailValue}>{userProfile[key] || 'Not specified'}</Text>
          </Text>
        );
      }
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.heading}>View Your Details</Text>
        {isEditing ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={globalStyles.button3} onPress={handleSave}>
              <Text style={globalStyles.button3Text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.button3} onPress={handleCancel}>
              <Text style={globalStyles.button3Text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={globalStyles.button3} onPress={() => setIsEditing(true)}>
            <Text style={globalStyles.button3Text}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.detailsContainer}>
        {renderField('Name', 'name')}
        {renderField('Gender', 'gender', 'picker', [
          { label: 'Select an option', value: '' },
          { label: 'Female', value: 'Female' },
          { label: 'Male', value: 'Male' },
          { label: 'Unspecified', value: 'unspecified' },
        ])}
        {renderField('Weight', 'weight', 'number')}
        {renderField('Height', 'height', 'number')}
        {renderField('Age', 'age', 'number')}
        {renderField('Cancer Type', 'cancerType', 'picker', [
          { label: 'Select an option', value: '' },
          { label: 'Colorectal', value: 'Colorectal' },
          { label: 'Lymphoma', value: 'Lymphoma' },
          { label: 'Leukemia', value: 'Leukemia' },
          { label: 'Uterine', value: 'Uterine' },
          { label: 'Ovarian', value: 'Ovarian' },
          { label: 'Melanoma', value: 'Melanoma' },
          { label: 'Pancreatic', value: 'Pancreatic' },
          { label: 'Other', value: 'Other' },
        ])}
        {renderField('Stage', 'stage', 'picker', [
          { label: 'Select an option', value: '' },
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: 'Unknown', value: 'Unknown' },
        ])}
        {renderField('Treatment', 'treatment', 'picker', [
          { label: 'Select an option', value: '' },
          { label: 'Surgery', value: 'Surgery' },
          { label: 'Chemotherapy', value: 'Chemotherapy' },
          { label: 'Radiation', value: 'Radiation' },
          { label: 'Immunotherapy', value: 'Immunotherapy' },
          { label: 'Hormone therapy', value: 'Hormone therapy' },
          { label: 'No treatment', value: 'No treatment' },
        ])}
        {renderField('Treatment Frequency', 'treatmentFrequency', 'picker', [
          { label: 'Select an option', value: '' },
          { label: 'Every week', value: 'Every week' },
          { label: 'Every two weeks', value: 'Every two weeks' },
          { label: 'Every three weeks', value: 'Every three weeks' },
          { label: 'Every four weeks', value: 'Every four weeks' },
          { label: 'None', value: 'None' },
        ])}
        {renderField('Next Treatment', 'nextTreatmentDate', 'date')}
        {renderField('Last Treatment', 'lastTreatmentDate', 'date')}
        {renderField('Aerobic Days (Past Week)', 'aerobicDays', 'number')}
        {renderField('Strength Days (Past Week)', 'strengthDays', 'number')}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 20,
  },
  detail: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  detailLabel: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});