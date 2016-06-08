"use strict";
import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Navigator,
  DatePickerIOS,
  Picker
} from 'react-native';

import {MainHome} from './MainHome';
import {NiceButton, NewMoButton, goHome, AppText} from './Globals';
import {Radio, Option} from '../RadioButton';
import ExpandingTextInput from '../ExpandingTextInput';
import {getFriends, getMeForSelectFriends, getUserId, sendMo, remo, forwardMo} from './API'
import {FriendStore} from './redux/reducers'
import { loadFriends, addContact } from './redux/actions'

var GiftedSpinner = require('react-native-gifted-spinner');
var Icon = require('react-native-vector-icons/FontAwesome');
var Ionicon = require('react-native-vector-icons/Ionicons');
var moment = require('moment');


class TimeSelector extends Component {
  constructor(props) {
    super(props);

    var self = this;

    this.props.setRightProps({
      onPress: function() {
        this.props.toRoute({
          component: SelectFriends,
          leftCorner: CancelButton,
          rightCorner: View,
          sceneConfig: Navigator.SceneConfigs.FloatFromRight,
          passProps: {
            remo: true,
            moment: Object.assign(this.props.moment, {
              pickedDate: self.state.pickedDate,
              pickedTime: self.state.pickedTime
            })
          }
        });

      }
    });

    this.optionsForTimes = ["1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "midday", "1pm", "2pm", "3pm", "4pm", "beer'o'clock", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "midnight"];

    var now = new Date;

    this.optionsForDates = [];
    const shortenings = {
      0: 'today',
      1: 'tomorrow',
      2: 'in two days',
      7: 'in a week',
      14: 'in two weeks'
    }
    for(var i = 0; i < 14; i++) {
      var date = moment(now).add(moment.duration(i, 'd'));
      var shortening = shortenings[i];
      if(!shortening) {
        var format = 'dddd';
        shortening = date.calendar(null, {
          sameDay: 'bad error',
          nextDay: format,
          nextWeek: format,
          lastDay: 'bad error',
          lastWeek: 'bad error',
          sameElse: '[Next] ' + format
        });
      }

      this.optionsForDates.push({ date, shortening });
    }

    this.state = {
      date: now,
      minDate: now,

      pickedDate: this.optionsForDates[1],
      pickedTime: now.getHours()
    }

  }

  render() {
    return <View style={{ flex: 1 }}>
      <AppText>Reveal</AppText>
      
      <Picker mode={'dropdown'} style={{ flex: 1}}
        selectedValue={this.state.pickedDate}
        onValueChange={(pickedDate) => this.setState({ pickedDate }) }>

        {this.optionsForDates.map((opt, i) => 
          <Picker.Item key={i} label={opt.shortening} value={i} />
        )}

      </Picker>

       <Picker mode={'dropdown'} style={{ flex: 1}}
          selectedValue={this.state.pickedTime}
          onValueChange={(pickedTime) => this.setState({pickedTime})}>

        {this.optionsForTimes.map((opt, i) => 
          <Picker.Item key={i} label={opt} value={i} />
        )}

      </Picker>

    </View>;
  }
}

export default TimeSelector;
