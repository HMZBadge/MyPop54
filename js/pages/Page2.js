/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';


type Props = {};
export default class Page2 extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Page2
        </Text>
        <Button 
            title = "Go Back"
            onPress = {()=>{
              navigation.goBack();
            }}
        />
        <Button 
            title = "Go to Page1"
            onPress = {()=>{
              navigation.navigate('Page1'); 
            }}
        />
         <Button 
            title = "改变主题"  
            onPress = {()=>{
              navigation.setParams({
                theme: { 
                    tintColor: 'red',
                    updateTime: new Date().getTime()
                  }
              })
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
