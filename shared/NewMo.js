import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
var ExpandingTextInput = require('../ExpandingTextInput')
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var Icon = require('react-native-vector-icons/FontAwesome');


class NewMo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  writeSomething() {

  }
  
  capture() {
    var options = {
      title: 'Select Image', 
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', 
      chooseFromLibraryButtonTitle: 'Choose from Library...', 
      cameraType: 'back', 
      mediaType: 'photo', 
      videoQuality: 'high', 
      aspectX: 2, 
      aspectY: 1, 
      quality: 1.0, 
      angle: 0, 
      allowsEditing: true, 
      noData: false, 
      storageOptions: { 
        skipBackup: true, 
        path: 'images' 
      }
    };

    UIImagePickerManager.launchCamera(options, (response)  => {
    });
  }

  render() {
    var styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
      },
      box: {
        flex: .45,
      },
      prettyButton: {
        padding: 30,
        fontSize: 25,
        backgroundColor: '#5890ff',
        color: 'white',
        borderRadius: 5,
        fontWeight: '600'
      },
      cameraInput: {
        flex: 1,
      },
      addMedia: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center', alignItems: 'center',justifyContent: 'center',
      }
    })

    return <View style={styles.container}>
      <View style={[styles.box]}>
        <TouchableOpacity underlayColor="transparent" style={styles.addMedia} onPress={this.writeSomething.bind(this)}>
          <Text style={styles.prettyButton}><Icon name='font' size={25}/> Write something</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: .1 }}><Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '200' }}>— or —</Text></View>

      <View style={[styles.box]}>
        <TouchableOpacity underlayColor="transparent" style={styles.addMedia} onPress={this.capture.bind(this)}>
          <Text style={styles.prettyButton}><Icon name='camera' size={25}/> Capture</Text>
        </TouchableOpacity>
      </View>
    </View>;
  }
}


class NiceWritingInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null
    }
  }

  render() {
    var styles = StyleSheet.create({
      textInput: {
        flex: 1, 
        fontSize: 36,
        flexWrap: 'wrap',
        color: "#333", 
        fontFamily: "Helvetica Neue",
        lineHeight: 3.6
      },
      textInputCtn: {
        borderColor: '#777',
        margin: 10,
        borderWidth: 1,
        padding: 10,
      },
    })

    return <View style={styles.textInputCtn}>
      <ExpandingTextInput style={styles.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text} placeholder="Type it here..."/>
    </View>;
  }
}


export { NewMo };