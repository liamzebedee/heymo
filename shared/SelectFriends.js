// class Item extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     var styles = StyleSheet.create({
//   title: {
//     fontSize: 18
//   },
//   description: {
//     fontSize: 14,
//     color: 'gray'
//   }
// });
//     var { title, description } = this.props;

//     return (
//       <View style={{ paddingTop: 7, paddingLeft: 10 }}>
//         <Text style={styles.title}>{ title }</Text>
//         <Text style={styles.description}>{ description }</Text>
//       </View>
//     );
//   }
// }

// class NewMoIncludeFriends extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       optionSelected: 0,
//       searchText: "",
//       friends: ["Aymeric", "Anna", "Chris"],
//       selectedFriends: new Set()
//     }
//   }

//   onSelect(index) {
//     var selectedFriends = this.state.selectedFriends;
//     if(selectedFriends.has(index)) {
//       selectedFriends.delete(index)
//     } else {
//       selectedFriends.add(index)
//     }
//     this.setState({ selectedFriends })
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
//       <View>
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

//       <ScrollView style={{ flex: 1 }}>
//       <Radio style={{ flex: 1 }} onSelect={this.onSelect.bind(this)} defaultSelect={this.state.optionSelected - 1}>
//         {this.state.friends.map((friend, i) => {
//           return <Option key={i} color="gray" selectedColor="#008BEF">
//             <Item title={friend}/>
//           </Option>;
//         })}
//         </Radio>
//       </ScrollView>
//     </View>
//   }
// }
