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
  Clipboard
} from 'react-native';

var Ionicon = require('react-native-vector-icons/Ionicons');
var Icon = require('react-native-vector-icons/FontAwesome');


import { 
  colours, 
  AppText, 
  NiceButton,
  blockUIWhileCommsWithNetwork
} from './Globals';

import { loginOrCreateUser } from './API';


class ProfileViewSmall extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.login = this.login.bind(this)
  }

  login() {
    var self = this;
    (async () => {
      await loginOrCreateUser({ username: self.username, password: self.password })
    })()
  }

  componentDidMount() {
    var self = this;
    this.props.setRightProps({
      login: self.login
    })
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
      }
    })

    return <View>
      <AppText style={[styles.heading, styles.textPadding]}>USERNAME</AppText>
      <View style={[styles.inputCtn, { flexDirection: 'row', flexWrap: 'wrap' }]}>
        <TextInput value={this.state.username} onChangeText={(username) => this.setState({ username }) } autoCapitalize='none' autoCorrect={false} style={[styles.input, { flex: 0.9 }]} placeholder={"P.S. emojii works too"}/>
      </View>

      <AppText style={[styles.heading, styles.textPadding]}>PASSWORD</AppText>
      <View style={styles.inputCtn}><TextInput value={this.state.password} onChangeText={(password) => this.setState({ password }) } autoCapitalize='none' autoCorrect={false} style={styles.input} placeholder="enter new password"/></View>
    </View>
  }
}

export default ProfileViewSmall;