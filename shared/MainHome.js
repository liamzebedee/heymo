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
var ScrollableTabView = require('react-native-scrollable-tab-view');

import {colours, BackButton,showNotification, NewMoButton} from './Globals';
import {SingleMoment} from './SingleMoment';
import { getHeymos } from './API';
import {MomentsStore} from './redux/reducers'
import {loadMoments} from './redux/actions';




const mapStateToProps = (state) => {
  return {
    receivedHeymos: state.all,
    loading: state.loading
  }
}




class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedHeymos: [],
      loading:        MomentsStore.getState().loading,
    };

    this._renderItem = this._renderItem.bind(this);
    this.loadHeymos = this.loadHeymos.bind(this);
  }

  componentDidMount() {
    MomentsStore.subscribe( () => this.setState(mapStateToProps(MomentsStore.getState())) )
    this.loadHeymos()
  }

  loadHeymos() {
    var self = this;

    this.setState({ loading: true });
    var lastDate = new Date(MomentsStore.getState().all[0].dateReveal);
    console.log(lastDate);
    MomentsStore.dispatch(loadMoments())
  }

  _renderItem(item) {
    var self = this
    return <Heymo key={item.id} {...item} onPress={self.viewMo.bind(self, item)}/>;
  }

  viewMo(moment) {
    var passProps = { moment: moment };

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

    var scrollView = <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.loadHeymos}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"/>}/>;

    return <View style={{ flex: 1 }}>
      
      <ScrollableTabView style={{ flex: 1 }}>
        <View tabLabel='Inbox' style={{ flex: 1 }}>
          <GridView
            style={{ marginTop: 10 }}
            items={this.state.receivedHeymos}
            itemsPerRow={3}
            renderItem={this._renderItem}
            renderScrollComponent={() => scrollView}/>
        </View>

        <View tabLabel='Collections' style={{ flex: 1 }}>
        </View>
      </ScrollableTabView>
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
        // backgroundColor: colours.pink,
        // borderWidth: 2,
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