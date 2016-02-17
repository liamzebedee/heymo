import React, {
	Text, 
	Component,
	TouchableOpacity,
	Alert,
	StyleSheet,
	TouchableHighlight,
	View,
	Navigator
} from 'react-native';
var Ionicon = require('react-native-vector-icons/Ionicons');
import {NewMo, NiceWritingInput} from './NewMo';


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

/*(
      <TouchableOpacity style={{ margin: 10, flex: 1, flexDirection: 'row',
        alignItems: 'center', }} underlayColor="transparent" onPress={this.goBack}>
        <Text style={navbarButtonText}></Text>
      </TouchableOpacity>
    );*/

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

// ion-ios-arrow-back

export { AppText, showError, NiceButton, BackButton, NewMoButton, OKButton, CancelButton };