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
import {showError} from './Globals';

class NewMo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.writeSomething = this.writeSomething.bind(this)
    this.capture = this.capture.bind(this)
  }

  componentDidMount() {
  }

  writeSomething() {
    this.props.toRoute({
      component: NiceWritingInput
    })
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
      var imgData;

      if(response.didCancel) {
        return;
      }

      if(response.error) {
        if(response.error === "Cxamera not available on simulator") {
          imgData = niceImage;
        } else {
          return showError(response.error)
        }
      }

      this.props.toRoute({
        name: "Send mo",
        component: SelectFriends,
        rightCorner: View
      });
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
        // flex: 1, 
        fontSize: 36,
        // flexWrap: 'wrap',
        color: "#333", 
        fontFamily: "Helvetica Neue",
        // lineHeight: 3,
        // width: 100,
        // height: 40,
      },
      textInputCtn: {
        // margin: 10,
        // // padding: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center'
      },
    })

    return <View style={styles.textInputCtn}>
      <ExpandingTextInput style={styles.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text} placeholder="Type it here..."/>
    </View>;
  }
}


export { NewMo, NiceWritingInput };