import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
} from 'react-native';
import {NiceButton} from './Globals';
var Icon = require('react-native-vector-icons/FontAwesome');
var Ionicon = require('react-native-vector-icons/Ionicons');
import {Radio, Option} from '../RadioButton';
import ExpandingTextInput from '../ExpandingTextInput';
var fuzzaldrin = require('fuzzaldrin')

class SelectFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: 0,
      addFriendText: "",
      friends: [
        { name: "Aymeric", selected: false, id: 0 },
        { name: "Anna", selected: false, id: 1 },
        { name: "Chris", selected: false, id: 2 }
      ]
    }

    this.addFriend = this.addFriend.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  addFriend() {
    this.setState({ addFriendText: '' })
  }

  onSelect(index) {
    var friends = this.state.friends;
    friends[index].selected = !friends[index].selected;
    this.setState({ friends })
  }

  render() {
    var styles = StyleSheet.create({
      textInput: {
        flex: 1,
        fontSize: 26,
        height: 26,
        margin: 10
      }
    })

    var _debugInfo = <Text>{this.state.friends.map((friend) => { if(friend.selected) return friend.name; })}</Text>;

    return <View style={{ flex: 1 }}>
    	<View style={{ flex: 0.1, padding: 5, paddingLeft: 10, flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1, borderBottomColor: '#888', marginBottom: 5, alignItems: 'center' }}>
      	 <TextInput style={{ flex: 1, alignSelf: 'center', fontSize: 26, height: 30 }} onChangeText={(addFriendText) => this.setState({ addFriendText })} placeholder="friend's username" autoCapitalize='none' autoCorrect={false} value={this.state.addFriendText}/>
         <TouchableOpacity style={{ }} onPress={this.addFriend}><Ionicon name="person-add" size={26}/></TouchableOpacity>
    	</View>

      <ScrollView style={{ flex: 0.8 }}>
      <Radio style={{ flex: 1 }} onSelect={this.onSelect}>
        {this.state.friends.map((friend) => {
          return <Option key={friend.id} color="gray" selectedColor="#008BEF" selected={friend.selected} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Text>{friend.name}</Text>
          </Option>;
        })}
        </Radio>
      </ScrollView>

      <TouchableOpacity style={{ flex: 0.1, alignSelf: 'stretch', justifyContent: 'flex-end', height: 60 }}>
      	<NiceButton><Text style={{color: 'white', padding: 30, fontSize: 28 }}><Icon name="send-o" size={28}/> Throw the mo'</Text></NiceButton>
      </TouchableOpacity>

    </View>
  }
}

export { SelectFriends }
