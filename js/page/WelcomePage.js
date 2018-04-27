import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import ThemeDao from '../expand/dao/ThemeDao';
import { SplashScreen } from "react-native-splash-screen";
import NavigatorUtil from '../util/NavigatorUtil';

export default class WelcomePage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        new ThemeDao().getTheme().then((data) => {
            this.theme = data;
        })
        this.timer = setTimeout(() => {
            SplashScreen.hide();
            NavigatorUtil.resetToHomePage({
                theme: this.theme,
                navigation: this.props.navigation
            })
        }, 500);
    }

    componentWillUnmount() {
        console.debug("这是在哪打印呢....");
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (<View style={styles.container}>

            <Text style={styles.tips}>欢迎~~~~这是欢迎页</Text>
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