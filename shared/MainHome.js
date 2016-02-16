import React, {
  Component,
  View,
  StyleSheet,
  ActivityIndicatorIOS,
  Text,
  TouchableOpacity,
  ListView,
  Navigator
} from 'react-native';
var GridView = require('react-native-grid-view');
var Icon = require('react-native-vector-icons/FontAwesome');


import {colours} from './Theme';
import {SingleMoment} from './SingleMoment';


class MainHome extends Component {
  constructor(props) {
    super(props);

    // var dataSrc = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // dataSrc.cloneWithRows(
    this.state = {
      receivedHeymos: [
        { opened: false, locked: false, heymoId: "12312312312" },
        { opened: true, locked: false, heymoId: "213d2131233" },
        { opened: false, locked: true, heymoId: "63452343423" },
        { opened: false, locked: true, heymoId: "63452343423" },
      ],
      loading: false
    };
  }

  renderItem(item) {
    return <Heymo key={item.heymoId} {...item} onPress={this.openItem.bind(this, item)}/>;
  }

  openItem(item) {
    this.props.toRoute({
      name: "Moment",
      component: SingleMoment,
      data: item,
      // sceneConfig: Navigator.SceneConfigs.FloatFromBottomAndroid
    });
  }

  render() {
    var styles = StyleSheet.create({
      centering: {
        flex: 1
      }
    });

    var loading = this.state.loading ? <ActivityIndicatorIOS
          style={[styles.centering, styles.gray, {height: 80}]}
          color="black"
          size="large"/> : null;

    return <View style={{ flex: 1 }}>
      <GridView style={{ paddingTop: 10 }}
          items={this.state.receivedHeymos}
          itemsPerRow={3}
          renderItem={this.renderItem.bind(this)}/>
    </View>
  }
}

class Heymo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var styles = StyleSheet.create({
      mo: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: colours.blue,

        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 50,
        margin: 5,
      }
    })

    return <TouchableOpacity onPress={this.props.onPress}><View style={styles.mo}>
    </View></TouchableOpacity>
  }
}

export { MainHome };