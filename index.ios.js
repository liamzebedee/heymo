'use strict';
global.___DEV___ = false;
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  StatusBar,
  PixelRatio,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  CameraRollView,
  SliderIOS,
  View,
  ActivityIndicatorIOS,
  Navigator,
  Text
} from 'react-native';

import Router from 'react-native-simple-router';
import {AppText, BackButton, NewMoButton, ProfileButton, RegisterLoginButton} from './shared/Globals';

import { getUser } from './shared/API'

var FIRST_PAGE;
// FIRST_PAGE = MainHome;
// FIRST_PAGE = NewMo;
// FIRST_PAGE = SingleMoment;
// FIRST_PAGE = SelectFriends;
// const FIRST_PAGE = NiceWritingInput;
// const FIRST_PAGE = ProfileViewSmall;
// FIRST_PAGE = DebugPage;
FIRST_PAGE = ProfileViewSmall;

import {MainHome} from './shared/MainHome';
import {NewMo, NiceWritingInput} from './shared/NewMo';
import {SingleMoment} from './shared/SingleMoment';
import {SelectFriends} from './shared/SelectFriends';
import ProfileViewSmall from './shared/Login';
import DebugPage from './shared/Debug';


class heymo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var self = this;
    var styles = StyleSheet.create({
      navbar: {
        backgroundColor: '#8B45A9',
        flex: 1
      },
      container: {
        backgroundColor: '#752116'
      }
    })

    return (
      <Router firstRoute={{
        name: 'heymo!',
        component: FIRST_PAGE
      }} backButtonComponent={BackButton} headerStyle={styles.navbar}/>
    );
  }
}


AppRegistry.registerComponent('heymo', () => heymo);
