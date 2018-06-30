import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Navigator,
    Image,
    DeviceEventEmitter,
    Button,
    ScrollView
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'

export default class CustomKeyPage extends Component {

    static navigationOptions =  ({navigation, screenProps})=> ({
        headerTitle: '自定义Title',
        headerTintColor: '#cfa468',
        headerBackTitle: 'the back',
        headerStyle: {
            backgroundColor: '#3d3d3d'
        },
        headerRight: (
            <Button
                title='保存'
                onPress={() => {
                    
                }}
            />
        )
    })

    constructor(props) {
        super(props);
        
        
        this.state = {
            dataArray: []
        }
        this.changeValues = [];
        this.isRemoveKey = this.props.isRemoveKey ? true : false;
    }

    componentDidMount() {
        this.languateDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }
    

    loadData() {
        this.languateDao.fetch()
                        .then(result => {
                            this.setState({
                                dataArray: result
                            })
                        })
                        .catch(error => {
                            if (error) {
                                console.log(error);
                            }
                        })
    }

    getRightBtn() {
        ViewUtils.getRightButton('爆出');
    }

    renderView() {
        //<Text style={styles.tips}>标签内容: {JSON.stringify(this.state.dataArray)}</Text>
        let len = this.state.dataArray.length
        if (len === 0) {
            return <Text style={styles.tips}>data数据为空</Text>
        }
        let views = [];
        let dataArray = this.state.dataArray;
        
        for (let i = 0; i < len-2; i+=2) {
            views.push(
                <View key={i} >
                    <View style={styles.item} >
                        {this.renderCheckBox(dataArray[i])}
                        {this.renderCheckBox(dataArray[i+1])}
                    </View>
                    <View style={styles.line} />>
                </View>
            )
        }
        views.push(
            <View key={len-1} >
                    <View style={styles.item} >
                        {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                        {this.renderCheckBox(this.state.dataArray[len - 1])}
                    </View>
                    <View style={styles.line} ></View>
            </View>
        )
        return views;
    }

    cbOnClock(data) {

    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = false;
        return (
        <CheckBox
               style={{flex: 1, padding: 10,}}
               onClick={()=> this.cbOnClock(data)} 
               isChecked={isChecked}
               leftText={leftText}
               checkedImage={<Image source={require('./img/ic_check_box.png')}
               style={{width: 22, height: 22}}
               />}
               unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')}
               style={{width: 22, height: 22}} />}
        ></CheckBox>
        );
    }

    render() {
        
        return (<View style={styles.container}>“
            <ScrollView>
                {this.renderView()}
                <Text style={styles.item}>标签内容: {JSON.stringify(this.state.dataArray)}</Text>
            </ScrollView>
        
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
    },
    line: {
        height: 1.0,
        backgroundColor: 'darkgray'
    },
    item: {
        flexDirection: 'row',
    }
})