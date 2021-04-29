import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'Hi!',
    text: 'Welcome to CeliQuiz.',
    //image: require('../assets/images/slider11.png'),
  },
  {
    key: 2,
    title: 'Compete!',
    text: 'Can you make it to the top of the Leader Board?',
  },
  {
    key: 3,
    title: 'Learn!',
    text: "Take the Quiz and find out more about Coeliac Disease",
    //image: require('../assets/images/slider3.png'),
  },
];

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <ImageBackground source={item.image} style={styles.image}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </ImageBackground>
      </View>
    );
  };
  _onDone = () => {
    this.props.navigation.navigate('Main');
  };

  _renderNextButton = () => {
    return (
      <View>
        <Text style={styles.next}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View>
        <Text style={styles.done}>Done</Text>
      </View>
    );
  };
  _renderSkipButton = () => {
    return (
      <View>
        <Text style={styles.skip}>Skip</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="#f5f5f5"
          barStyle="light-content"
        />
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          dotStyle={styles.dots}
          activeDotStyle={styles.activeDots}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderSkipButton={this._renderSkipButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    paddingBottom: 100,
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#A29F9F',
    textAlign: 'center',
  },
  title: {
    fontStyle: 'italic',
    fontWeight:"bold",
    fontSize: 45,
    color: '#fb5b5a',
    textAlign: 'center',
  },
  dots: {
    backgroundColor: '#5A5858',
  },
  activeDots: {
    backgroundColor: '#fb5b5a',
  },
  next: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5A5858',
  },
  done: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3c240c',
  },
  skip: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fb5b5a',
  },
});

export default WelcomeScreen;