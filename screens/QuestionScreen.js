import React from 'react';
import { View, ActivityIndicator, Picker, StyleSheet, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import Question from "../components/Question";
import firebase from '../Firebase';
import firestore from '../Firebase';

export default class TakeQuiz extends React.Component {

      constructor(props) {
        super(props);

        this.state = {

          loading: false,
          questions: [],

          scores: 0,
          current: 0,
          correctScore: 5,
          totalScore: 50,

          results: {
            score: 0,
            correctAnswers: 0
          },
          completed: false
        };
      }

      fetchQuestions = async () => {
        await this.setState({ loading: true });
        const response = await fetch(
          `http://jamesnsd.pythonanywhere.com/`
        );
        const questions = await response.json();

        const { results } = questions;

        //trying to shuffle questions by id
        results.forEach(item => {
          item.id = Math.floor(Math.random() * 10000);
        });

        await this.setState({ questions: results, loading: false });
      };

      reset = () => {
        this.setState(
          {
            questions: [],
            current: 0,
            results: {
              score: 0,
              correctAnswers: 0,
            },
            completed: false
          },
          () => {
            this.fetchQuestions();
          }
        );
      };

      submitAnswer = (index, answer) => {
        const question = this.state.questions[index];
        const isCorrect = question.correct_answer === answer;
        const results = { ...this.state.results };

        results.score = isCorrect ? results.score + 5 : results.score;
        results.correctAnswers = isCorrect
          ? results.correctAnswers + 1
          : results.correctAnswers;

        this.setState({
          current: index + 1,
          results,
          completed: index === 9 ? true : false
        });
      };

      componentDidMount() {
        this.fetchQuestions();
      }

      setUserValues= (score) => {

            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .update({
              score: this.state.results.score,
              scores: firebase.firestore.FieldValue.arrayUnion(this.state.results.score),
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
                console.log('Something went wrong with added score to firestore: ', error);
            })
            .then((s)=> {
                this.props.navigation.navigate('HighScore');
            })
          .catch(function(error) {
            alert(error.message);
          });
      };

      render() {
        return (
          <View style={styles.container}>
            {!!this.state.questions.length > 0 &&
              this.state.completed === false && (
                <Question
                  onSelect={answer => {
                    this.submitAnswer(this.state.current, answer);
                  }}
                  question={this.state.questions[this.state.current]}
                  correctPosition={Math.floor(Math.random() * 3)}
                  current={this.state.current}
                />
              )}

            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              {this.state.completed === true && (
                <View style={styles.container}>

                  <Text style={styles.logo}>Quiz Completed</Text>
                  <Text style={styles.scores}>Correct Answers: {this.state.results.correctAnswers}</Text>
                  <Text style={styles.scores}>
                    Incorrect Answers: {10 - this.state.results.correctAnswers}
                  </Text>
                  <Text style={styles.scores}>Total Score: {50}</Text>
                  <Text style={styles.scores}>Obtained Score: {this.state.results.score}</Text>

                 <TouchableOpacity
                         style={styles.button}
                         onPress={() => this.setUserValues(this.state.score)}
                       >
                         <Text
                            style={{color: "white", fontWeight: "bold"}}
                         >
                            Leaderboard
                         </Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                         style={styles.button}
                         onPress={this.reset}
                       >
                         <Text
                            style={{color: "white", fontWeight: "bold"}}
                         >
                            Restart
                         </Text>
                 </TouchableOpacity>

                 <TouchableOpacity
                         style={styles.button}
                         onPress={() => this.props.navigation.navigate("QuizMain")}
                       >
                         <Text
                            style={{color: "white", fontWeight: "bold"}}
                         >
                            Home
                         </Text>
                 </TouchableOpacity>

                </View>
              )}
            </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
      },

      logo: {
        fontStyle: 'italic',
        fontWeight:"bold",
        fontSize:30,
        color:"#fb5b5a",
        marginBottom:110
      },

      loadingQuestions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },

      scores: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        padding: 10,
        marginTop: 10,
        lineHeight: 25
      },

      button: {
        backgroundColor: "#fb5b5a",
        padding: 10,
        marginTop: 10,
        borderRadius: 25,
        width: 150,
        height:50,
        alignItems:"center",
        justifyContent:"center"

      }
    });