import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { handleReceiveDecks } from './actions/shared'
import middleware from './middleware'
import Tabs from './components/Tabs'
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import Constants from "expo-constants";
import {AsyncStorage} from 'react-native';
import { receiveDecks } from './actions/decks';



function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.deck.title,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(145, 61, 136, 1)',
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(145, 61, 136, 1)',
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: `Quiz: ${navigation.state.params.deck.title}`,
      headerBackTitle: '',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(145, 61, 136, 1)',
      }
    })
  }
}, 
));

const store = createStore(reducer, middleware);

class App extends React.Component {
  storageKey = '@mobile-flashcard:state';

  componentWillMount() {
    // AsyncStorage.getItem(this.storageKey)
    //   .then((data) => {
    //     state = JSON.parse(data);
    //     console.log('Loaded data from storage: ', state);
    //     if (state && Object.keys(state).length > 0) {
    //       store.dispatch(receiveDecks(state.decks));
    //     } else {
    //       store.dispatch(handleReceiveDecks());
    //     }
    //   })
    //   .catch((error) => console.log(error));

    store.dispatch(handleReceiveDecks());
  }

  componentWillUnmount() {
    // AsyncStorage.setItem(this.storageKey, JSON.stringify(store))
    //   .then((data) => console.log('Stored data: ', data));
  }

  render() {
    return (
    <Provider store={store}>
      <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={'rgba(145, 61, 136, 1)'} />
          <MainNavigator />
        </View>
    </Provider>
    );
  }
}

export default App;