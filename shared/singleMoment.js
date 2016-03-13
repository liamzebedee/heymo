import React, {
	AppRegistry,
	Component,
	StyleSheet,
	StatusBar,
	PixelRatio,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	TextInput,
	ScrollView,
	CameraRollView,
	View,
	Navigator
} from 'react-native';

var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/FontAwesome');
var moment = require('moment');
import {
	AppText, 
	CancelButton, 
	colours,
	ArrowRightButton
} from './Globals';
import {weirdImage, niceImage} from './_sampleData';
import {SelectFriends} from './SelectFriends'
import TimeSelector from './TimeSelector';
import Router from 'react-native-simple-router'; 
import { forwardMo, heartMo, reMo } from './API';

const PADDING = 6;

var styles = StyleSheet.create({
	header: {
		textAlign: 'center', 
		padding: PADDING, 
		backgroundColor: '#999'
	},
	moment: {
		textAlign: 'center'
	},
	content: { flex: 1, alignItems: 'stretch',
	backgroundColor: '#999' },
	footer: {
		padding: PADDING,
		backgroundColor: '#999'
	},
	buttonContainer: {
		borderRadius: 50, 
		borderColor: '#333', 
		borderWidth: 1,
		borderRadius: 50,
		borderColor: '#666',
		borderWidth: 1,
		padding: 10,
		margin: 5,
		backgroundColor: 'white'
	},
	contentText: {
		fontSize: 28
	},
	button: {
		flex: 1,
		fontSize: 42,
	},
	score: {
		padding: 8,
		alignSelf: 'center'
	},
	container: {
		flex: 0.75
	},

	// -------------
	// Actual layout
	// -------------

	head: {
		flex: 0.1,
		flexDirection: 'row',
		// backgroundColor: 'gray',
		alignItems: 'center'
	},
	contentBody: {
		flex: 0.7,
		// backgroundColor: 'black'
	},
	buttonRow: {
		flex: .2,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});


class SingleMoment extends Component {
	constructor(props) {
		super(props)

		this.state = {
			...this.props
		}

		console.log('Showing moment with data ');
		console.log(this.props)

		this.forwardMo = this.forwardMo.bind(this)
		this.reMo = this.reMo.bind(this)
	}

	forwardMo() {
		var self = this;
		this.props.toRoute({
			name: 'Forward mo\'',
			component: SelectFriends,
			leftCorner: CancelButton,
			rightCorner: View,
     		sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
     		passProps: { 
     			forwardMoment: true, 
     			moment: { id: self.props.moment.moment.id }
     		}
		});
	}

	reMo() {
		var self = this;
		this.props.toRoute({
			name: 'Remo',
			component: TimeSelector,
			leftCorner: CancelButton,
			rightCorner: (props) => <ArrowRightButton onPress={() => {
				this.props.toRoute({
					component: SelectFriends,
					leftCorner: View,
					rightCorner: View,
		     		sceneConfig: Navigator.SceneConfigs.FloatFromRight,
		     		passProps: {
		     			remo: true,
		     			moment: this.props.moment
		     		}
				});
			}}/>,
     		sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
     		passProps: {
     			remo: true, 
     			moment: { id: self.props.moment.moment.id }
     		}
		})
	}

	render() {
		var self = this

		const Padding = () => <View/>;

		const Head = (props) => {
			var time = moment(props.dateCreated).fromNow();
			var from = props.fromUser.username.toUpperCase();

			return <View style={styles.head}>
				<AppText style={{ flex: 1, justifyContent: 'flex-start', padding: 10, fontWeight: '700' }}><Icon name='user'/> {from}</AppText>
				<AppText style={{ flex: 1, justifyContent: 'flex-end', textAlign: 'right', padding: 10 }}><Icon name='clock-o'/> {time}</AppText>
			</View>;
		}

		const ContentBody = (props) => {
			var content = self.props.moment.moment;
			
			if(content.contentImage) {
				return <View style={{flex:1}} key={1}><Image source={{uri: 'data:image/png;base64,'+content.contentImage.data }} style={[styles.contentBody, {height: content.contentImage.height, resizeMode: 'cover'}]}/></View>
			} else {
				return <View style={styles.contentBody}>
					<AppText style={styles.contentText}>{content.contentText}</AppText>
				</View>
			}
		}

		const Foot = (props) => {
			var peopleTagged = props.toUsers.map((user) => {return user+', ';});

			return <View style={styles.foot}>
				<AppText>{peopleTagged}</AppText>
			</View>;
		}

		const Buttons = (props) => {
			var numForwards = 5;
			var numRemos = 3;

			return <View style={styles.buttonRow}>
				<RoundIconButton name='mail-forward' score={numForwards} onPress={this.forwardMo}/>
				<RoundIconButton name='refresh' score={numRemos} onPress={this.reMo}/>
			</View>;
		}

		
		var background = '';

		return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
				<Head {...this.props.moment}/>
				<ContentBody {...this.props.moment}/>
				<Buttons/>
			</View>;
	}
}


class RoundIconButton extends Component {
	render() {
		return <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
			<AppText style={{ paddingRight: 10, fontSize: 25, color: '#999' }}>{this.props.score}</AppText>
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon name={this.props.name} size={55} style={styles.button}/>
			</TouchableOpacity>
		</View>;		
	}
}

class TumblrText extends Component {
	render() {
		var factor = 1;
		var fontSize = 16 * factor;
		var lineHeight = 1.6;
		var lineHeightPx = PixelRatio.getPixelSizeForLayoutSize(lineHeightPx * fontSize);

		return <AppText style={{
			color: "#333", 
			fontFamily: "Helvetica Neue",
			fontSize: fontSize,
			lineHeight: lineHeightPx,
		}}>{this.props.children}</AppText>
	}
}

	export { SingleMoment }