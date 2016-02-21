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
import {NewMo, NiceWritingInput} from './NewMo';
import {getUser, createUser} from './API'
import ProfileViewSmall from './Login';

var colours = {
  blue: '#5890ff',
  red: '#D21C28',
  pink: '#CE2880',
  lightBlue: '#CAE6F2',
  green: '#849F35'
};



class AppText extends Component {
	render() {
		return <Text {...this.props} style={[{ fontFamily: 'Helvetica Neue' }, this.props.style]}/>
	}
}

class NiceButton extends Component {
	render() {
		return <TouchableOpacity style={[{
	        backgroundColor: '#5890ff',
	        borderRadius: 5,
	      }, this.props.style]} onPress={this.props.onPress}>
	      {this.props.children}
		</TouchableOpacity>
	}
}

function showError(msg) {
	Alert.alert("Something happened", "Error: " + msg)
}


var navbarButtonText = {
        color: 'white',
        margin: 10,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
      }


class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = () => this.props.toBack();
  }

  render() {
    return <Ionicon style={[navbarButtonText, { fontSize: 28 }]} size={30} name='ios-arrow-back'/>
  }
}


class NewMoButton extends Component {
  createMo() {
    this.props.toRoute({
      name: "New moment",
      component: NewMo,
      rightCorner: View,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    });
  }

  render() {
    if(this.props.disabled) return null;

    return <View>
      <TouchableOpacity underlayColor="transparent" onPress={this.createMo.bind(this)}>
        <AppText style={[navbarButtonText]}><Ionicon name='plus-round'/> New mo'</AppText>
      </TouchableOpacity>
    </View>;
  }
}

class ProfileButton extends Component {
  constructor(props) {
    super(props)
    this.showProfile = this.showProfile.bind(this)
    this.doSave = this.doSave.bind(this)
  }

  doSave() {
    alert('saved')
  }

  showProfile() {
    var self = this;
    this.props.toRoute({
      name: "Profile",
      component: ProfileViewSmall,
      rightCorner: SaveButton,
      sceneConfig: Navigator.SceneConfigs.FloatFromLeft
    })
  }

  render() {
    var styles = StyleSheet.create({
      container: {
        backgroundColor: 'white'
      }
    });

    return <View>
      <TouchableOpacity underlayColor="transparent" onPress={this.showProfile}>
        <AppText style={[navbarButtonText]}><Ionicon size={16} name='person'/></AppText>
      </TouchableOpacity>
    </View>
  }
}



// OK Button
class OKButton extends Component {
	render() {
		return <TouchableOpacity underlayColor="transparent" onPress={this.props.onPress}>
			<Text style={[navbarButtonText, { fontWeight: '700' }]}>OK</Text>
		</TouchableOpacity>;
	}
}

class CancelButton extends Component {
  render() {
    return <TouchableOpacity underlayColor="transparent" onPress={this.props.goBack}>
      <Text style={navbarButtonText}>Cancel</Text>
    </TouchableOpacity>;
  }
}

class SaveButton extends Component {
  render() {
    return <TouchableOpacity underlayColor="transparent" onPress={this.props.doSave}>
      <Text style={navbarButtonText}>Save</Text>
    </TouchableOpacity>;
  }
}

class RegisterLoginButton extends Component {
  render() {
    return <TouchableOpacity underlayColor="transparent" onPress={this.props.login}>
      <Text style={navbarButtonText}>Register/Login</Text>
    </TouchableOpacity>
  }
}


// var PushNotification = require('react-native-push-notification');
 
// PushNotification.configure({
//     // (optional) Called when Token is generated (iOS and Android) 
//     onRegister: function(token) {
//         console.log( 'TOKEN:', token );
//     },
 
//     // (required) Called when a remote or local notification is opened or received 
//     onNotification: function(notification) {
//         console.log( 'NOTIFICATION:', notification );
//     },
 
//     // ANDROID ONLY: (optional) GCM Sender ID. 
//     senderID: "YOUR GCM SENDER ID",
 
//     // IOS ONLY (optional): default: all - Permissions to register. 
//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true
//     },
    
//     /**
//       * IOS ONLY: (optional) default: true
//       * - Specified if permissions will requested or not,
//       * - if not, you must call PushNotificationsHandler.requestPermissions() later
//       */
//     requestPermissions: true,
// });


// export function showNotification(foo) {
//   PushNotification.localNotification({
//     /* Android Only Properties */
//     id: 0, // (optional) default: Autogenerated Unique ID 
//     title: "My Notification Title", // (optional) 
//     ticker: "My Notification Ticker", // (optional) 
//     largeIcon: "ic_launcher", // (optional) default: "ic_launcher" 
//     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher" 
 
//     /* iOS and Android properties */
//     message: "My Notification Message" // (required) 
// });
// }


export { colours, AppText, showError, NiceButton, BackButton, NewMoButton, OKButton, CancelButton, ProfileButton, RegisterLoginButton };