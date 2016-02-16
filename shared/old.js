// class NewMoChooseTime extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       sliderValue: 0
//     }
//   }

//   render() {
//     var degrees = 1;
//     var styles = StyleSheet.create({
//       preview: {

//       },
//       sliderContainer: {
//         flex: 1,
//         height: 100,
//         width: 100,
//         paddingLeft: 50
//       },
//       sliderBob: {
//         width: 25,
//         height: 25,
//         borderRadius: 100,
//         borderWidth: 1,
//         backgroundColor: 'black',
//         justifyContent: 'center',
//         alignItems: 'center',
//         transform: [{rotate: "100deg"}]
//       }
//     })

//     const MAX_PERIOD = 10; // days

//     var timePeriod = (this.state.sliderValue * MAX_PERIOD).toFixed(0); 

//     return <View>
//       <Text>remo' in {timePeriod} days</Text>
//       <SliderIOS style={{ borderRadius: 50 }} value={this.state.sliderValue} onValueChange={(value) => this.setState({sliderValue: value})}/>
      
//       <View style={styles.preview}></View>
//     </View>
//   }
// }







// <View>
//         <Text>
//           {[...this.state.selectedFriends].map((index, i) => {
//             var comma;
//             if(i > 0) {
//               comma = <Text>, </Text>;
//             }
//             return <Text>{comma}<Text>{this.state.friends[index]}</Text></Text>;
//           })}
//         </Text>
//       </View>

//       <TextInput style={styles.textInput} onChangeText={(searchText) => this.setState({searchText})} value={this.state.searchText} placeholder="Type it here..." autoCorrect={false} autoCapitalize={true}/>








// import React, {
//   Component,
//   View,
//   StyleSheet,
//   TouchableHighlight,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Text,
// } from 'react-native';
// var Icon = require('react-native-vector-icons/FontAwesome');
// import {Radio, Option} from '../RadioButton';
// import ExpandingTextInput from '../ExpandingTextInput';
// import Fuse from '../lib/fuse'
// var fuzzaldrin = require('fuzzaldrin')
// // import TextSearch from 'fuzzaldrin'

// class Item extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     var styles = StyleSheet.create({
// 	  title: {
// 	    fontSize: 18
// 	  },
// 	  description: {
// 	    fontSize: 14,
// 	    color: 'gray'
// 	  }
// 	});
//     var { title, description } = this.props;

//     return (
//       <View style={{ paddingTop: 7, paddingLeft: 10 }}>
//         <Text style={styles.title}>{ title }</Text>
//         <Text style={styles.description}>{ description }</Text>
//       </View>
//     );
//   }
// }

// class SelectFriends extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       optionSelected: 0,
//       searchText: "",
//       friends: {
//         0: { name: "Aymeric", selected: false },
//         1: { name: "Anna", selected: false },
//         2: { name: "Chris", selected: false },
//       },
//       filteredFriends: []
//     }

//     this.renderFriend = this.renderFriend.bind(this)
//     this.filterFriends = this.filterFriends.bind(this)
//     this._getFriendsAsArray = this._getFriendsAsArray.bind(this)
//   }

//   onSelect(index) {
//     var friend = this.state.filteredFriends[index]
//     var friends = this.state.friends;
//     friends[friend.id].selected = !friends[friend.id].selected;
//     this.setState({ friends })
//   }

//   renderFriend(friend) {
//     if(!friend.selected) return null;
//   	return <View key={friend.id} style={{ flex: 1, marginRight: 10, backgroundColor: 'gray', borderColor: 'black', borderWidth: 1 }}>
//   		<Text>{friend.name}</Text>
//   	</View>
//   }

//   _getFriendsAsArray() {
//     return Object.keys(this.state.friends).map((key) => {
//       return { id: key, ...this.state.friends[key] }
//     })
//   }

//   filterFriends(searchText) {
//     this.setState({ searchText })
//     var results = fuzzaldrin.filter(this._getFriendsAsArray(), searchText, { key: 'name' })
//     this.setState({ filteredFriends: results })
//   }

//   render() {
//     var styles = StyleSheet.create({
//       textInput: {
//         flex: 1,
//         fontSize: 26,
//         height: 26,
//         margin: 10
//       }
//     })

//     return <View>
//     	<View>
//     		<BlockyTextInput items={this._getFriendsAsArray()} renderItem={this.renderFriend} onChangeText={this.filterFriends} text={this.state.searchText}/>
//     	</View>

//       <ScrollView style={{ flex: 1 }}>
//       <Radio style={{ flex: 1 }} onSelect={this.onSelect.bind(this)}>
//         {this.state.filteredFriends.map((friend) => {
//           return <Option key={friend.id} color="gray" selectedColor="#008BEF" selected={friend.selected}>
//             <Item title={friend.name}/>
//           </Option>;
//         })}
//         </Radio>
//       </ScrollView>

//       <TouchableOpacity style={{ backgroundColor: '#363636' }}>
//       	<Text style={{ textAlign: 'center' }}>Throw the mo</Text>
//       </TouchableOpacity>

//     </View>
//   }
// }

// class BlockyTextInput extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			text: ''
// 		}
// 	}

// 	render() {
// 		return <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
// 			<View style={{ margin: 5, flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' }}>
// 				{this.props.items.map((item, i) => {
// 					return this.props.renderItem(item, i)
// 				})}
// 			</View>

// 			<ExpandingTextInput onChangeText={(text) => this.props.onChangeText(text)} value={this.props.text} placeholder="Type it here..." autoCorrect={false} autoCapitalize={'sentences'}/>
// 		</View>;
// 	}
// }

// export { SelectFriends }
