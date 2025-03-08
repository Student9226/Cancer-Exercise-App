import { insertExercise } from './db';

const AddSample = async () => {
  const exercise = {
    name: 'Brisk Walking',
    category: 'Aerobic',
    description: 'Walk at a moderate pace for 30 minutes.',
    benefits: 'Improves heart health, burns calories.',
    duration: '30 minutes',
    intensity: 'Moderate',
    precautions: 'Monitor blood sugar levels before and after.',
    media_url: '',
  };

  await insertExercise(exercise);
};