import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/style';

export default function UserDetails({ userProfile }) {
  if (!userProfile) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.subheading}>No user details available yet.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>View your Details</Text>
      <Text style={styles.detail}>Name: {userProfile.name}</Text>
      <Text style={styles.detail}>Gender: {userProfile.gender}</Text>
      <Text style={styles.detail}>Weight: {userProfile.weight} lbs</Text>
      <Text style={styles.detail}>Height: {Math.floor(userProfile.height / 12)} ft {userProfile.height % 12} in</Text>
      <Text style={styles.detail}>Age: {userProfile.age}</Text>
      <Text style={styles.detail}>Cancer Type: {userProfile.cancerType || 'Not specified'}</Text>
      <Text style={styles.detail}>Stage: {userProfile.stage}</Text>
      <Text style={styles.detail}>Treatment: {userProfile.treatment}</Text>
      <Text style={styles.detail}>Treatment Frequency: {userProfile.treatmentFrequency || 'None'}</Text>
      <Text style={styles.detail}>Next Treatment: {new Date(userProfile.nextTreatmentDate).toLocaleDateString()}</Text>
      <Text style={styles.detail}>Last Treatment: {new Date(userProfile.lastTreatmentDate).toLocaleDateString()}</Text>
      <Text style={styles.detail}>Aerobic Days (Past Week): {userProfile.aerobicDays}</Text>
      <Text style={styles.detail}>Strength Days (Past Week): {userProfile.strengthDays}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    fontSize: 16,
    marginVertical: 5,
  },
});