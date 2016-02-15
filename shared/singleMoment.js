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
	SliderIOS,
	View,
	ActivityIndicatorIOS
} from 'react-native';

var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/FontAwesome');
import {AppText} from './Globals';
import {weirdImage, niceImage} from './_sampleData';

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
			buttonRow: {
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-around'
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
				flex: 1
			},
			contentBody: {
				flex: 1
			},
			foot: {
				flex: 1
			}
		});


class SingleMoment extends Component {
	constructor(props) {
		super(props)

		this.state = {
			timeAgo: '2d',
			peopleTagged: "Aymeric, Anna, Moeuf, Liam, Rumy",
			numReheys: 5,
			numHearts: 4,
			numForwards: 12,
			contentImage: "data:image/jpeg;base64," + niceImage,
			contentImageWidth: 100,
			contentImageHeight: 100
		}
	}

	componentDidMount() {
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
				<AppText style={{ textAlign: 'center' }}>{props.timeAgo}</AppText>
			</View>;

		const ContentBody = (props) => {
			if(props.contentImage) {
				return <Image source={{uri: props.contentImage }} style={[styles.contentBody, {height: self.contentImageHeight, resizeMode: 'cover'}]}/>
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
				<RoundIconButton name='mail-forward' score={this.state.numForwards}/>
				<RoundIconButton name='heart' score={this.state.numHearts}/>
				<RoundIconButton name='refresh' score={this.state.numReheys}/>
			</View>;

		return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
				<Head {...this.state}/>
				<ContentBody {...this.state}/>
				<Foot {...this.state}/>
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