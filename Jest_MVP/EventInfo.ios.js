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
  TextInput,
  Dimensions,
} from 'react-native';

var _ = require('underscore');
var windowWidth = Dimensions.get('window').width;

class EventInfo extends Component {

  constructor(props) {
    super(props);

    console.log('groupEvents null at EventInfo? ' + this.props.groupEvents);
    this.addEvent = this.addEvent.bind(this);
    this.state = {
      // Clone, so that we don't edit the actual event template
      event: _.clone(this.props.event),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText} >{'What?'}</Text>
        <TextInput
          style={styles.input}
          placeholder={
            this.state.event.what ? this.state.event.what : 'Enter where'
          }
          onSubmitEditing={this.updateWhat.bind(this)}
        />
        <Text style={styles.infoText}>{'Where?'}</Text>
        <TextInput
          style={styles.input}
          placeholder={
            this.state.event.where ? this.state.event.where : 'Enter where'
          }
          onSubmitEditing={this.updateWhere.bind(this)}
        />
        <Text style={styles.infoText} >{'When?'}</Text>
        <TextInput
          style={styles.input}
          placeholder={
            this.state.event.when ? this.state.event.when : 'Enter when'
          }
          onSubmitEditing={this.updateWhen.bind(this)}
        />
        <TouchableHighlight onPress={this.addEvent}>
          <View style={styles.addButton}>
            <Text style={{fontSize: 50, color: 'white'}}>{'+'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  addEvent() {
    this.props.groupEvents.push(this.state.event);
    this.props.navigator.pop();
  }

  updateWhat(touchEvt) {
    this.state.event.what = touchEvt.nativeEvent.text;
  }

  updateWhere(touchEvt) {
    this.state.event.where = touchEvt.nativeEvent.text;
  }

  updateWhen(touchEvt) {
    this.state.event.when = touchEvt.nativeEvent.text;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 70,
  },
  infoText: {
    fontSize: 15,
    color: 'gray'
  },
  input: {
    height: 100,
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },
  addButton: {
    width: windowWidth,
    backgroundColor: '32CD32',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 3,
  },
});

module.exports = EventInfo;
