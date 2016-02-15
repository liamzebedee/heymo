import React, {
	Text, 
	Component,
} from 'react-native';

class AppText extends Component {
	render() {
		return <Text {...this.props} style={[{ fontFamily: 'Helvetica Neue' }, this.props.style]}/>
	}
}

export { AppText };