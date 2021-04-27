import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TextInput, Alert, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

export default class Main extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}

render() {
    const { currentUser } = this.state
return (
        <View style={styles.container}>
                <StatusBar backgroundColor="black"/>
                <Text style={styles.logo}>Hi {currentUser && currentUser.displayName }!</Text>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("QuizMain")}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 18}} >
                        Quiz
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("HighScore")}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 18}} >
                        LeaderBoard
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Settings")}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 18}} >
                        Settings
                    </Text>
                </TouchableOpacity>

        </View>
    )
  }
}
const styles = StyleSheet.create({

  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:60,
    color:"#fb5b5a",
    marginBottom:110
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 20,
    lineHeight: 25
  }

})