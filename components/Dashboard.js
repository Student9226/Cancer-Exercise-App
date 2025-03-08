import { Text, SafeAreaView, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { globalStyles } from '../styles/style';
import { Accelerometer } from 'expo-sensors';

export default function Dashboard({ setScreenName, setTestType }) {
  const askForPermission = async (test) => {
    try {
      const { granted } = await Accelerometer.requestPermissionsAsync();
      if (granted) {
        setTestType(test);
        setScreenName('WalkTest');
      } else {
        Alert.alert('Permission Denied', 'Motion data permission is required for the walk test.');
      }
    } catch (error) {
      console.error('Permission Error:', error);
      Alert.alert('Error', 'Something went wrong while requesting permission.');
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View>
          <View style={globalStyles.section}>
            <Text style={globalStyles.heading}>You are strong and ready to get stronger!</Text>
            <Text style={globalStyles.subheading}>
              Proceed with the exercise recommendations for today.
            </Text>
          </View>
          <View style={globalStyles.divider} />
        </View>

        <View>
          <View style={globalStyles.section}>
            <Text style={globalStyles.heading}>Time to Test</Text>
            <Text style={globalStyles.subheading}>
              Take these tests to mark the beginning of your fitness journey. Over time, you will
              see you're walking further and getting fitter. {'\n\n'}You will take these tests
              every 6 weeks.
            </Text>
            <TouchableOpacity
              style={globalStyles.button3}
              onPress={() => askForPermission('walkTest')}
            >
              <Text style={globalStyles.button3Text}>Take the 6 Minute Walk Test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button3}
              onPress={() => {
                setTestType('sitToStand');
                setScreenName('WalkTest');
              }}
            >
              <Text style={globalStyles.button3Text}>Take the 30 Second Sit-to-Stand Test</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.divider} />
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.heading}>Vitals</Text>
          <Text style={globalStyles.subheading}>
            Enter your waist measurements and blood pressure values to track your progress over
            time.
          </Text>
          <TouchableOpacity style={globalStyles.button3} onPress={() => setScreenName('Vitals')}>
            <Text style={globalStyles.button3Text}>Enter Vitals</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.divider} />

        <View style={globalStyles.section}>
          <Text style={globalStyles.heading}>Resources</Text>
          <TouchableOpacity onPress={() => setScreenName('Resources')}>
            <Text style={{ color: 'blue' }}>
              Tap here for a guide on how to exercise and other important information
            </Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.divider} />

        <View style={[globalStyles.section, { backgroundColor: 'cadetblue', marginHorizontal: 10 }]}>
          <Text style={globalStyles.heading}>Rating of Perceived Exertion</Text>
          <Text>
            Use this Rating of Perceived Exertion (RPE) as a guide of how hard to exercise when
            you are warming up, doing intervals, and cooling down.
          </Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>9 or 10</Text>
          <Text>Very, very hard: You can barely breathe fast enough, let alone talk.</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>7 or 8</Text>
          <Text>
            Very hard: You can grunt in response but you can be in this pace for a short time.
          </Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>5 or 6</Text>
          <Text>Hard: You can still talk, but slightly breathless.</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>4</Text>
          <Text>
            Somewhat hard: You could sweat a little, but carry on a conversation effortlessly.
          </Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>3</Text>
          <Text>Light: You are still comfortable but breathing a bit harder.</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>2</Text>
          <Text>Very light: Could maintain this pace easily.</Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>1</Text>
          <Text>Very, very light: No exertion here.</Text>
        </View>
        <View style={globalStyles.divider} />

        <View style={globalStyles.section}>
          <Text style={globalStyles.heading}>Week 1</Text>
          <Text style={globalStyles.subheading}>Select the workout you would like to do.</Text>
          <View style={globalStyles.squareContainer}>
            <TouchableOpacity style={globalStyles.square}>
              <Text style={globalStyles.squareText}>0/3</Text>
              <Text style={globalStyles.squareText1}>Aerobic</Text>
              <View style={globalStyles.label}>
                <Text style={globalStyles.labelText}>Start Next</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.square}>
              <Text style={globalStyles.squareText}>0/2</Text>
              <Text style={globalStyles.squareText1}>Resistance</Text>
              <View style={globalStyles.label}>
                <Text style={globalStyles.labelText}>Start Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.divider} />

        <View style={globalStyles.section}>
          <Text style={globalStyles.heading}>Add Workout</Text>
          <Text style={globalStyles.subheading}>
            Manually add your resistance workouts and aerobic exercises that will get added to
            the 'Past Workouts' section.
          </Text>
          <TouchableOpacity
            style={globalStyles.button3}
            onPress={() => setScreenName('Add Workout')}
          >
            <Text style={globalStyles.button3Text}>Add Workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}