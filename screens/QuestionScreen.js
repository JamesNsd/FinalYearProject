import React from 'react';
import { View, ActivityIndicator, Picker, StyleSheet, Text, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import Question from "../components/Question";
import firebase from '../Firebase';

export default class TakeQuiz extends React.Component {

      constructor(props) {
        super(props);

        this.state = {

          loading: false,
          questions: [],

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
          completed: index === 4 ? true : false
        });
      };

      componentDidMount() {
        this.fetchQuestions();
      }

      IsGameEnd= (score) => {
        try {
          if(this.props.navigation.state.params){
            firebase.firestore().collection('Users').doc(this.props.navigation.state.params)
            .update({
              lastscore:score
             })
             this.componentDidMount();
          }
        } catch (error) {

        }
      }

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
                    Incorrect Answers: {5 - this.state.results.correctAnswers}
                  </Text>
                  <Text style={styles.scores}>Total Score: {25}</Text>
                  <Text style={styles.scores}>Obtained Score: {this.state.results.score}</Text>

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
    //backgroundColor: '#003f5c',
    backgroundColor: '#1A344E',
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