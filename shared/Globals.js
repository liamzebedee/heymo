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
  TextInput
} from 'react-native';
var Ionicon = require('react-native-vector-icons/Ionicons');
import {NewMo, NiceWritingInput} from './NewMo';
import {getUser} from './API'

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

class ProfileViewSmall extends Component {
  constructor(props) {
    super(props)
    this.state = getUser()

    this.saveProfile = this.saveProfile.bind(this)
    this.copyUsernameToClipboard = this.copyUsernameToClipboard.bind(this)
  }

  saveProfile() {
    this.props.toBack()
  }

  copyUsernameToClipboard() {

  }

  componentDidMount() {
    var self = this;
    this.props.setRightProps({
      doSave: self.saveProfile
    })
  }

  render() {
    var styles = StyleSheet.create({
      heading: {
        fontWeight: '300',
        fontSize: 28,
        padding: 15,
        color: colours.pink,
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
      <AppText style={styles.heading}>USERNAME</AppText>
      <View style={[styles.inputCtn, { flexDirection: 'row', flexWrap: 'wrap' }]}>
        <TextInput value={this.state.username} onChangeText={(username) => this.setState({ username }) } autoCapitalize='none' autoCorrect={false} style={[styles.input, { flex: 0.9 }]}/>
        <NiceButton style={{ flex: 0.1, alignSelf: 'center', justifyContent: 'center', margin: 10, backgroundColor: 'transparent' }} onPress={this.copyUsernameToClipboard}><Ionicon style={{ color: colours.blue }} size={28} name="clipboard"/></NiceButton>
      </View>

      <AppText style={styles.heading}>PASSWORD</AppText>
      <View style={styles.inputCtn}><TextInput value={this.state.password} onChangeText={(password) => this.setState({ password }) } autoCapitalize='none' autoCorrect={false} style={styles.input}/></View>
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

// ion-ios-arrow-back

export { colours, AppText, showError, NiceButton, BackButton, NewMoButton, OKButton, CancelButton, ProfileButton, ProfileViewSmall };