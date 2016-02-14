'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  StatusBar,
  PixelRatio,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  CameraRollView,
  SliderIOS,
  View,
  ActivityIndicatorIOS
} from 'react-native';

import Router from 'react-native-simple-router';
import Radio from './RadioButton';
var Option = Radio.Option;

var Button = require('react-native-button');

const PADDING = 6;




import {MainHome} from './shared/MainHome.js';
import {NewMo} from './shared/NewMo';

class heymo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    var self = this;
    var styles = StyleSheet.create({
      navbar: {
        backgroundColor: '#8B45A9'
      },
      container: {
        backgroundColor: '#752116'
      }
    })


    return (
      <Router headerStyle={styles.navbar} rightCorner={NewMoButton} firstRoute={{
        name: 'heymo!',
        component: MainHome
      }}/>
    );
  }
}


class NewMoButton extends Component {
  createMo() {
    this.props.toRoute({
      name: "New moment",
      component: NewMo
    });
  }

  render() {
    return <View>
      <TouchableOpacity underlayColor="transparent" onPress={this.createMo.bind(this)}>
        <Text style={{
        letterSpacing: 0.5,
        color: '#333',
        fontWeight: '500',
       }}>New mo'</Text>
      </TouchableOpacity>
      </View>;
    }
  }


AppRegistry.registerComponent('heymo', () => heymo);