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
import {AppText, CancelButton} from './Globals';
import {weirdImage, niceImage} from './_sampleData';
import {SelectFriends} from './SelectFriends'
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
		// backgroundColor: 'blue'
	},
});


class SingleMoment extends Component {
	constructor(props) {
		super(props)

		this.state = {
			momentId: '13123123',
			timeAgo: '2d',
			from: 'Aymeric',
			peopleTagged: "Aymeric, Anna, Moeuf, Liam, Rumy",
			numReheys: 5,
			numHearts: 4,
			numForwards: 12,
			contentImage: "data:image/jpeg;base64," + niceImage,
			contentImageWidth: 100,
			contentImageHeight: 800
		}

		this.forwardMo = this.forwardMo.bind(this)
		this.heartMo = this.heartMo.bind(this)
		this.reMo = this.reMo.bind(this)
	}

	forwardMo() {
		var self = this;
		this.props.toRoute({
			name: 'Forward mo\'',
			component: SelectFriends,
			leftCorner: () => <CancelButton goBack={self.props.toBack}/>,
			rightCorner: View,
     		sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
     		data: { momentId: self.state.momentId }
		})
	}

	heartMo() {

	}

	reMo() {

	}

	componentWillMount() {
		Image.getSize(this.state.contentImage, (width, height) => {
			console.log(height)
			this.setState({contentImageWidth: width, contentImageHeight: height});
		});
	}

	render() {
		var self = this

		const Padding = () => <View/>;

		const Head = (props) =>
			<View style={styles.head}>
				<AppText style={{ flex: 1, justifyContent: 'flex-start', padding: 10, fontWeight: '700' }}>{props.from}</AppText>
				<AppText style={{ flex: 1, justifyContent: 'flex-end', textAlign: 'right', padding: 10 }}><Icon name='clock-o'/> {props.timeAgo} ago</AppText>
			</View>;

		const ContentBody = (props) => {
			if(props.contentImage) {
				return <View style={{flex:1}} key={1}><Image source={{uri: props.contentImage }} style={[styles.contentBody, {height: self.contentImageHeight, resizeMode: 'cover'}]}/></View>
			} else {
				return <View style={styles.contentBody}>
					<AppText>{props.contentText}</AppText>
				</View>
			}
		}

		const Foot = (props) => 
			<View style={styles.foot}>
				<AppText>{props.peopleTagged}</AppText>
			</View>;

		const Buttons = (props) => 
			<View style={styles.buttonRow}>
				<RoundIconButton name='mail-forward' score={this.state.numForwards} onPress={this.forwardMo}/>
				<RoundIconButton name='heart' score={this.state.numHearts} onPress={this.heartMo}/>
				<RoundIconButton name='refresh' score={this.state.numReheys} onPress={this.reMo}/>
			</View>;

		
		// <Foot {...this.state}/>

		var background = '';

		return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
				<Head {...this.state}/>
				<ContentBody {...this.state}/>
				<Buttons/>
			</View>;
		}
	}

	class RoundIconButton extends Component {
		render() {
			return <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
				<AppText style={{ paddingRight: 10, fontSize: 25, color: '#999' }}>{this.props.score}</AppText>
				<TouchableOpacity style={{  }} onPress={this.props.onPress}>
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