"use strict";
import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
  Navigator,
} from 'react-native';

import {MainHome} from './MainHome';
import {NiceButton, NewMoButton, goHome} from './Globals';
import {Radio, Option} from '../RadioButton';
import ExpandingTextInput from '../ExpandingTextInput';
import {getFriends, getMeForSelectFriends, getUserId, sendMo, remo, forwardMo} from './API'
import {FriendStore} from './redux/reducers'
import { loadFriends, addContact } from './redux/actions'

var GiftedSpinner = require('react-native-gifted-spinner');
var Icon = require('react-native-vector-icons/FontAwesome');
var Ionicon = require('react-native-vector-icons/Ionicons');






const mapStateToProps = (state) => {
  return {
    friends: state.all
  }
}

class SelectFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addFriendText: "",
      friends: FriendStore.getState().all,
    }

    this.addFriend = this.addFriend.bind(this)
    this.onSelectFriend = this.onSelectFriend.bind(this)
    this.throwTheMo = this.throwTheMo.bind(this)
    this.getFriendsToSendTo = this.getFriendsToSendTo.bind(this)
  }

  componentDidMount() {
    FriendStore.subscribe( () => this.setState(mapStateToProps(FriendStore.getState())) )
    FriendStore.dispatch(loadFriends());

    var self = this;
    console.log('SelectFriends with moment:');
    console.log(this.props.moment);
  }

  addFriend() {
    this.setState({ addingFriendCurrently: true })

    var self = this;
    (async () => {
      try {
        var id = await getUserId(self.state.addFriendText)
        FriendStore.dispatch(addContact(this.state.addFriendText, id))
        self.setState({ addFriendText: '',  })
      } catch(err) {
        alert(err.message)
      } finally {
        self.setState({ addingFriendCurrently: false })
      }

    })()
  }

  onSelectFriend(index) {
    var friends = this.state.friends;
    friends[index].selected = !friends[index].selected;
    this.setState({ friends })
  }

  getFriendsToSendTo() {
    return this.state.friends.filter((friend) => friend.selected).map((friend) => friend.id);
  }

  throwTheMo() {
    var self = this;
    
    var friendsToSendTo = this.getFriendsToSendTo();


    if(this.props.moment.id) {
      // pre-existing moment
      if(this.props.forwardMoment) {
        (async () => {
          
          try {
            await forwardMo({
              momentId: this.props.moment.id,
              to: friendsToSendTo,
              revealInterval: '0'
            });

            goHome({ routerObj: self });
          } catch(err) {
            alert(err.message)
          }

        })()

      } else if(this.props.remo) {
        (async () => {

          try {
            await remo({
              momentId: this.props.moment.id,
              to: friendsToSendTo
            });

            goHome({ routerObj: self });
          } catch(err) {
            alert(err.message)
          }

        })();

      }

    } else if(this.props.moment.contentText || this.props.moment.contentImage) {
      // new moment
      (async () => {
        
        try {
          await sendMo({
            to: friendsToSendTo,
            contentText: this.props.moment.contentText,
            contentImage: this.props.moment.contentImage,
          });

          goHome({ routerObj: self });
        } catch(err) {
          alert(err.message)
        }
        

      })();

    } else {

      // DEBUG
      console.log(this.props)
      throw new Error("WTF");
    }

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

    var addFriendIcon = <Ionicon style={{ color: '#777' }} name="person-add" size={30}/>;
    if(this.state.addFriendText.length > 0) {
      addFriendIcon = 
        <TouchableOpacity onPress={this.addFriend}>
            <Ionicon name="person-add" size={30}/>
        </TouchableOpacity>;
    }
    if(this.state.addingFriendCurrently) {
      addFriendIcon = <GiftedSpinner/>;
    }

    console.log(this.getFriendsToSendTo())
    var disableSendButton = this.getFriendsToSendTo().length == 0;

    return <View style={{ flex: 1 }}>
    	<View style={{ flex: 0.1, padding: 10, flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1, borderBottomColor: '#888', marginBottom: 5, alignItems: 'center' }}>
      	 <TextInput style={{ flex: 1, alignSelf: 'center', fontSize: 26, height: 30 }} onChangeText={(addFriendText) => this.setState({ addFriendText })} placeholder="add someone" autoCapitalize='none' autoCorrect={false} value={this.state.addFriendText}/>
         {addFriendIcon}
         
    	</View>

      <ScrollView style={{ flex: 0.8 }}>
      <Radio style={{ flex: 1 }} onSelect={this.onSelectFriend}>
        {this.state.friends.map((friend) => {
          var friendStyle = {
            fontSize: 28
          };
          if(friend.me) {
            friendStyle.fontWeight = '700';
          }
          return <Option key={friend.id} color="gray" selectedColor="#008BEF" isSelected={friend.selected} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Text style={[friendStyle]}>{friend.username}</Text>
          </Option>;
        })}
        </Radio>
      </ScrollView>

    	<NiceButton disabled={disableSendButton} style={{ flex: 0.1, alignSelf: 'stretch', justifyContent: 'flex-end', height: 60 }} onPress={this.throwTheMo}><Text style={{color: 'white', padding: 20, fontSize: 28 }}><Icon name="send-o" size={28}/> Throw the mo'</Text>
      </NiceButton>

    </View>
  }
}


export { SelectFriends }
