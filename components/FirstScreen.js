import { Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { globalStyles } from "../styles/style";
import NavigationView from "./NavigationView";

export default function FirstScreen({
  setScreenName,
  setIsCompleted,
  setUserProfile,
}) {
  const [screen, setScreen] = useState(1);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("0");
  const [foot, setFoot] = useState("5");
  const [inches, setInches] = useState("0");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [stage, setStage] = useState("");
  const [treatment, setTreatment] = useState("");
  const [treatmentFrequency, setTreatmentFrequency] = useState(null);
  const [nextTreatmentDate, setNextTreatmentDate] = useState(new Date());
  const [lastTreatmentDate, setLastTreatmentDate] = useState(new Date());
  const [showNextPicker, setShowNextPicker] = useState(false);
  const [showLastPicker, setShowLastPicker] = useState(false);
  const [days, setDays] = useState("0");
  const [days1, setDays1] = useState("0");
  const [modalVisible, setModalVisible] = useState(false);
  const totalScreens = 14;

  const handleCompleteFirstTime = () => {
    const userProfile = {
      name,
      gender,
      weight: parseFloat(weight),
      height: parseInt(foot) * 12 + parseInt(inches),
      age: parseInt(age),
      cancerType,
      stage,
      treatment,
      treatmentFrequency,
      nextTreatmentDate: nextTreatmentDate.getTime(),
      lastTreatmentDate: lastTreatmentDate.getTime(),
      aerobicDays: parseInt(days),
      strengthDays: parseInt(days1),
    };
    setModalVisible(false);
    setScreenName("Dashboard");
    setIsCompleted(true);
    setUserProfile(userProfile);
  };

  const progress = (() => {
    if (screen === 10 || screen === 11 || screen === 12) {
      return (11 / totalScreens) * 100;
    }
    return (screen / totalScreens) * 100;
  })();

  const handleNextTreatmentDateChange = (event, selectedDate) => {
    setShowNextPicker(false);
    if (selectedDate) {
      setNextTreatmentDate(selectedDate);
    }
  };

  const handleLastTreatmentDateChange = (event, selectedDate) => {
    setShowLastPicker(false);
    if (selectedDate) {
      setLastTreatmentDate(selectedDate);
    }
  };

  const isNextEnabled = () => {
    if (screen === 11)
      return (
        treatmentFrequency &&
        treatmentFrequency !== "None" &&
        nextTreatmentDate instanceof Date &&
        lastTreatmentDate instanceof Date
      );
    if (screen === 9) return treatment.length > 0;
    if (screen === 8) return stage.length > 0 || stage > 0;
    if (screen === 7)
      return (
        cancerType && cancerType !== "" && cancerType !== "Select an option"
      );
    if (screen === 6) return age && parseInt(age) > 0;
    if (screen === 5) return name.trim().length > 0;
    if (screen === 4) return foot && parseInt(foot) > 0;
    if (screen === 3) return weight && parseFloat(weight) > 0;
    if (screen === 2) return gender.length > 0;
    return true;
  };

  const handleScreenChange = (newScreen) => {
    setScreen(newScreen);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.progressBar}>
        <View style={[globalStyles.progress, { width: `${progress}%` }]} />
      </View>

      {screen === 1 && (
        <>
          <Text style={globalStyles.heading}>
            Welcome to Cancer Exercise App
          </Text>
          <Text style={globalStyles.paragraph}>
            Your custom exercise program will be tailored to you based on:
          </Text>
          <View style={globalStyles.listContainer}>
            <Text>• your daily fatigue</Text>
            <Text>• on/off treatment</Text>
            <Text>• treatment type</Text>
            <Text>• your basic info</Text>
          </View>
        </>
      )}

      {screen === 2 && (
        <>
          <Text style={globalStyles.heading}>Tell us about yourself</Text>
          <TouchableOpacity
            style={[
              globalStyles.button2,
              gender === "Female" && globalStyles.selectedButton,
            ]}
            onPress={() => setGender("Female")}
          >
            <Text>I'm Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.button2,
              gender === "Male" && globalStyles.selectedButton,
            ]}
            onPress={() => setGender("Male")}
          >
            <Text>I'm Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.button2,
              gender === "unspecified" && globalStyles.selectedButton,
            ]}
            onPress={() => setGender("unspecified")}
          >
            <Text>I'll leave this unspecified</Text>
          </TouchableOpacity>
        </>
      )}

      {screen === 3 && (
        <>
          <Text style={globalStyles.heading}>What is your weight?</Text>
          <View style={globalStyles.inputContainer}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setWeight((prev) =>
                  parseFloat(prev) > 0 ? `${parseFloat(prev) - 1}` : "0"
                )
              }
            >
              <Text style={globalStyles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setWeight((prev) => (prev ? `${parseFloat(prev) + 1}` : "1"))
              }
            >
              <Text style={globalStyles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={globalStyles.subheading}>lbs.</Text>
        </>
      )}

      {screen === 4 && (
        <>
          <Text style={globalStyles.heading}>What is your height?</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={[globalStyles.input, { width: "40%", marginBottom: 0 }]}
              keyboardType="numeric"
              value={foot}
              onChangeText={setFoot}
            />
            <TextInput
              style={[globalStyles.input, { width: "40%", marginBottom: 0 }]}
              keyboardType="numeric"
              value={inches}
              onChangeText={setInches}
            />
          </View>
          <View style={globalStyles.inputContainer}>
            <Text style={[globalStyles.subheading, { width: "40%" }]}>
              Foot
            </Text>
            <Text style={[globalStyles.subheading, { width: "40%" }]}>
              Inches
            </Text>
          </View>
        </>
      )}

      {screen === 5 && (
        <>
          <Text style={globalStyles.heading}>What is your name?</Text>
          <View style={globalStyles.inputContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </>
      )}

      {screen === 6 && (
        <>
          <Text style={globalStyles.heading}>How old are you?</Text>
          <View style={globalStyles.inputContainer}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setAge((prev) =>
                  parseInt(prev) > 0 ? `${parseInt(prev) - 1}` : "0"
                )
              }
            >
              <Text style={globalStyles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
            />
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setAge((prev) => (prev ? `${parseInt(prev) + 1}` : "1"))
              }
            >
              <Text style={globalStyles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 7 && (
        <>
          <Text style={globalStyles.heading}>
            What type of cancer did you have?
          </Text>
          <Picker
            selectedValue={cancerType}
            onValueChange={(itemValue) => setCancerType(itemValue)}
            style={globalStyles.dropdown}
          >
            <Picker.Item label="Select an option" value="" />
            <Picker.Item label="Colorectal" value="Colorectal" />
            <Picker.Item label="Lymphoma" value="Lymphoma" />
            <Picker.Item label="Leukemia" value="Leukemia" />
            <Picker.Item label="Uterine" value="Uterine" />
            <Picker.Item label="Ovarian" value="Ovarian" />
            <Picker.Item label="Melanoma" value="Melanoma" />
            <Picker.Item label="Pancreatic" value="Pancreatic" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </>
      )}

      {screen === 8 && (
        <>
          <Text style={globalStyles.heading}>
            What stage of cancer did you have?
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { width: "90%" },
                stage === "1" && globalStyles.selectedButton,
              ]}
              onPress={() => setStage("1")}
            >
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { width: "90%" },
                stage === "2" && globalStyles.selectedButton,
              ]}
              onPress={() => setStage("2")}
            >
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { width: "90%" },
                stage === "3" && globalStyles.selectedButton,
              ]}
              onPress={() => setStage("3")}
            >
              <Text>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { width: "90%" },
                stage === "4" && globalStyles.selectedButton,
              ]}
              onPress={() => setStage("4")}
            >
              <Text>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { width: "90%" },
                stage === "Unknown" && globalStyles.selectedButton,
              ]}
              onPress={() => setStage("Unknown")}
            >
              <Text>I don't know</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 9 && (
        <>
          <Text style={[globalStyles.heading, { margin: -10 }]}>
            Are you on treatment right now?
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { marginTop: 20 },
                treatment === "Surgery" && globalStyles.selectedButton,
              ]}
              onPress={() => setTreatment("Surgery")}
            >
              <Text>Yes, I just had surgery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { marginTop: 6 },
                treatment === "Chemotherapy" && globalStyles.selectedButton,
              ]}
              onPress={() => setTreatment("Chemotherapy")}
            >
              <Text>Yes, I am receiving chemotherapy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { marginTop: 6 },
                treatment === "Radiation" && globalStyles.selectedButton,
              ]}
              onPress={() => setTreatment("Radiation")}
            >
              <Text>Yes, I am receiving radiation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { marginTop: 6 },
                treatment === "Immunotherapy" && globalStyles.selectedButton,
              ]}
              onPress={() => setTreatment("Immunotherapy")}
            >
              <Text>Yes, I am receiving immunotherapy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { marginTop: 6 },
                treatment === "Hormone therapy" && globalStyles.selectedButton,
              ]}
              onPress={() => setTreatment("Hormone therapy")}
            >
              <Text>Yes, I am receiving hormone therapy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.button2,
                { marginTop: 6 },
                treatment === "No treatment" && globalStyles.selectedButton,
              ]}
              onPress={() => setTreatment("No treatment")}
            >
              <Text>No, I am not on treatment</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 10 && (
        <>
          <Text style={globalStyles.subheading}>
            If you had surgery within the last 4 weeks you should talk to your
            medical team to find out when you can start exercising again.
          </Text>
          <Text style={globalStyles.subheading}>
            Once you get approved for exercise you should start this program.
          </Text>
        </>
      )}

      {screen === 11 && (
        <>
          <Text style={globalStyles.subheading}>
            How often is your treatment?
          </Text>
          <Picker
            selectedValue={treatmentFrequency}
            onValueChange={(itemValue) => setTreatmentFrequency(itemValue)}
            style={globalStyles.dropdown}
          >
            <Picker.Item label="Select an option" value={null} />
            <Picker.Item label="Every week" value="Every week" />
            <Picker.Item label="Every two weeks" value="Every two weeks" />
            <Picker.Item label="Every three weeks" value="Every three weeks" />
            <Picker.Item label="Every four weeks" value="Every four weeks" />
            <Picker.Item label="None" value="None" />
          </Picker>
          <Text style={globalStyles.subheading}>
            When is your next treatment?
          </Text>
          <TouchableOpacity
            onPress={() => setShowNextPicker(true)}
            style={[globalStyles.button2, { marginTop: 10 }]}
          >
            <Text style={{ textAlign: "center" }}>
              {nextTreatmentDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showNextPicker && (
            <DateTimePicker
              value={nextTreatmentDate}
              mode="date"
              display="default"
              onChange={handleNextTreatmentDateChange}
            />
          )}
          <Text style={[globalStyles.subheading, { marginTop: 15 }]}>
            When is your last treatment?
          </Text>
          <TouchableOpacity
            onPress={() => setShowLastPicker(true)}
            style={[globalStyles.button2, { marginTop: 6 }]}
          >
            <Text style={{ textAlign: "center" }}>
              {lastTreatmentDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showLastPicker && (
            <DateTimePicker
              value={lastTreatmentDate}
              mode="date"
              display="default"
              onChange={handleLastTreatmentDateChange}
            />
          )}
        </>
      )}

      {screen === 12 && (
        <>
          <Text style={globalStyles.subheading}>
            How many days in the past week did you perform physical activity
            that increased your heart rate and you were breathing harder than
            normal for 30 minutes or more?
          </Text>
          <View style={globalStyles.inputContainer}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setDays((prev) =>
                  parseInt(prev) > 0 ? `${parseInt(prev) - 1}` : "0"
                )
              }
            >
              <Text style={globalStyles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              value={days}
              onChangeText={setDays}
            />
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setDays((prev) => (prev ? `${parseInt(prev) + 1}` : "1"))
              }
            >
              <Text style={globalStyles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 13 && (
        <>
          <Text style={globalStyles.subheading}>
            How many days in the past week did you do physical activity to
            increase muscle strength (e.g. lifting weights)?
          </Text>
          <View style={globalStyles.inputContainer}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setDays1((prev) =>
                  parseInt(prev) > 0 ? `${parseInt(prev) - 1}` : "0"
                )
              }
            >
              <Text style={globalStyles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              value={days1}
              onChangeText={setDays1}
            />
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() =>
                setDays1((prev) => (prev ? `${parseInt(prev) + 1}` : "1"))
              }
            >
              <Text style={globalStyles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {screen === 14 && (
        <>
          <Text style={globalStyles.subheading}>
            Do you feel you can exercise on your own with this program that will
            show you how to exercise?
          </Text>
          <Text style={globalStyles.subheading}>
            The intensity (how hard you exercise) will be tailored to you. So,
            if you have never exercised you will start with light to moderate
            intensity. If you're an athlete your exercise will vary from
            moderate to vigorous.
          </Text>
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={globalStyles.modalBackground}>
              <View style={globalStyles.modalContent}>
                <Text style={globalStyles.modalHeading}>Congratulations!</Text>
                <Text style={globalStyles.modalText}>
                  Your custom plan is ready and you are already one step closer
                  to your goals.
                </Text>
                <TouchableOpacity
                  onPress={handleCompleteFirstTime}
                  style={globalStyles.okButton}
                >
                  <Text style={globalStyles.okButtonText}>
                    Take me to my plan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}

      <NavigationView
        screen={screen}
        disableNext={!isNextEnabled()}
        treatment={treatment}
        setScreenName={setScreenName}
        handleScreenChange={handleScreenChange}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
