var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
  Component,
  View,
  TouchableWithoutFeedback
} = React;

var window = Dimensions.get('window');

var styles = StyleSheet.create({
  outerCircle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2 / window.scale,
    borderRadius: 10,
    backgroundColor: 'transparent'
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8
  }
});

class Circle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { color, isSelected, selectedColor } = this.props;

    let innerCircle;
    let appliedColor;

    if (isSelected) {
      appliedColor = selectedColor;
      innerCircle = <View style={[styles.innerCircle, { backgroundColor: appliedColor }]}/>;
    } else {
      appliedColor = color;
      innerCircle = null;
    }

    return (
      <View style={{ padding: 10 }}>
        <View style={[styles.outerCircle, { borderColor: appliedColor }]}>
          {innerCircle}
        </View>
      </View>
    );
  }
}

Circle.propTypes = {
  color: React.PropTypes.string,
  selectedColor: React.PropTypes.string,
  isSelected: React.PropTypes.bool
};

Circle.defaultProps = {
  isSelected: false
};

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	selectedItems: new Set()
    }
  }

  _onSelect(index) {
  	var self = this
    var selectedItems = this.state.selectedItems
    if(selectedItems.has(index)) {
    	selectedItems.delete(index)
    } else {
    	selectedItems.add(index)
    }
    this.setState({ selectedItems })
    this.props.onSelect(index);
  }

  render() {
    var children = React.Children.map(this.props.children, (child, index) => {
      if (child.type === Option) {
        return React.cloneElement(child, {
          onPress: () => this._onSelect(index),
          isSelected: this.state.selectedItems.has(index)
        });
      }

      return child;
    });

    return (
      <View>
        {children}
      </View>
    );
  }
}

Radio.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  defaultSelect: React.PropTypes.number
};

Radio.defaultProps = {
  defaultSelect: -1
};

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { onPress, isSelected, color, selectedColor, children } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Circle color={color} selectedColor={selectedColor} isSelected={isSelected}/>
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Option.propTypes = {
  onPress: React.PropTypes.func,
  isSelected: React.PropTypes.bool,
  color: React.PropTypes.string,
  selectedColor: React.PropTypes.string
};

Radio.Option = Option;
module.exports = Radio;