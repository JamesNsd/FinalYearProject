import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../Firebase';

export default class Settings extends React.Component {
//log out function
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
        <Text style={styles.logo}>Settings</Text>
        <TouchableOpacity onPress={() => this.Logout()} style={styles.button}>
            <Text style={styles.loginText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('changePasswordScreen')}>
            <Text style={styles.loginText}>Change Password</Text>
        </TouchableOpacity>

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
    fontSize:45,
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
    marginTop:10,
    marginBottom:10,
  },
  loginText:{
    color:"white",
    fontWeight: "bold",
    fontSize: 18
  },
});