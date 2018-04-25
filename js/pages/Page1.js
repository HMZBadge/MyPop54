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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Page1 extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to page1
        </Text>
        <Button 
            title = "Go Back"
            onPress = {()=>{
              navigation.goBack();
            }}
        />
        <Button 
            title = "Go Back"
            onPress = {()=>{
              navigation.goBack();
            }}
        />
        <Button 
            title = "Go to Page2"
            onPress = {()=>{
              navigation.navigate('Page2'); 
            }}
        />
        <Button
            title="改变主题new"
            onPress={() => {
                navigation.setParams({
                    theme: {
                        tintColor: 'orange',
                        updateTime: new Date().getTime()
                    }
                })
            }}
        />
         <Button 
            title = "改变主题old"  
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
