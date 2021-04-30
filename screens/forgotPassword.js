import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../Firebase';
import iid from '@react-native-firebase/iid';

export default class ForgotPassword extends React.Component {

  state = { email: ''}
//function to send email to entered by user
  Reset = async() => {
      try {
          await auth().sendPasswordResetEmail(email);
      } catch (e) {
          console.log(e);
      }
  };

  render(){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <Text style={styles.logo}>CeliQuiz</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Enter Your Email..."
            placeholderTextColor="white"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        {/*onPress the email entered is ran to the function and sent */}
        <TouchableOpacity onPress={() => this.Reset(this.state.email)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SignUpBtn}  onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Return To Log In
          </Text>
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
  inputView:{
    width:"80%",
    backgroundColor:"#5c5e70",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
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
  },
  PwordBtn:{
      width:"80%",
      backgroundColor:"black",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:5
    }

});