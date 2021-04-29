import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import SignUp from '../screens/SignUp.js'
import Login from '../screens/Login.js'
import Main from '../screens/Main.js'
import QuizMain from '../screens/QuizMain.js'
import Settings from '../screens/Settings.js'
import TakeQuiz from '../screens/QuestionScreen.js'
import HighScore from '../screens/HighScore.js'
import WelcomeScreen from '../screens/WelcomeScreen.js'
import Stats from '../screens/Stats.js'

const Stack = createStackNavigator();

function MyStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
          <Stack.Screen name="QuizMain" component={QuizMain} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
          <Stack.Screen name="TakeQuiz" component={TakeQuiz} options={{ headerShown: false }}/>
          <Stack.Screen name="HighScore" component={HighScore} options={{ headerShown: false }}/>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Stats" component={Stats} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default MyStack;