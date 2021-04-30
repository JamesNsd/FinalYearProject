import React from 'react';
import { View, ActivityIndicator, Picker, StyleSheet, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import Question from "../components/Question";
import firebase from '../Firebase';
import firestore from '../Firebase';

export default class TakeQuiz extends React.Component {

      constructor(props) {
        super(props);
        //set values for quiz
        this.state = {

          loading: false,
          questions: [],

          scores: 0,
          current: 0,
          attempts: 0,
          level: 0,

          correctScore: 5,
          totalScore: 50,

          results: {
            score: 0,
            correctAnswers: 0
          },
          completed: false
        };
      }
      //import questions from pythonanywhere
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
      //reset function for when reset button is pressed
      reset = () => {
        this.setState(
          {
            questions: [],
            current: 0,
            scores: 0,
            attempts: 0,

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
      //checks if the answer given was correct and assigns score to the user, then sets state to next question,
      //or if the questions have run out
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
      //sets the users score, adds the score to their array, and increments their attempts.
      //Happens when the user selects leaderboard.
      setUserValues= (score) => {

            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .update({
              score: this.state.results.score,
              scores: firebase.firestore.FieldValue.arrayUnion(this.state.results.score),
              attempts: firebase.firestore.FieldValue.increment(1),
              level: firebase.firestore.FieldValue.increment(0.25),
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
                console.log('Something went wrong: ', error);
            })
            .then((s)=> {
                alert("Score Submitted!!")
            })
          .catch(function(error) {
            alert(error.message);
          });
      };

      render() {
        return (
          //Submits answer and calls next question
          <View style={styles.container}>
            {!!this.state.questions.length > 0 &&
              this.state.completed === false && (
                <Question
                  onSelect={answer => {
                    this.submitAnswer(this.state.current, answer);
                  }}
                  question={this.state.questions[this.state.current]}
                  /*Randomises the answers on screen*/
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
                          style={styles.buttonsub}
                          onPress={() => this.setUserValues(this.state.score)}
                        >
                          <Text
                             style={{color: "white", fontWeight: "bold"}}
                          >
                             Submit Score!
                          </Text>
                  </TouchableOpacity>

                 <TouchableOpacity
                         style={styles.button}
                         onPress={() => this.props.navigation.navigate("HighScore")}
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
                         onPress={() => this.props.navigation.navigate("Main")}
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
        color:"#5c5e70",
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

      },

      buttonsub: {
        backgroundColor: "#669999",
        padding: 10,
        marginTop: 10,
        borderRadius: 25,
        width: 150,
        height:50,
        alignItems:"center",
        justifyContent:"center"

      }
    });