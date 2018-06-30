import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter,
    Button,
    TouchableHighlight
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import CustomKeyPage from './CustomKeyPage';
import NavigationBar from '../../Common/NavigationBar';

export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            customThemeViewVisible:false,
            theme:this.props.theme
        }
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
        
        this.timer && clearTimeout(this.timer);
    }

    onPressLearnMore(e) {
        
        this.props.navigation.navigate('CustomKeyPage');
        // navigator.push({
        //     componment: CustomKeyPage,
        //     params: {...this.params}
        // });
        // this.props.navigator.push({
        //     component: TargetComponent,
        //     params: params,
        // });
        // navigation.navigate('CustomKeyPage', {
        //     navigation: navigation,
        //     theme: theme
        // });
        // this.props.Navigator.push({
        //     componment: CustomKeyPage,
        //     param: {...this.props}
        // })
    }
    onClick() {
        this.props.navigation.push({
            component: CustomKeyPage,
            params: {...this.props},
        });
    }
    render() {
        
        var navigationBar =
            <NavigationBar
                style={this.state.theme.styles.navBar}
                title='我的'/>;
        return (
            
        <View style={styles.container}>
            {navigationBar}
            <TouchableHighlight
                onPress={()=>this.onClick()}
            >
                <Text style={styles.tips}>欢迎~~~~这是我的页面</Text>
            </TouchableHighlight>
            
           <Button
                onPress={(e) => this.onPressLearnMore(e)}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    tips: {
        fontSize: 29,
        fontStyle: 'normal',
    }
})