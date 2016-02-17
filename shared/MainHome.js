import React, {
  Component,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
  Navigator
} from 'react-native';
var GridView = require('react-native-grid-view');
var Icon = require('react-native-vector-icons/FontAwesome');

import {BackButton} from './Globals';
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

    this.viewMo = this.viewMo.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem(item) {
    return <Heymo key={item.heymoId} {...item} onPress={this.viewMo.bind(item)}/>;
  }

  viewMo(moment) {
    this.props.toRoute({
      name: "Moment",
      component: SingleMoment,
      rightCorner: View,
      data: moment,
    });
  }

  render() {
    var styles = StyleSheet.create({
      centering: {
        flex: 1
      }
    });

    // var loading = this.state.loading ? <ActivityIndicatorIOS
    //       style={[styles.centering, styles.gray, {height: 80}]}
    //       color="black"
    //       size="large"/> : null;

    return <View style={{ flex: 1 }}>
      <GridView style={{ paddingTop: 10 }}
          items={this.state.receivedHeymos}
          itemsPerRow={3}
          renderItem={this._renderItem}/>
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

        borderRadius: 50,
        margin: 5,
      },

      unreadMo: {
        borderColor: colours.pink,
        borderWidth: 10,
      }
    })

    var moStyles = [styles.mo];
    if(!this.props.opened) moStyles.push(styles.unreadMo)

    return <TouchableOpacity onPress={this.props.onPress}>
      <View style={moStyles}>
      </View>
    </TouchableOpacity>
  }
}

export { MainHome };