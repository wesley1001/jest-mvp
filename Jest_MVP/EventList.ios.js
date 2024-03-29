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
  Modal,
} from 'react-native';

var FireBase = require('firebase');
var eventsRef = new FireBase('https://intense-inferno-4907.firebaseio.com/myEvents/');

// Init the events to a sample list
eventsRef.set([
  {
    what: 'Dinner',
    where: 'Chipotle',
    when: '6pm',
  },
  {
    what: 'Lunch',
    where: 'Hill',
    when: '6pm',
  },
  {
    what: 'Force Awakens',
    where: 'theatre',
    when: '5pm',
  }
]);

class EventList extends Component {

  constructor(props) {
    super(props);

    console.log('Navigator undefined? ' + (this.props.navigator === undefined));
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
    eventsRef.on('value', function(snapshot) {
      myComponent.setState({
        dataSource: myComponent.state.dataSource.cloneWithRows(snapshot.val()),
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
  renderRow(evt) {
      return(<Event event={evt} />);
  }
}

class Event extends Component {
  render() {
    var event = this.props.event;
    return (
      <View style={styles.eventContainer}>
        <Text> {'What: ' + event.what} </Text>
        <Text> {'Where: ' + event.where} </Text>
        <Text> {'When: ' +  event.when} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
});

module.exports = EventList;
