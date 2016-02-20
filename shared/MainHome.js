import React, {
  Component,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
  Navigator,
  StatusBar,
  RefreshControl,
  ScrollView
} from 'react-native';
var GridView = require('react-native-grid-view');
var Icon = require('react-native-vector-icons/FontAwesome');

import {colours, BackButton,showNotification} from './Globals';
import {SingleMoment} from './SingleMoment';
import { getHeymos } from './API';

class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedHeymos: [],
      loading: true
    };

    this._renderItem = this._renderItem.bind(this)
  }

  componentDidMount() {
    var heymos = getHeymos()
    this.setState({ loading: false, receivedHeymos: heymos })
  }

  _renderItem(item) {
    var self = this
    return <Heymo key={item.id} {...item} onPress={self.viewMo.bind(self, item)}/>;
  }

  viewMo(moment) {
    console.log(moment)
    var passProps = moment;
    passProps.momentId = moment.id;

    this.props.toRoute({
      name: "Moment",
      component: SingleMoment,
      rightCorner: View,
      passProps,
    });
  }

  render() {
    var styles = StyleSheet.create({
      centering: {
        flex: 1
      }
    });

    var loadingText;
    if(this.state.loading) loadingText = <Text>Doing important loading things...</Text>;

    var scrollView = <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"/>}/>;

    return <View style={{ flex: 1 }}>
      {loadingText}

      <GridView style={{ paddingTop: 10 }}
          items={this.state.receivedHeymos}
          itemsPerRow={3}
          renderItem={this._renderItem}
          renderScrollComponent={() => scrollView}/>
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
      <View style={moStyles}/>
    </TouchableOpacity>
  }
}

export { MainHome };