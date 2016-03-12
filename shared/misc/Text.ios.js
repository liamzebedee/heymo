import React, {
  Component,
  View,
} from 'react-native';

class Text extends Component {
	render() {
		return <React.Text {...this.props} style={[{ fontFamily: 'Helvetica Neue' }, this.props.style]}/>;
	}
}

export default Text;