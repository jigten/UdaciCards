import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { getDecks, clearDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import { white, black, gray } from '../utils/colors'

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

  renderItem = ( { item } ) => {
    return (
      <TouchableOpacity style={styles.deck} onPress={() => this.props.navigation.navigate(
        'DeckView',
        { deckKey: item.title }
      )}>
        <View style={styles.deckContainer}>
          <Text style={styles.deckTitle}>{item.title}</Text>
          <Text style={styles.deckCards}>{item.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    )
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
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(deck, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deck: {
    backgroundColor: white,
    borderRadius: 2,
    borderWidth: 2,
    padding: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  deckContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 30,
    color: black,
  },
  deckCards: {
    fontSize: 18,
    color: gray,
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
