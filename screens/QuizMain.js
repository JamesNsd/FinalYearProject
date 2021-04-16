import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import TakeQuiz from "../screens/QuestionScreen"
import * as firebase from "firebase";

export default class QuizMain extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}

  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <Text style={styles.logo}>Test Your Celiac Knowledge!!</Text>
        <Text style={styles.paragraph}>
          This quiz will ask all the questions to see how well you know life with Celiac Disease.
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("TakeQuiz")}
         >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Ionicons name="md-play" size={32} color="white" />
            <Text
              style={{color: "white", fontWeight: "bold", marginLeft: 10, marginTop: 5}}
            >
              Start Questions
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#003f5c',
    backgroundColor: '#1A344E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:30,
    color:"#fb5b5a",
    marginBottom:110
  },

  button: {
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:50,
    marginBottom:10
  },

  paragraph: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});