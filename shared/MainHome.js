import React, {
  Component,
  View,
  StyleSheet,
  ActivityIndicatorIOS,
} from 'react-native';


class MainHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var styles = StyleSheet.create({
      centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      gray: {
        // backgroundColor: '#cccccc',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
    });

    return <View style={{ flex: 1 }}>
      <ActivityIndicatorIOS
          style={[styles.centering, styles.gray, {height: 80}]}
          color="black"
          size="large"
        />
    </View>
  }
}
export { MainHome };