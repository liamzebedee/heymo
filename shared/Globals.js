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

import {NewMo, NiceWritingInput} from './NewMo';
import {getUser, createUser, logout} from './API'
import ProfileViewSmall from './Login';
import {MainHome} from './MainHome';

var Icon = require('react-native-vector-icons/FontAwesome');
var Ionicon = require('react-native-vector-icons/Ionicons');






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
    var style = [{
      backgroundColor: '#5890ff',
      borderRadius: 5,
    }, this.props.style];

    if(this.props.disabled) {
      return <View style={[...style, { opacity: 0.5 }]}>{this.props.children}</View>
    } else {
		return <TouchableOpacity style={style} onPress={this.props.onPress}>
  	   {this.props.children}
  		</TouchableOpacity>
    }
	}
}

function showError(msg) {
	Alert.alert("Something happened", "Error: " + msg)
}


var navbarButtonText = {
  color: 'white',
  fontWeight: '600',
  textAlign: 'center',
  alignItems: 'center',
}

class NewMoButton extends Component {
  createMo() {
    this.props.toRoute({
      name: "New moment",
      component: NewMo,
      // rightCorner: View,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    });
  }

  render() {
    if(this.props.disabled) return null;

    return <View>
      <TouchableOpacity underlayColor="transparent" onPress={this.createMo.bind(this)}>
        <View style={{padding:10}}><AppText style={[navbarButtonText]}><Ionicon name='plus-round'/> New mo'</AppText></View>
      </TouchableOpacity>
    </View>;
  }
}



class GenericTextButton extends Component {
  render() {
    if(this.props.disabled) {
      return <Text style={[navbarButtonText, this.props.textStyles, { opacity: 0.5 }]}>{this.props.text}</Text>;
    } else {
      return <TouchableOpacity underlayColor="transparent" onPress={this.props.onPress}>
        <Text style={[navbarButtonText, this.props.textStyles]}>{this.props.text}</Text>
      </TouchableOpacity>;
    }
  }
}


class BackButton extends Component {
  render() {
    return <Ionicon style={[navbarButtonText, { fontSize: 28 }]} size={30} name='ios-arrow-back'/>
  }
}

class OKButton extends Component {
	render() {
    return <GenericTextButton textStyles={{ fontWeight: '700' }} disabled={this.props.disabled} text="OK" onPress={this.props.onPress}/>;
	}
}

class ArrowRightButton extends Component {
  render() {
    return <TouchableOpacity underlayColor="transparent" onPress={this.props.onPress}>
      <AppText style={[navbarButtonText]}><Ionicon size={16} name='arrow-right-c'/></AppText>
    </TouchableOpacity>;
  }
}

class CancelButton extends Component {
  render() {
    return <TouchableOpacity underlayColor="transparent" onPress={this.props.toBack}>
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

class LogoutButton extends Component {
  render() {
    return <TouchableOpacity underlayColor="transparent" onPress={this.props.logout}>
      <AppText style={[navbarButtonText]}><Icon size={16} name='sign-out'/></AppText>
    </TouchableOpacity>
  }
}

export function goHome({ routerObj }) {
  function logoutGUI() {
    logout();

    routerObj.props.resetToRoute({
      name: 'heymo!',
      component: ProfileViewSmall
    });
  }

  routerObj.props.resetToRoute({
    name: 'heymo!',
    component: MainHome,
    leftCorner: () => <LogoutButton logout={logoutGUI}/>,
    // leftCorner: ProfileButton,
    rightCorner: NewMoButton,
    sceneConfig: Navigator.SceneConfigs.FadeAndroid
  });
}


var PushNotification = require('react-native-push-notification');
 
// PushNotification.configure({
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
//       /* Android Only Properties */
//       id: 0, // (optional) default: Autogenerated Unique ID 
//       title: "My Notification Title", // (optional) 
//       ticker: "My Notification Ticker", // (optional) 
//       largeIcon: "ic_launcher", // (optional) default: "ic_launcher" 
//       smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher" 
   
//       /* iOS and Android properties */
//       message: "My Notification Message" // (required) 
//   });
// }


export { 
  colours, 
  AppText, 
  showError, 

  NiceButton, 
  BackButton, 
  NewMoButton, 
  OKButton, 
  CancelButton, 
  RegisterLoginButton, 
  ArrowRightButton 

};