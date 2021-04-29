import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TextInput, Alert, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

export default class Stats extends React.Component {

  constructor(){
    super();
  }

  state = { name: '', score: 0, level: 0, attempts: 0}

  componentDidMount(){
  try {
    const user = firebase.auth().currentUser;
  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
  .get()
  .then(querySnapshot => {
  this.setState({
    name:querySnapshot.data().name,
    score:querySnapshot.data().score,
    attempts:querySnapshot.data().attempts,
    level:querySnapshot.data().level
  })
  });

  } catch (error) {

  }

  }

render() {
return (
        <View style={styles.container}>
                <StatusBar backgroundColor="black"/>
                <Text style={styles.logo}>Stats</Text>

                <Text style={{ fontSize: 25, fontWeight:"bold", color: 'black', marginBottom:20 }}>Name: {this.state.name}</Text>

                <Text style={{ fontSize: 25, fontWeight:"bold", color: 'black', marginBottom:20}}>Level: {this.state.level}</Text>

                <Text style={{ fontSize: 25, fontWeight:"bold", color: 'black', marginBottom:20}}>Score: {this.state.score}</Text>

                <Text style={{ fontSize: 25, fontWeight:"bold", color: 'black', marginBottom:20}}>Attempts: {this.state.attempts}</Text>

        </View>
    )
  }
}
const styles = StyleSheet.create({

  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:45,
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