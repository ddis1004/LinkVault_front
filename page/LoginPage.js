import { View, Text, Button, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { darkTheme } from "../component/ThemeColor";

function LoginPage() {
  const navigation = useNavigation();

  const buttonHandler = () => {
    navigation.navigate("Main");
  };

  const signupHandler = () => {
    navigation.navigate("Signup");
  };

  const [fontsLoaded] = useFonts({
    ONEMobile: require("../assets/fonts/ONE Mobile Title.ttf"),
    Pretendard: require("../assets/fonts/Pretendard-Medium.otf"),
    Bebas: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>LinkVault</Text>
        <TextInput style={styles.textInput} placeholder="ID"></TextInput>
        <TextInput style={styles.textInput} placeholder="PASSWORD"></TextInput>
        <Pressable style={styles.button} onPress={buttonHandler}>
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          <Pressable onPress={signupHandler}>
            <Text style={styles.signupButton}>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 44,
    textAlign: "center",
    fontFamily: "Bebas",
    color: darkTheme.highlight,
  },
  inputContainer: {
    display: "flex",
  },
  textInput: {
    borderColor: darkTheme.outline,
    backgroundColor: darkTheme.textInputBackground,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 4,
    borderWidth: 2,
    margin: "auto",
    paddingHorizontal: 6,
    fontSize: 24,
    fontFamily: "Pretendard",
  },
  mainContainer: {
    display: "flex",
    margin: "auto",
  },
  button: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: darkTheme.highlight,
    width: 350,
    alignSelf: "center",
    color: darkTheme.text,
  },
  buttonText: {
    color: darkTheme.text,
    fontWeight: "800",
    fontFamily: "Pretendard",
  },
  signupButton: {
    color: darkTheme.text,
  },
  outerContainer: {
    backgroundColor: darkTheme.background,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  divider: {
    height: 2,
    marginVertical: 30,
    marginHorizontal: 30,
    backgroundColor: "#666666",
  },
});

export default LoginPage;
