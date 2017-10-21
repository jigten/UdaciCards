import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class QuizView extends Component {
  static navigationOptions = () => {
    return {
      title: 'Quiz',
    }
  }

  render() {
    return (
      <Text>QuizView.js</Text>
    )
  }
}
