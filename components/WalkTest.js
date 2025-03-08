import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { globalStyles } from '../styles/style';

const WalkTest = ({ testType, onSaveTestResult }) => {
  const isWalkTest = testType === 'walkTest';
  const [timeLeft, setTimeLeft] = useState(isWalkTest ? 360 : 30);
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState(0);
  const [sitStandCount, setSitStandCount] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [lastAcceleration, setLastAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (isWalkTest) askForPermission();
  }, [isWalkTest]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (isRunning && isWalkTest) subscribeToAccelerometer();
    return () => unsubscribeFromAccelerometer();
  }, [isRunning, isWalkTest]);

  const askForPermission = async () => {
    const { granted } = await Accelerometer.getPermissionsAsync();
    if (!granted) {
      const { granted: newGrant } = await Accelerometer.requestPermissionsAsync();
      if (!newGrant) {
        Alert.alert('Permission Denied', 'Motion data is required for the walk test.');
      }
    }
  };

  const subscribeToAccelerometer = async () => {
    const isAvailable = await Accelerometer.isAvailableAsync();
    if (!isAvailable) return;
    if (!subscription) {
      const newSubscription = Accelerometer.addListener(({ x, y, z }) => {
        const delta = Math.sqrt(
          Math.pow(x - lastAcceleration.x, 2) +
          Math.pow(y - lastAcceleration.y, 2) +
          Math.pow(z - lastAcceleration.z, 2)
        );
        if (delta > 0.02) setDistance((prev) => prev + delta * 0.5); // Rough estimate
        setLastAcceleration({ x, y, z });
      });
      setSubscription(newSubscription);
      Accelerometer.setUpdateInterval(100);
    }
  };

  const unsubscribeFromAccelerometer = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isWalkTest ? 360 : 30);
    setDistance(0);
    setSitStandCount('');
    unsubscribeFromAccelerometer();
  };

  const handlePause = () => {
    setIsRunning(false);
    unsubscribeFromAccelerometer();
  };

  const handleSave = () => {
    if (isWalkTest) {
      onSaveTestResult({ testType: 'walkTest', distance: distance.toFixed(2), timestamp: Date.now() });
    } else if (sitStandCount.trim() && !isNaN(parseInt(sitStandCount))) {
      onSaveTestResult({
        testType: 'sitToStand',
        count: parseInt(sitStandCount),
        timestamp: Date.now(),
      });
      Alert.alert('Success', 'Test result saved!');
    } else {
      Alert.alert('Error', 'Please enter a valid sit-to-stand count.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={[globalStyles.container, { alignItems: 'center' }]}>
      <Text style={globalStyles.heading}>
        {isWalkTest ? '6 Minute Walk Test' : '30 Second Sit-to-Stand Test'}
      </Text>
      <Text style={globalStyles.subheading}>
        {isWalkTest
          ? 'Walk as far as you can in 6 minutes on a level surface. Use the same equipment each time.'
          : timeLeft !== 0
          ? 'Count each full sit-stand cycle with your arms crossed over your chest in 30 seconds.'
          : 'Enter the number of times each cycle was completed.'}
      </Text>

      {(isWalkTest || timeLeft > 0) && (
        <Text style={{ fontSize: 80, fontWeight: 'bold', color: '#0D1B2A' }}>
          {formatTime(timeLeft)}
        </Text>
      )}

      {isWalkTest ? (
        <Text style={{ fontSize: 20, color: '#5A5A5A' }}>{distance.toFixed(2)} m</Text>
      ) : (
        timeLeft === 0 && (
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              width: '50%',
              textAlign: 'center',
              fontSize: 20,
              marginTop: 20,
            }}
            keyboardType="numeric"
            placeholder="Enter Count"
            value={sitStandCount}
            onChangeText={setSitStandCount}
          />
        )
      )}

      {!isRunning ? (
        (isWalkTest || timeLeft > 0) && (
          <TouchableOpacity
            style={[globalStyles.button3, { width: '75%' }]}
            onPress={() => setIsRunning(true)}
          >
            <Text style={globalStyles.button3Text}>Start Test</Text>
          </TouchableOpacity>
        )
      ) : (
        <>
          <TouchableOpacity
            style={[globalStyles.button3, { width: '75%', backgroundColor: 'lightblue' }]}
            onPress={handlePause}
          >
            <Text style={globalStyles.button3Text}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.button3, { width: '75%', backgroundColor: 'orangered' }]}
            onPress={handleReset}
          >
            <Text style={globalStyles.button3Text}>Reset</Text>
          </TouchableOpacity>
        </>
      )}

      {timeLeft === 0 && (
        <TouchableOpacity
          style={[globalStyles.button3, { width: '75%', marginTop: 20 }]}
          onPress={handleSave}
        >
          <Text style={globalStyles.button3Text}>Save Result</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WalkTest;