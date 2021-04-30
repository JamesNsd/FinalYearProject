import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../Firebase';
import iid from '@react-native-firebase/iid';

export default class Login extends React.Component {

  state = { email: '', password: '' }

  Login  = (email, password) => {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then((s)=> {
            this.props.navigation.navigate('Main');
         })
         .catch(function(error) {
           alert(error.message);
         });
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
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter Your Password..."
            placeholderTextColor="white" //#003f5c
            onChangeText={text => this.setState({password:text})}/>
        </View>

        <TouchableOpacity onPress={() => this.Login(this.state.email, this.state.password)} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SignUpBtn}  onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.loginText}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection:'row',alignItems:'space-around',marginTop:10}}>
            <Text style={{color:'black'}}>Forgot Password?   </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Click here</Text>
            </TouchableOpacity>
        </View>

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