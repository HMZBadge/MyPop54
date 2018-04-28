import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

export default class MyPage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    componentWillUnmount() {
        
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (<View style={styles.container}>

            <Text style={styles.tips}>欢迎~~~~这是我的页面</Text>
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tips: {
        fontSize: 29,
        fontStyle: 'normal',
    }
})