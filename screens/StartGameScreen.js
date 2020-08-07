import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)
  
  useEffect(()=>{

    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }
    Dimensions.addEventListener('change',updateLayout)
  return ()=>{
    Dimensions.removeEventListener('change',updateLayout)
  }
  })
  const numberInputHandler = inputText => setEnteredValue(inputText.replace(/[^0-9]/g, ''))

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputhandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be a number between 1 and 99", [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput =
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input style={styles.input}
                blurOnSubmit autoCapitalize='none'
                autoCorrect={false} keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width:buttonWidth}}>
                  <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                </View>
                <View style={{width:buttonWidth}}>
                  <Button title="Confirm" onPress={confirmInputhandler} color={Colors.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bolded'

  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15

  },
 /*  button: {
    width: buttonWidth
  }, */
  input: {
    textAlign: 'center',
    width: '15%'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default StartGameScreen