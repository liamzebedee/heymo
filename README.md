


Set a username (essential for comms)
Make sure other people don't login with the same username
	add a user-set password
	add a server-set password
	add facebook auth
	use the device ID


email: can communicate directly (otherwise through app)
facebook: have access to graph api




/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var _ = require('lodash');
var DDPClient = require("ddp-client");

var todos = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    var ddpClient = new DDPClient({url: 'ws://localhost:3000/websocket'});

    ddpClient.connect(() => ddpClient.subscribe('publicLists'));

    // observe the lists collection
    var observer = ddpClient.observe("lists");
    observer.added = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
    observer.changed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
    observer.removed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.lists)));
  },

  updateRows: function(rows) {
    this.setState({
     dataSource: this.state.dataSource.cloneWithRows(rows),
     loaded: true,
   });
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderList}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading lists...
        </Text>
      </View>
    );
  },

  renderList: function(list) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{list.name}</Text>
        <Text style={styles.incompleteCount}>{list.incompleteCount}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  name: {
    flex: 5,
    fontSize: 18,
  },
  incompleteCount: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#2196F3',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('todos', () => todos);







The decision making methodology:
 - less is better: if it comes to a choice between adding a feature and not adding one, just don't add it. If the user wants it, you will know. Better make something super fucking perfect than something pretty good with that one weird feature.
 - if it comes to implementing it the right way vs. implementing it, just fucking implement it. Deal with scale later.





 - rnpm


 https://www.google.com.au/search?q=her+colours&num=40&tbm=isch&imgil=ZlziA1myMLnsVM%253A%253BeDxX12F4XqQRNM%253Bhttp%25253A%25252F%25252Fwww.melsbrushes.co.uk%25252F12-colour-palettes-taken-from-visually-stunning-films%25252F&source=iu&pf=m&fir=ZlziA1myMLnsVM%253A%252CeDxX12F4XqQRNM%252C_&usg=__qxxCKiE2UCynrpncsffRkGSJjKU%3D&biw=1277&bih=609&ved=0ahUKEwj6-riukfLKAhVT22MKHTdBBvEQyjcIJQ&ei=28O9VrqhJ9O2jwO3gpmIDw#imgrc=ZlziA1myMLnsVM%3A



 rm -rf ./node_modules/react-native-router/node_modules/react-native

 https://github.com/marcshilling/react-native-image-picker



What am I going to write?


 	Here's something really interesting for your intellectual curiosity. 
 	Here's a beautiful picture. Remember beauty.
 	Remember this time with a friend?
 	Here's this quote.

then you just remo it to other friends



https://github.com/facebook/react-native/blob/f48961388e7eb58a52164f7bf9809b5af11e4f43/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js#L458