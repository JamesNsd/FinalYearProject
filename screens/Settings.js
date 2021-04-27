import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../Firebase';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

export default class Settings extends React.Component {

  Logout = async () => {
      try {
          await firebase.auth().signOut();
          this.props.navigation.navigate('Login');
      } catch (e) {
          console.log(e);
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <Text style={styles.logo}>CeliQuiz</Text>
        <TouchableOpacity onPress={() => this.Logout()} style={styles.loginBtn}>
            <Text style={styles.loginText}>Logout</Text>
        </TouchableOpacity>

        <FlashMessage position="bottom" />
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize:60,
    color:"#fb5b5a",
    marginBottom:110
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:70,
    marginBottom:10,

  },
  loginText:{
    color:"white",
  },
  SignUpBtn:{
    width:"80%",
    backgroundColor:"#669999",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:3
  }
});