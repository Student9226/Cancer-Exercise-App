import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.heading}>View Your Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Name: <Text style={styles.detailValue}>{userProfile.name}</Text></Text>
        <Text style={styles.detail}>Gender: <Text style={styles.detailValue}>{userProfile.gender}</Text></Text>
        <Text style={styles.detail}>Weight: <Text style={styles.detailValue}>{userProfile.weight} lbs</Text></Text>
        <Text style={styles.detail}>Height: <Text style={styles.detailValue}>{Math.floor(userProfile.height / 12)} ft {userProfile.height % 12} in</Text></Text>
        <Text style={styles.detail}>Age: <Text style={styles.detailValue}>{userProfile.age}</Text></Text>
        <Text style={styles.detail}>Cancer Type: <Text style={styles.detailValue}>{userProfile.cancerType || 'Not specified'}</Text></Text>
        <Text style={styles.detail}>Stage: <Text style={styles.detailValue}>{userProfile.stage}</Text></Text>
        <Text style={styles.detail}>Treatment: <Text style={styles.detailValue}>{userProfile.treatment}</Text></Text>
        <Text style={styles.detail}>Treatment Frequency: <Text style={styles.detailValue}>{userProfile.treatmentFrequency || 'None'}</Text></Text>
        <Text style={styles.detail}>Next Treatment: <Text style={styles.detailValue}>{new Date(userProfile.nextTreatmentDate).toLocaleDateString()}</Text></Text>
        <Text style={styles.detail}>Last Treatment: <Text style={styles.detailValue}>{new Date(userProfile.lastTreatmentDate).toLocaleDateString()}</Text></Text>
        <Text style={styles.detail}>Aerobic Days (Past Week): <Text style={styles.detailValue}>{userProfile.aerobicDays}</Text></Text>
        <Text style={styles.detail}>Strength Days (Past Week): <Text style={styles.detailValue}>{userProfile.strengthDays}</Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  detailValue: {
    fontWeight: 'bold',
    color: '#555',
  },
});
