import React, {
  Component,
  View,
} from 'react-native';

class Text extends Component {
	render() {
		return <View style={{ padding: this.props.padding || 0 }}>
			<Text {...this.props} style={[{ fontFamily: 'Helvetica Neue' }, this.props.style]}/>
		</View>;
	}
}

export default Text;