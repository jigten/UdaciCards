import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { black } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: ''
  }

  createDeck = () => {
    const { title } = this.state
    saveDeckTitle(title)
      .then(() => this.props.dispatch(addDeck({
        [title]: {
          title,
          questions: []
        }
      })))
      .then(() => this.setState({ title: '' }))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.headerText}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.createDeck}
        >
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    textAlign: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  titleInput: {
    height: 50,
    width: 250,
    borderColor: black,
    borderWidth: 2,
    borderRadius: 4,
    padding: 4,
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 100,
    backgroundColor: black,
    alignSelf: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  }
})

export default connect()(NewDeck)
