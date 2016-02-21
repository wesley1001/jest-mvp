/**
TODO for the keyboard make a getStyle() => {paddingBot = ....}, where the
bottom padding changes with the

TODO
All of the chat messages disappear when about > 7 messages. Do some research
to try to figure out what is happening with the list-view
- might have to do with the sketchy renderRow -> true
**/

'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Modal,
  Dimensions,
} from 'react-native';

var FireBase = require('firebase');
var messagesRef = new FireBase('https://intense-inferno-4907.firebaseio.com/messages');
var windowWidth = Dimensions.get('window').width;

// Load the messages with sample data
messagesRef.set({});
messagesRef.push({
  speaker: 'Matt',
  message: 'sample',
});
messagesRef.push(
  {
    speaker: 'Yuan',
    message: 'sample',
  });
messagesRef.push({
  speaker: 'Joe',
  message: 'sample',
});

var GroupView = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  },
  componentDidMount: function() {
    // this.renderRow = this.renderRow.bind(this);
    // this.submitMsg = this.submitMsg.bind(this);
    // this.seeEvents = this.seeEvents.bind(this);

    var chat = this;
    // Load new messages whenever the messages change
    messagesRef.on('value', function(snapshot) {
      var messages = snapshot.val();
      chat.setState({
        dataSource: chat.state.dataSource.cloneWithRows(messages),
      });
    });
  }
  ,
  componentWillUnmount: function() {
    // TODO unregister .on(value) to prevent modifying the state of an unmounted
    // component
  }
  ,
  render: function() {

    return (
      <View style={styles.container}>
        <TextInput
          ref={component => this._textInput = component}
          style={styles.msgInput}
          onSubmitEditing={this.submitMsg}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
        />
        <TouchableHighlight style={styles.eventButton} onPress={this.seeEvents}>
          <View>
            <Text style={styles.eventBtnText}>{'Events'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  ,
  renderRow: function(msg) {
    return(<Message message={msg} />);
  }
  ,
  submitMsg: function (evt) {
    var newMsg = {
      speaker: 'Matthew',
      message: evt.nativeEvent.text,
    }

    // Add the new message to the firebase
    messagesRef.push(newMsg);

    // Clear the input text
    this._textInput.setNativeProps({text: ''});
  }
  ,
  seeEvents: function() {
    //this._eventsList.setState({visible: true});
    this.props.navigator.push({
      title: 'Events',
      component: require('./EventView'),
    });
  },
});

class Message extends Component {
  render() {
    var msg = this.props.message;
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.speakerText}>{msg.speaker}</Text>
        <Text style={styles.msgText}>{msg.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 64,
  },
  eventButton: {
    width: windowWidth,
    backgroundColor: '32CD32',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  eventBtnText: {
    color: 'white',
    fontSize: 20,
  },
  msgInput: {
    height: 30,
    padding: 3,
    backgroundColor: '#87CEFA',
    color: 'black',
    margin: 7,
  },
  messageContainer: {
      margin: 10,
  },
  speakerText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  msgText: {
    fontSize: 15,
  },
});

module.exports = GroupView;
