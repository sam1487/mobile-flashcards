import React from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addFlashcard, } from '../actions/decks'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends React.Component {
  state = {
    nextIndex: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false,
  }

  showAnswer = () => {

  }

  computeAccuracy = () => {
    const total = this.state.correct + this.state.incorrect;
    if (total === 0) return 0;

    return (this.state.correct * 100.0) / total;
  }

  handleCorrect = () => {
    this.setState((prevState) => ({
      nextIndex: prevState.nextIndex + 1,
      correct: prevState.correct + 1,
      showAnswer: false
    }));
  } 
  
  handleIncorrect = () => {
    this.setState((prevState) => ({
      nextIndex: prevState.nextIndex + 1,
      incorrect: prevState.incorrect + 1,
      showAnswer: false
    }));
  }

  handleRestartQuiz = () => {
    this.setState({
      nextIndex: 0,
      correct: 0,
      incorrect: 0,
      showAnswer: false,
    })
  }

  handleBackToDeck = () => {
    this.props.navigation.goBack();
  }

  updateNotificationSchedule = () => {
    clearLocalNotification().then(setLocalNotification);
  }

  renderCompleted = () => {
    const { deck } = this.props.navigation.state.params;
    this.updateNotificationSchedule();
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 24, marginBottom: 20 }}>Quiz Completed!</Text>
          <View style={{ borderRadius: 10, backgroundColor: 'darkslateblue', padding: 20, marginHorizontal: 40 }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ flex: 1, marginVertical: 10, fontSize: 20, color: 'whitesmoke' }}>Correct: </Text>
              <Text style={{ flex: 1, marginVertical: 10, marginLeft: 5, fontSize: 20, color: 'whitesmoke', textAlign: 'right', fontWeight: 'bold'}}>{this.state.correct}</Text>
            </View>
            <View style={{flexDirection: 'row', }}>
              <Text style={{ flex: 1, marginVertical: 10, fontSize: 20, color: 'whitesmoke' }}>Total: </Text>
              <Text style={{ marginVertical: 10, marginLeft: 5, fontSize: 20, color: 'whitesmoke', textAlign: 'right', fontWeight: 'bold'}}>{Object.keys(deck.flashcards).length}</Text>
            </View>
            <View style={{flexDirection: 'row', }}>
              <Text style={{ flex: 1, marginVertical: 10, fontSize: 20, color: 'whitesmoke' }}>Accuracy:</Text>
              <Text style={{ marginVertical: 10, marginLeft: 5, fontSize: 20, color: 'whitesmoke', fontWeight: 'bold'}}>{this.computeAccuracy().toFixed(1)}%</Text>
            </View>
          </View>
          <View style={{marginTop: 20, marginHorizontal: 40}}>
            <TouchableOpacity onPress={this.handleRestartQuiz}>
              <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'maroon', borderRadius: 5, padding: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Restart Quiz</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        <View style={{marginBottom: 50, marginHorizontal: 50}}>
          <TouchableOpacity onPress={this.handleBackToDeck}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkgreen', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Back to Deck</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderFlashcard = () => {
    const { deck } = this.props.navigation.state.params;
    const flashcardIds = Object.keys(deck.flashcards);
    const flashcard = deck.flashcards[flashcardIds[this.state.nextIndex]];

    return (
      <View style={{flex: 1}}>
        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'flex-start' }}>
          <Text style={{ marginVertical: 20, textAlign: 'center', fontSize: 20, color: 'darkslategray' }}>{this.state.nextIndex+1} of {flashcardIds.length}</Text>
          {this.state.showAnswer 
            ? <View>
                <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 12 }}>Question</Text>
                <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 26, color: 'darkslategray' }}>{this.state.showAnswer ? flashcard.answer : ' '}</Text>
              </View>
            : <View>
                <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 26 }}>{flashcard.question}</Text>
                <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: 'darkslategray' }}>Answer</Text>
              </View>
          }
  
          <TouchableOpacity onPress={() => this.setState((prevState) => ({showAnswer: !prevState.showAnswer}))}>
            <View style={{ marginVertical: 20, marginHorizontal: 100, backgroundColor: 'indigo', borderRadius: 20, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Flip Card</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 50, paddingVertical: 100 }}>
          <TouchableOpacity onPress={this.handleCorrect}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkgreen', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Correct</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleIncorrect}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'orangered', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Incorrect</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const flashcardIds = Object.keys(deck.flashcards);

    if (flashcardIds.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Sorry, no flashcards in the deck! Add some cards to start a quiz.</Text>
        </View>
      );
    }

    if (this.state.nextIndex >= flashcardIds.length) {
      return this.renderCompleted();
    } else {
      return this.renderFlashcard();
    }
  }
}

export default connect()(Quiz)