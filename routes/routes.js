import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import Main from '../screens/Main'
import QuizMain from '../screens/QuizMain'
import Settings from '../screens/Settings'
import TakeQuiz from '../screens/QuestionScreen'
import HighScore from '../screens/HighScore'

const Stack = createStackNavigator();

function MyStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignUp" component={SignUp } />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="QuizMain" component={QuizMain} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
          <Stack.Screen name="HighScore" component={HighScore} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default MyStack;