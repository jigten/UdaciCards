import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDecks, clearDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'

function Deck (deck) {
  return (
    <View><Text>{JSON.stringify(deck)}</Text></View>
  )
}

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({
        ready: true
      })))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    if (ready && decks.length === 0) {
      return <Text style={styles.defaultText}>Please start by creating a new deck.</Text>
    }

    return (
      <View style={styles.container}>
        {decks.map((deck) => <Deck key={deck.title} deck={deck} />)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultText: {
    fontSize: 20,
    alignSelf: 'center',
    paddingTop: 30,
  },
})

function mapStateToProps(decks) {
  if (decks) {
    return {
      decks: Object.keys(decks).map(key => decks[key]),
    }
  } else {
    return {
      decks
    }
  }
}

export default connect(mapStateToProps)(DeckList)
