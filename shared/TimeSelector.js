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
  DatePickerIOS,
  Picker
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



class TimeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date,
      pickerValue: ''
    }

    this.optionsForDatetimes = [
      "in an hour",
      "in 24 hours",
      "today at x o'clock",
      "tomorrow at x o'clock",
      "tomorrow morning",
      "tomorrow afternoon",
      "tomorrow night",
    ];
    // this.dateOptions = [
    //   'tomorrow',
    //   ''
    // ];
    // this.timeOptions = [
    //   'morning',
    //   'daytime',
    //   'night'
    // ];
    // <DatePickerIOS
    //       date={this.state.date}
    //       mode="date"
    //       timeZoneOffsetInMinutes={10 * 60}
    //       onDateChange={this.onDateChange}
    //     />
    //     <DatePickerIOS
    //       date={this.state.date}
    //       mode="time"
    //       timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
    //       onDateChange={this.onDateChange}
    //       minuteInterval={10}
    //     />
  }

  render() {
    return <View style={{ flex: 1 }}>
       <Picker
        style={{ flex: 1}}
        selectedValue={this.state.pickerValue}
        onValueChange={(pickerValue) => this.setState({pickerValue})}>
        {this.optionsForDatetimes.map((opt) => 
          <Picker.Item label={opt} value={opt} />
        )}
        
      </Picker>
    </View>;
  }
}

export default TimeSelector;
