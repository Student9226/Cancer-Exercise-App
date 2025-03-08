import { Text, SafeAreaView, View } from 'react-native';
import { globalStyles } from '../styles/style';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import ExerciseList from './ExerciseList';

export default function Resources({ navigation }) {
  const [resource, setResource] = useState('About Exercise');
  const resourceNameArr = [
    'About Exercise',
    'Survivor Guidelines',
    'Benefits of Exercise',
    'How to Exercise Safely',
    'Special Considerations',
    'Breathing Exercises',
    'Exercise List',
  ];
  const resourceInfoArr = [
    'This exercise program evolved from many research with cancer survivors during and following treatment. Over the course of these studies we learned what works to improve the physical and emotional health of the cancer survivors. This section provides an explanation of how the program is set-up and adjusts according to your level of fatigue and, if you are on treatment, by the type of treatment you are receiving and where you are in your treatment.',
    'The science to optimize the training of a cancer survivor or an elite athlete is the same and includes periods of rest (active recovery) and stress (building up and pushing yourself). This program is designed to have a period of 2-3 weeks of stress (building up and pushing yourself) followed by a week of active recovery. During the recovery week you will still exercise, but you will exercise for a shorter amount of time (duration) and perform fewer intervals or intensity.',
    'Intensity is how hard you are working. When you warm-up and cool down you should be going at a comfortable pace. When you do intervals, you need to work a little harder but not so hard that you feel bad. Push yourself so you are walking, jogging, cycling or whatever your aerobic activity is a little faster or harder. You can do this by simply walking faster, going up a hill, jogging faster or increasing the resistance on a stationary bike.',
    'To avoid injury:\n• Begin slowly and progress slowly\n• Wear comfortable clothing and shoes \n• Always warm up at a low intensity\n• Drink water before, during and after the exercise\n• If you exercise outdoors pay attention to your surroundings',
    'Fatigue is the most common side effect of cancer and its treatment. Fatigue is a side effect and can linger long after treatment ends. The most effective treatment for fatigue is exercise! While it may sound counterintuitive, rest will not help you to feel better. Rest actually makes you feel worse because the more you rest the more deconditioned and debilitated you become.',
    'Breathing exercises can make a big difference in your concentration, stress and anxiety level. You can gain more focus and clarity with making the time to take 4 or 5 slow deep breaths. If you have more time you can do deep breathing and hold a picture, a word, or a word phrase to help you relax and be fully present in the moment.',
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.heading}>
        We are here to help you on your fitness journey. The resources below will be helpful.
      </Text>
      <Picker
        selectedValue={resource}
        onValueChange={(itemValue) => setResource(itemValue)}
        style={globalStyles.dropdown}
      >
        {resourceNameArr.map((i) => (
          <Picker.Item key={i} label={i} value={i} />
        ))}
      </Picker>

      <View style={[globalStyles.container, { backgroundColor: 'lightgrey' }]}>
        <Text style={globalStyles.heading}>{resource}</Text>
        <Text style={[globalStyles.subheading, { textAlign: 'justify' }]}>
          {resourceNameArr.indexOf(resource) <= 5 && resourceInfoArr[resourceNameArr.indexOf(resource)]}
        </Text>
        {resourceNameArr.indexOf(resource) === 6 && <ExerciseList />}
      </View>
    </SafeAreaView>
  );
}