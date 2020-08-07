import React from 'react'
import { View, Text, StyleSheet, Button, Image, Dimensions,ScrollView } from 'react-native'
import Colors from '../constants/colors'

const GameOverScreen = props => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <Text style={styles.text}>The Game is Over!!</Text>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/success.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.resultText}>Your Phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text>
       rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
      </View>
      <Button title="New Game" onPress={props.onRestart} />
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: Colors.accent
  },
  textContainer: {
    marginHorizontal: 25,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',


  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderColor: 'black',
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  }, image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary
  }
})
export default GameOverScreen