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
      text: "I\'m just using the standard ReactNative libs, I don't think I have to explicitly 'require' flexbox or anything? I'm not using it anywhere other than these two views – SparkyRobinson Nov 10 '15 at 21:34"
    }
  }

  componentDidMount() {
    this.props.setRightProps({
      rightCorner: () => <Icon.Button style={{ backgroundColor: 'transparent' }} background={'none'} name='angle-right' onPress={this.navNextStep.bind(this)}/>
    })
  }

  navNextStep() {
    // this.props.toRoute({
    //   name: "New moment",
    //   component: NewMoChooseTime
    // });
  }

  camera() {
    var options = {
      title: 'Select Avatar', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      customButtons: {
        'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      },
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      maxWidth: 100, // photos only
      maxHeight: 100, // photos only
      aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.2, // photos only
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
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
        flex: .5,
      },
      textInput: {
        flex: 1,
        borderColor: 'gray', 
        borderWidth: 1,
        fontSize: 36,
        flexWrap: 'wrap',
        color: "#333", 
        fontFamily: "Helvetica Neue",
        lineHeight: 3.6
      },
      cameraInput: {
        flex: 1,
      },
      addMedia: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center', alignItems: 'center',justifyContent: 'center'
      }
    })

    return <View style={styles.container}>
      <View style={styles.box}>
        <ExpandingTextInput style={styles.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text} placeholder="Type it here..."/>
      </View>

      <View style={[styles.box]}>
        <TouchableOpacity underlayColor="transparent" style={styles.addMedia} onPress={this.camera.bind(this)}>
          <Text style={{ flex: 1, alignSelf: 'center', alignItems: 'center',justifyContent: 'center' }}>Add media</Text>
        </TouchableOpacity>
      </View>
    </View>;
  }
}
export { NewMo };