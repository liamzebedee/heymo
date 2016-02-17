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

import {SelectFriends} from './SelectFriends';
import {niceImage} from './_sampleData';
import {showError, OKButton, CancelButton} from './Globals';

class NewMo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentText: null
    }

    this.writeSomething = this.writeSomething.bind(this)
    this.capture = this.capture.bind(this)
    this.sendMo = this.sendMo.bind(this)
  }

  componentDidMount() {
  }

  writeSomething() {
    var self = this;

    this.props.toRoute({
      component: () => <NiceWritingInput onChangeText={(text) => self.setState({ contentText: text })}/>,
      leftCorner: () => <CancelButton goBack={self.props.toBack}/>,
      rightCorner: () => <OKButton onPress={() => { self.sendMo({ contentText: self.state.contentText }) }}/>
    })
  }
  
  capture() {
    var self = this;

    var options = {
      title: 'Select Image', 
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', 
      chooseFromLibraryButtonTitle: 'Choose from Library...', 
      cameraType: 'back', 
      mediaType: 'photo', 
      videoQuality: 'high', 
      quality: 1.0, 
      angle: 0, 
      allowsEditing: false, 
      noData: false, 
      storageOptions: { 
        skipBackup: true, 
        path: 'images' 
      }
    };

    UIImagePickerManager.launchCamera(options, (response)  => {
      var image = {
        data: null,
        width: 300,
        height: 500
      };

      if(response.didCancel) {
        return;
      }

      if(response.error) {
        if(response.error === "Camera not available on simulator") {
          imgData = niceImage;
        } else {
          return showError(response.error)
        }
      }

      image = {
        data: response.data,
        width: response.width,
        height: response.height
      }

      this.sendMo({ contentImage: image });
    });
  }

  sendMo(data) {
    // alert(JSON.stringify(data))
    this.props.toRoute({
      name: "Send mo'",
      component: SelectFriends,
      rightCorner: View,
      data,
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
        <TouchableOpacity style={styles.addMedia} onPress={this.writeSomething}>
           <Text style={styles.prettyButton}><Icon name='font' size={25}/> Write something</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: .1 }}><Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '200' }}>— or —</Text></View>

      <View style={[styles.box]}>
        <TouchableOpacity style={styles.addMedia} onPress={this.capture}>
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
        color: "#333", 
        fontFamily: "Helvetica Neue",
        fontWeight: '300'
      },
    })

    return <View style={{ flex: 1 }}>
      <ExpandingTextInput autoFocus={true} style={styles.textInput} onChangeText={(text) => { this.setState({text}); this.props.onChangeText(text)}} value={this.state.text} placeholder="A quote, a joke, whatever floats your boat..."/>
    </View>;
  }
}


export { NewMo, NiceWritingInput };