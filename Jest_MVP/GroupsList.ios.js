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

var mock_groups = [
  {
    name: 'Alpha',
    members: ['Yuan', 'Matthew', 'Steve'],
  },
  {
    name: 'Beta',
    members: ['foo', 'bar', 'baz'],
  },
  {
    name: 'Theta',
    members: ['Dave', 'Pauletta', 'Singulark'],
  },
];

class GroupsList extends Component {

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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(mock_groups),
    });
  }

  render() {
    return (
      <ListView
        style={styles.groupList}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
  renderRow(group) {
      return(<Group group={group} navigator={this.props.navigator} />);
  }
}

class Group extends Component {

  constructor(props) {
    super(props);
    this.getMemberNames = this.getMemberNames.bind(this);
  }

  render() {
    var group = this.props.group;
    return (
      <TouchableHighlight onPress={this.onGroupPress.bind(this, group)} >
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>
            {group.name}
          </Text>
          <Text>
            {this.getMemberNames()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  getMemberNames() {
    var members = this.props.group.members;
    var names = '';
    for(var i = 0; i < members.length; i++) {
      names += members[i] + (i == members.length - 1 ? '' : ', ');
    }
    return names;
  }

  onGroupPress(group) {
    console.log('Group clicked!');
    this.props.navigator.push({
      title: group.name,
      component: require('./GroupView'),
      passProps: {
        group: group,
      },
    });
  }
}

const styles = StyleSheet.create({
  groupContainer: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'rgb(100, 100, 100)',
    padding: 10,
  },
  groupList: {
    //paddingTop: 20,
  },
  groupName: {
    fontSize: 20,
  },
});

module.exports = GroupsList;
