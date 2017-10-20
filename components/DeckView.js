import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { black, gray, white } from '../utils/colors'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId,
    }
  }

  render() {
    const { deck } = this.props
    console.log(deck)

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{deck.title}</Text>
          <Text style={styles.cardsText}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => this.props.navigation.navigate(
              'NewQuestion',
              { deckId: deck.title }
            )}>
            <Text style={styles.addBtnText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizBtn}><Text style={styles.quizBtnText}>Start Quiz</Text></TouchableOpacity>
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
  addBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 2,
    borderWidth: 2,
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
  },
  quizBtn: {
    backgroundColor: black,
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
    color: gray,
  },
  addBtnText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  quizBtnText: {
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

export default connect(mapStateToProps)(DeckView)
