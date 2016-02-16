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
  ActivityIndicatorIOS
} from 'react-native';

import Router from 'react-native-simple-router';
import {AppText} from './shared/Globals';


// const FIRST_PAGE = NewMo;
// const FIRST_PAGE = MainHome;
// const FIRST_PAGE = SingleMoment;
const FIRST_PAGE = SelectFriends;
// const FIRST_PAGE = NiceWritingInput;

import {MainHome} from './shared/MainHome';
import {NewMo, NiceWritingInput} from './shared/NewMo';
import {SingleMoment} from './shared/SingleMoment';
import {SelectFriends} from './shared/SelectFriends';


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
        component: FIRST_PAGE
      }}/>
    );
  }
}


class NewMoButton extends Component {
  createMo() {
    this.props.toRoute({
      name: "New moment",
      component: NewMo,
      rightCorner: View
    });
  }

  render() {
    if(this.props.disabled) return null;

    return <View>
      <TouchableOpacity underlayColor="transparent" onPress={this.createMo.bind(this)}>
        <AppText style={{
        letterSpacing: 0.5,
        color: '#333',
        fontWeight: '500',
       }}>New mo'</AppText>
      </TouchableOpacity>
      </View>;
    }
  }


AppRegistry.registerComponent('heymo', () => heymo);
