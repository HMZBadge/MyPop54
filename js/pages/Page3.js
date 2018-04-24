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
  TextInput,
  View
} from 'react-native';


type Props = {};
export default class Page3 extends Component<Props> {
  render() {
    const {navigation} = this.props;
    const {state, setParams}=navigation;
    return (
      <View style={styles.container}> 
        <Text style={styles.welcome}>
          Welcome to Page3
        </Text>
        <Button 
            title = "Go Back"
            onPress = {()=>{
              navigation.goBack();
            }}
        />
        <TextInput 
            style={styles.input}
            onChangeText={(text)=> {
                setParams({title: text});
            }}
        />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    width: 200,
    marginTop: 20, 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
