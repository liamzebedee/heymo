'use strict';
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
  Navigator
} from 'react-native';

import Router from 'react-native-simple-router';
import {AppText, BackButton, NewMoButton, ProfileButton, ProfileViewSmall} from './shared/Globals';


const FIRST_PAGE = MainHome;
// const FIRST_PAGE = NewMo;
// const FIRST_PAGE = SingleMoment;
// const FIRST_PAGE = SelectFriends;
// const FIRST_PAGE = NiceWritingInput;
// const FIRST_PAGE = ProfileViewSmall;

import {MainHome} from './shared/MainHome';
import {NewMo, NiceWritingInput} from './shared/NewMo';
import {SingleMoment} from './shared/SingleMoment';
import {SelectFriends} from './shared/SelectFriends';


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
        component: FIRST_PAGE,
        rightCorner: NewMoButton,
        leftCorner: ProfileButton
      }} backButtonComponent={BackButton} headerStyle={styles.navbar}/>
    );
  }
}


AppRegistry.registerComponent('heymo', () => heymo);
