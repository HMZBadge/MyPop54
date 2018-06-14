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
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';


export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.languages = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages: [],
            inVisible: false,
            timeSpan: timeSpan[0],
            theme: this.props.theme
        }
        this.loadLanguate();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //console.debug("这是在哪打印呢....");
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (<View style={styles.container}>

            <Text style={styles.tips}>欢迎~~~~这是发展趋势</Text>
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