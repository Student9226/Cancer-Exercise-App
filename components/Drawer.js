import React, { useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  View,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

const Drawer = ({ toggleDrawer, setScreenName }) => {
  const translateX = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeDrawer = (screen) => {
    Animated.timing(translateX, {
      toValue: -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => toggleDrawer(screen)); 
  };

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50) {
        closeDrawer('Dashboard'); 
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const handleMenuPress = (screen) => {
    closeDrawer(screen); 
  };

  return (
    <View style={styles.container}>
      {/* Backdrop for closing drawer */}
      <TouchableOpacity style={styles.backdrop} onPress={() => closeDrawer('Dashboard')} />

      {/* Drawer */}
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [-DRAWER_WIDTH, 0],
                    outputRange: [-DRAWER_WIDTH, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => closeDrawer('Dashboard')}
            style={globalStyles.closeButton}
          >
            <Text style={globalStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('Dashboard')}>
            <Text style={globalStyles.menuItem}>🏠 Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('Progress')}>
            <Text style={globalStyles.menuItem}>📈 Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('Vitals')}>
            <Text style={globalStyles.menuItem}>❤️ Vitals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('Add Workout')}>
            <Text style={globalStyles.menuItem}>➕ Add Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('Past Workouts')}>
            <Text style={globalStyles.menuItem}>📜 Past Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('Resources')}>
            <Text style={globalStyles.menuItem}>📚 Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress('User Details')}>
          <Text style={globalStyles.menuItem}>👤 User Details</Text>
        </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, 
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: DRAWER_WIDTH,
    backgroundColor: '#1F002E',
    padding: 16,
    paddingTop: 40, 
  },
});

export default Drawer;