import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, StatusBar } from 'react-native'
import firebase from '../Firebase';
import firestore from '../Firebase';

export default class SignUp extends React.Component {

  constructor(){
    super();
  }

  state = { name: '', email: '', password: '', score: 0, scores: 0, level: 0, attempts: 0}

  Register = (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((userCredentials)=>{
              if(userCredentials.user){
                userCredentials.user.updateProfile({
                  displayName: this.state.name
                })
                .then(() => {
                       //Once the user creation has happened successfully, we can add the currentUser into firestore
                       //with the appropriate details.
                       firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                       .set({
                           name: this.state.name,
                           email: this.state.email,
                           score: this.state.score,
                           level: this.state.level,
                           scores: this.state.scores,
                           attempts: this.state.attempts,
                       })
                       //ensure we catch any errors at this stage to advise us if something does go wrong
                       .catch(error => {
                           console.log('Something went wrong with added user to firestore: ', error);
                       })
                })
                .then((s)=> {
                  this.props.navigation.navigate('WelcomeScreen');
                })
              }
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
            placeholder="Enter Name"
            placeholderTextColor="white"
            onChangeText={text => this.setState({name:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Enter Email"
            placeholderTextColor="white"
            onChangeText={text => this.setState({email:text})}/>
        </View>

        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter Password"
            placeholderTextColor="white"
            onChangeText={text => this.setState({password:text})}/>
        </View>

        <TouchableOpacity onPress={() => this.Register(this.state.email, this.state.password)} style={styles.registerBtn}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>


        <View style={{flexDirection:'row',alignItems:'space-around',marginTop:10}}>
          <Text style={{color:'white'}}>Already have an account?   </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{color:'#fb5b5a',fontWeight:'bold',fontSize:15}}>Login here</Text>
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
    backgroundColor:"#465881",
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
  registerBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:50,
    marginBottom:10
  },
  registerText:{
    color:"white"
  },

});