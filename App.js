import React from 'react'
import * as Font from 'expo-font';
import  AppLoading from 'expo-app-loading';
import MyStack from './routes/routes.js';

  export default class App extends React.Component{

      render(){

        return (<MyStack/>);
        }
    }