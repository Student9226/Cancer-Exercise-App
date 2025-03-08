import { View, TouchableOpacity } from 'react-native'; 

const Header = ({ isCompleted, toggleDrawer }) => {
  return (
    <View style={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#eee" }}>
      {isCompleted && (
        <TouchableOpacity
          onClick={() => toggleDrawer(true)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          ☰
        </TouchableOpacity>
      )}
      <h1>{isCompleted ? "Dashboard" : "First Screen"}</h1>
    </View>
  );
};

export default Header;
