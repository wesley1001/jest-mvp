'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

var EventList = require('./EventList');
var EventPool = require('./EventPool');

class EventView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{'My Events'}</Text>
        <EventList navigator={this.props.navigator} />
        <Text style={styles.headerText}>{'Suggested Events'}</Text>
        <EventPool navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    alignItems: 'center',
    fontSize: 30,
    margin: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 70,
  },
  template: {
    flex: 1,
    margin: 10,
  },
});

module.exports = EventView;
