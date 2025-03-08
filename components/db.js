/*import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'exercise_app.db';
const database_version = '1.0';
const database_displayname = 'Exercise App Database';
const database_size = 200000;

let db;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );
  }
  return db;
};

export const createTables = async () => {
  const database = await openDatabase();

  await database.executeSql(
    `CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      benefits TEXT,
      duration TEXT,
      intensity TEXT,
      precautions TEXT,
      media_url TEXT
    );`
  );

  // Create the vitals table
  await database.executeSql(
    `CREATE TABLE IF NOT EXISTS vitals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      waist REAL,
      systolic INTEGER,
      diastolic INTEGER,
      weight REAL,
      timestamp INTEGER NOT NULL
    );`
  );

  // Create the test_results table
  await database.executeSql(
    `CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      test_type TEXT NOT NULL, -- 'walkTest' or 'sitToStand'
      distance REAL, -- For walk test (meters)
      count INTEGER, -- For sit-to-stand test
      timestamp INTEGER NOT NULL
    );`
  );

  // Create the workouts table
  await database.executeSql(
    `CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL, -- 'aerobic' or 'resistance'
      name TEXT,
      duration INTEGER, -- Duration in minutes
      intensity TEXT,
      timestamp INTEGER NOT NULL
    );`
  );

  console.log('All tables created');
};

// --- Exercises ---
export const insertExercise = async (exercise) => {
  const database = await openDatabase();
  const { name, category, description, benefits, duration, intensity, precautions, media_url } = exercise;

  await database.executeSql(
    `INSERT INTO exercises (name, category, description, benefits, duration, intensity, precautions, media_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [name, category, description, benefits, duration, intensity, precautions, media_url]
  );

  console.log('Exercise added');
};

export const getExercises = async () => {
  const database = await openDatabase();
  const [results] = await database.executeSql('SELECT * FROM exercises;');
  let exercises = [];

  for (let i = 0; i < results.rows.length; i++) {
    exercises.push(results.rows.item(i));
  }

  return exercises;
};

// --- Vitals ---
export const insertVitals = async (vitals) => {
  const database = await openDatabase();
  const { waist, systolic, diastolic, weight, timestamp } = vitals;

  await database.executeSql(
    `INSERT INTO vitals (waist, systolic, diastolic, weight, timestamp)
    VALUES (?, ?, ?, ?, ?);`,
    [waist, systolic, diastolic, weight, timestamp]
  );

  console.log('Vitals added');
};

export const getVitalsHistory = async () => {
  const database = await openDatabase();
  const [results] = await database.executeSql('SELECT * FROM vitals ORDER BY timestamp DESC;');
  let vitalsHistory = [];

  for (let i = 0; i < results.rows.length; i++) {
    vitalsHistory.push(results.rows.item(i));
  }

  return vitalsHistory;
};

// --- Test Results ---
export const insertTestResult = async (result) => {
  const database = await openDatabase();
  const { test_type, distance, count, timestamp } = result;

  await database.executeSql(
    `INSERT INTO test_results (test_type, distance, count, timestamp)
    VALUES (?, ?, ?, ?);`,
    [test_type, distance || null, count || null, timestamp]
  );

  console.log('Test result added');
};

export const getTestResults = async () => {
  const database = await openDatabase();
  const [results] = await database.executeSql('SELECT * FROM test_results ORDER BY timestamp DESC;');
  let testResults = [];

  for (let i = 0; i < results.rows.length; i++) {
    testResults.push(results.rows.item(i));
  }

  return testResults;
};

// --- Workouts ---
export const insertWorkout = async (workout) => {
  const database = await openDatabase();
  const { type, name, duration, intensity, timestamp } = workout;

  await database.executeSql(
    `INSERT INTO workouts (type, name, duration, intensity, timestamp)
    VALUES (?, ?, ?, ?, ?);`,
    [type, name || 'Unnamed Workout', duration || 0, intensity || 'Moderate', timestamp]
  );

  console.log('Workout added');
};

export const getWorkouts = async () => {
  const database = await openDatabase();
  const [results] = await database.executeSql('SELECT * FROM workouts ORDER BY timestamp DESC;');
  let workouts = [];

  for (let i = 0; i < results.rows.length; i++) {
    workouts.push(results.rows.item(i));
  }

  return workouts;
};*/
