import React, {
	View,
	Text,
	Component
} from 'react-native';

import { getAccessToken } from './API';

class DebugPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accessToken: null
		}
	}

	componentDidMount() {
		var self = this;
		(async () => {
			self.setState({ accessToken: await getAccessToken() })
		})()
	}

	render() {
		return <View>
			<Text>accessToken: {this.state.accessToken}</Text>
		</View>
	}
}

export default DebugPage;