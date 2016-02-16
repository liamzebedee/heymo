import React, {
	Text, 
	Component,
	TouchableOpacity
} from 'react-native';

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
	      }, this.props.style]}>
	      {this.props.children}
		</TouchableOpacity>
	}
}

function showError(msg) {
	alert("Something happened", "Error: "+msg)
}

export { AppText, showError, NiceButton };