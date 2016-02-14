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