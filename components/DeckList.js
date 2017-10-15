import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDecks, clearDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'

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

    console.log(this.props)

    if (ready === false) {
      return <AppLoading />
    }

    if (decks && Object.keys(decks).length === 0) {
      return <Text>Please start by creating a new deck.</Text>
    }

    return (
      <View>
        <Text>Done!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
