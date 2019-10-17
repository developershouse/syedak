import React from 'react';
import {View} from 'react-native';

export default class Badge extends React.Component {

  render () {
    return (
      <View style={[{
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
      }, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}
