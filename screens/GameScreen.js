import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native'

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNumber = Math.floor(Math.random() * (max - min) + 1)
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude)
  }
  else {
    return randomNumber
  }
}

const renderListItem = (value, numberOfRounds) => (
  <View key={value.length} style={styles.listItem}>
    <Text>#{numberOfRounds}</Text>
    <Text>{value}</Text>
  </View>
)
const GameScreen = props => {
  
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameScreen } = props
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameScreen(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameScreen])

  const nextGuesshandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert("Don't Lie", "You know that this is wrong...", [{
        text: 'Sorry', style: 'cancel'
      }])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuesshandler.bind(this, 'lower')} >
          <Ionicons name="md-remove" color="white" size={24} />
        </MainButton>
        <MainButton onPress={nextGuesshandler.bind(this, 'greater')} >
          <Ionicons name="md-add" color="white" size={24} />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    width: 400,
    justifyContent: 'space-around',
    maxWidth: '90%',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '80%' : '60%'
  },
  list: {
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  }
})

export default GameScreen