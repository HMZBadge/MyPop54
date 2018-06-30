import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter,
    Button
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from '../Common/NavigationBar';
import HomePageTest from '../pages/HomePageTest';

export default class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //console.debug("这是在哪打印呢....");
        this.timer && clearTimeout(this.timer);
    }

    onClick() {
        let navigation = this.props.navigation;
        navigation.navigate('HomePageTest')
    }

    render() {
        var navigationBar =
            <NavigationBar
                style={this.state.theme.styles.navBar}
                title='我的'/>;
                
        return (<View style={styles.container}>
        {navigationBar}
            <Button
                title='tableList'
                color="#841584"
                onPress={()=> this.onClick()}
            ></Button>

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