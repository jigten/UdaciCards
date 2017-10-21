import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { black, white } from '../utils/colors'

class NewQuestion extends Component {
  static navigationOptions = () => {
    return {
      title: 'Add Card',
    }
  }

  state = {
    question: '',
    answer: '',
  }

  saveCard = () => {
    const { question, answer } = this.state
    const { deckId } = this.props.navigation.state.params

    addCardToDeck(deckId, {
      question,
      answer
    })
    .then(() => this.props.dispatch(addCard(deckId, {
      question,
      answer,
    })))
    .then(() => this.setState({ question: '', answer: '' }))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={this.saveCard}>
            <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    borderColor: black,
    borderWidth: 2,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 2,
    borderWidth: 2,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
  },
  btnText: {
    fontSize: 20,
    alignSelf: 'center',
    color: white,
  },
})

export default connect()(NewQuestion)
