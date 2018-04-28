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

export default class FavoritePage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //console.debug("这是在哪打印呢....");
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (<View style={styles.container}>

            <Text style={styles.tips}>欢迎~~~~这是收藏页</Text>
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