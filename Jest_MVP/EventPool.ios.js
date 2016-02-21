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
} from 'react-native';

var FireBase = require('firebase');
var suggestedRef = new FireBase('https://intense-inferno-4907.firebaseio.com/suggestedEvents');

// Init to the suggested events to a sample list
suggestedRef.set([
  {
    what: 'Make Your Own',
    where: '',
    when: '',
  },
  {
    what: 'Dinner',
    where: 'Hill',
    when: '6'
  },
  {
    what: 'Lunch',
    where: 'Chipotle',
    when: '12',
  },
  {
    what: 'Force Awakens',
    where: '',
    when: '9pm Friday'
  }
]);

class EventPool extends Component {

  constructor(props) {
    super(props);

    // Since this is being passed to react component, must be explicity
    // bound to this class
    this.renderRow = this.renderRow.bind(this);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }
  componentDidMount() {
    var myComponent = this;
    suggestedRef.on('value', function(snapshot) {
      myComponent.setState({
        dataSource: myComponent.state.dataSource.cloneWithRows(snapshot.val()),
      });
    });
  }

  render() {
    console.log('Event pool rendering');
    return (
      <ListView
        style={styles.templatesList}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
      />
    );
  }
  renderRow(template) {
      return(<Template
        template={template}
        navigator={this.props.navigator}
        groupEvents={this.props.groupEvents} />);
  }
}

class Template extends Component {

  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
  }

  render() {
    var template = this.props.template;
    return (
      <TouchableHighlight onPress={this.onRowPress} >
        <View style={styles.template}>
          <Text>{'What: ' + template.what}</Text>
          <Text>{'Where: ' + template.where}</Text>
          <Text>{'When: ' + template.when}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  onRowPress(evt) {
    console.log('template pressed');
    this.props.navigator.push({
      title: this.props.template.what,
      component: require('./EventInfo'),
      passProps: {
        event: this.props.template,
        groupEvents: this.props.groupEvents,
      },
    });
  }
}

const styles = StyleSheet.create({
  template: {
    flex: 1,
    margin: 10,
  },
});

module.exports = EventPool;
