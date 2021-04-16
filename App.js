import React from 'react'
import * as Font from 'expo-font';
import  AppLoading from 'expo-app-loading';
import MyStack from './routes/routes.js';

  const customFonts = {
    'normal-font': require('./fonts/Helvetica-Normal.ttf'),
    'light-font': require('./fonts/Helvetica-Light.ttf'),
    'bold-font': require('./fonts/Helvetica-Bold.ttf')
  };

  export default class App extends React.Component{

    constructor(){

      super();

      this.state = {
        fontsLoaded: false
      }
    }

    async _loadFontsAsync(){
      await Font.loadAsync(customFonts);
      this.setState({fontsLoaded:true})
    }

    async componentDidMount(){
      this._loadFontsAsync();
    }

    render(){
        if(this.state.fontsLoaded){
            return(
              <MyStack />
            )
        }else{
            return <AppLoading/>
        }
    }

  }