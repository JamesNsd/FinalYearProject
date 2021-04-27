import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, StatusBar } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

export default class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answer: null
    };
  }

  renderOptions = question => {
    if (question.type === "boolean") {
      return [
        <RadioButton value={"True"} key={1}>
          <Text style={styles.radioText}>True</Text>
        </RadioButton>,

        <RadioButton value={"False"} key={2}>
          <Text style={styles.radioText}>False</Text>
        </RadioButton>
      ];
    } else {
      const result = [];

      question.incorrect_answers.forEach((item, index) => {
        let key = `${question.id}-${index}`;

        if (index === this.props.correctPosition) {
          let key2 = `${question.id}-10`;
          result.push(
            <RadioButton value={question.correct_answer} key={key2}>
              <Text style={styles.radioText}>{question.correct_answer}</Text>
            </RadioButton>
          );
        }

        result.push(
          <RadioButton value={item} key={key}>
            <Text style={styles.radioText}>{item}</Text>
          </RadioButton>
        );
      });

      return result;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontStyle: 'italic', color:"#fb5b5a", fontSize: 24, fontWeight: "bold" }}>
          {this.props.question.question}
        </Text>
        <RadioGroup
          onSelect={(index, answer) => this.setState({ answer })}
          selectedIndex={null}
        >
          {this.renderOptions(this.props.question)}
        </RadioGroup>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.onSelect(this.state.answer)}
         >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16
              }}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
    height: '100%',
    width: '100%'
  },
  radioText: {
    fontSize: 20,
    color: "black"
  },
  button: {
    backgroundColor:"#fb5b5a",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    width:"80%",
    height:50,
    justifyContent:"center",

  }
});