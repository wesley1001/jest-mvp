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

var serverURL = 'http://127.0.0.1:8082/';
var windowWidth = Dimensions.get('window').width;

class GroupView extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.submitMsg = this.submitMsg.bind(this);
    this.seeEvents = this.seeEvents.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: () => true,
      }),
    };
  }
  componentDidMount() {
    this.getMessages();
  }

  render() {

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

  renderRow(msg) {
    return(<Message message={msg} />);
  }

  getMessages() {

    // Get the messages from the server
    fetch(serverURL + 'getmessages')
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json),
        });
      })
      .catch(error => console.log('getMessages failed'));
  }

  submitMsg(evt) {
    var newMsg = {
      speaker: 'Matthew',
      message: evt.nativeEvent.text,
    }

    fetch(serverURL + 'addmsg', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: newMsg,
      })
    });
    //  .then(response => console.log())
    // .then(json => {
    //   console.log(JSON.stringify(json));
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(json),
    //   });
    // })
    // .catch(error => console.log('getMessages failed'));

    // Clear the input text
    this._textInput.setNativeProps({text: ''});
  }

  seeEvents() {
    //this._eventsList.setState({visible: true});
    this.props.navigator.push({
      title: 'Events',
      component: require('./EventView'),
    });
  }
}

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
