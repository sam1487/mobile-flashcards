import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'

class AddDeck extends React.Component {
    state = {
        title: '',
    }
    addDeck = () => {
        let { title } = this.state;
        title = title.trim();
        if (!title) {
            alert('Title must be specified');
            return;
        }
        this.props.dispatch(handleAddDeck(title));
        this.setState({title: ''});
        this.props.navigation.goBack();
    }

    render() {     
      return (
          <View style={{flex: 1, paddingHorizontal: 50}}>
              <View style={{flex: 1, paddingVertical: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: 20, marginVertical: 10}}>Title of your new deck:</Text>
                  <TextInput 
                      style={{borderWidth: 1, borderColor: 'darkslategray', borderRadius: 5, padding: 10, marginTop: 10}} 
                      onChangeText={text => this.setState({title: text})}
                      value={this.state.title} />
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 100}}>
                  <TouchableOpacity onPress={this.addDeck}>
                      <View style={{ marginVertical: 10, backgroundColor: 'darkslategray', borderRadius: 5, padding: 10}}>
                          <Text style={{color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>Add Deck</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </View>
      )
    }
}

export default connect()(AddDeck)