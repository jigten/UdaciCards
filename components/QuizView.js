import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { black, red, green, white } from '../utils/colors'

class QuizView extends Component {
  state = {
    count: 0,
    correct: 0,
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz',
    }
  }

  answerCorrect = () => {
    this.setState((prevState) => ({
      correct: prevState.correct + 1,
      count: prevState.count + 1,
    }));
  }

  answerIncorrect = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }))
  }

  render() {

    const { deck } = this.props
    const length = deck.questions.length
    const { count, correct } = this.state

    if (count === deck.questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>You got</Text>
            <Text style={styles.cardsText}>{correct} out of {length} correct</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.correctBtn}
              onPress={() => this.props.navigation.navigate(
                'QuizView',
                { deckId: deck.title }
              )}>
                <Text style={styles.correctBtnTxt}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorBtn}
              onPress={() => this.props.navigation.navigate(
                'DeckView',
                { deckId: deck.title }
              )}>
                <Text style={styles.incorBtnText}>Back To Deck</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Question</Text>
          <Text style={styles.cardsText}>Answer</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.correctBtn}
            onPress={() => this.answerCorrect()}>
              <Text style={styles.correctBtnTxt}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incorBtn}
            onPress={() => this.answerIncorrect()}>
              <Text style={styles.incorBtnText}>Incorrect</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  correctBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 2,
    borderWidth: 2,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
  },
  incorBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 2,
    borderWidth: 2,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    color: black,
    marginBottom: 10,
  },
  cardsText: {
    fontSize: 30,
    textAlign: 'center',
    color: red,
  },
  correctBtnTxt: {
    fontSize: 20,
    alignSelf: 'center',
  },
  incorBtnText: {
    fontSize: 20,
    alignSelf: 'center',
    color: white,
  },
})

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

export default connect(mapStateToProps)(QuizView)
