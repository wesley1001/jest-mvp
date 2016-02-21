/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

var GroupsList = require('./GroupsList');
var GroupView = require('./GroupView');
var globalState = require('./GlobalState');

class Jest_MVP extends Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    console.log('render first');
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute = {
          {
            title: 'Group View',
            component: GroupsList,
          }
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Jest_MVP', () => Jest_MVP);

module.exports = Jest_MVP;
