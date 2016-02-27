import React, {
  Text, 
  Component,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TouchableHighlight,
  View,
  Navigator,
  Modal,
  TextInput,
  Clipboard,
} from 'react-native';

var Ionicon = require('react-native-vector-icons/Ionicons');
var Icon = require('react-native-vector-icons/FontAwesome');


import { 
  colours, 
  AppText, 
  NiceButton,
  blockUIWhileCommsWithNetwork,
  NewMoButton,
  goHome
} from './Globals';

import { joinUser, signInUser, getUser } from './API';

import { MainHome } from './MainHome';


class ProfileViewSmall extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state = { username: 'test', password: '123' }

    this.join = this.join.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  join() {
    var self = this;
    (async () => {
      try {
        await joinUser({ username: self.state.username, password: self.state.password })
        self.navHome()
      } catch(err) {
        alert(err.message)
      }
    })()
  }

  signIn() {
    var self = this;
    (async () => {
      try {
        await signInUser({ username: self.state.username, password: self.state.password })
        self.navHome()
      } catch(err) {
        alert(err.message)
      }
    })()
  }

  navHome() {
    var self = this;
    goHome({ routerObj: self });
  }

  componentDidMount() {
    var self = this;
    this.props.setRightProps({
      login: self.login
    });

    if(this.props.noAutologin) {
      (async function() {
        var user = await getUser();
        if(user) {
          self.signIn()
        }
      })();
    }
  }

  render() {
    var styles = StyleSheet.create({
      textPadding: {
        paddingLeft: 15,
        paddingBottom: 5
      },
      heading: {
        fontWeight: '300',
        fontSize: 28,
        color: colours.pink,
        padding: 15
      },
      input: {
        flex: 1,
        height: 30,
        margin: 15,
        fontSize: 20
      },
      inputCtn: {
        flex: 1,    
        borderColor: 'black',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0
      },
      controlItem: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        alignSelf: 'center', 
        justifyContent: 'center',
      },
      text: {
        fontSize: 22,
        color: 'white'
      }
    })

    return <View>

      <View style={{ flex: 1 }}>
        <AppText style={[styles.heading, styles.textPadding]}>USERNAME</AppText>
        <View style={[styles.inputCtn, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          <TextInput value={this.state.username} onChangeText={(username) => this.setState({ username }) } autoCapitalize='none' autoCorrect={false} style={[styles.input, { flex: 0.9 }]} placeholder={"P.S. emojii works too"}/>
        </View>

        <AppText style={[styles.heading, styles.textPadding]}>PASSWORD</AppText>
        <View style={styles.inputCtn}><TextInput value={this.state.password} onChangeText={(password) => this.setState({ password }) } autoCapitalize='none' autoCorrect={false} style={styles.input} placeholder="enter new password"/></View>
      </View>

      <View style={{ flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around', height: 60, margin: 10 }}>
        <NiceButton onPress={this.join} style={[styles.controlItem, { height: 50 }]}><AppText style={styles.text}>Join</AppText></NiceButton>
        <AppText style={[styles.controlItem, { textAlign: 'center', fontSize: 22 }]}> or </AppText>
        <NiceButton onPress={this.signIn} style={[styles.controlItem, { height: 50 }]}><AppText style={styles.text}>Sign in</AppText></NiceButton>
      </View>

    </View>
  }
}

export default ProfileViewSmall;