import React, { Component } from 'react';
import {
    ActivityIndicator,
    SwipeableFlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


const CITY_NAMES = ['北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨'];

export default class SwipeableFlatListDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAMES
        }
    }

    loadData(refreshing) {
        if (refreshing) {
            this.setState({
                isLoading: true
            });
        }

        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(CITY_NAMES);
            }

            this.setState({
                dataArray: dataArray,
                isLoading: false,
            })

        }, 2000)

    }

    _renderItem(data) {
        return <View style={styles.item} >
            <Text style={styles.text}>{data.item}</Text>
        </View>
    }

    /// 返回下拉刷新视图, tableFooterView
    genIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                color={'red'}
                animating={true}
            />
            <Text>正在加载更多...</Text>
        </View>
    }

    /// 滑出来的按钮
    genQuickActions() {
        return <View style={styles.quickContainer}>
            <TouchableHighlight
                onPress={() => {
                    alert('确认删除?')
                }}
            >
                <View style={styles.quick}>
                    <Text style={styles.text}>删除</Text>
                </View>
            </TouchableHighlight>
            {/* <TouchableHighlight>
                <View style={styles.quick}>
                    <Text style={styles.text}>保存</Text>
                </View>
            </TouchableHighlight> */}
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <SwipeableFlatList
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            colors={['red']}
                            tintColor={'orange'}
                            titleColor={'red'}
                            refreshing={this.state.isLoading}
                            onRefresh={() => {
                                this.loadData(true);
                            }}
                        />
                    }

                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        this.loadData()
                    }}

                    renderQuickActions={() => this.genQuickActions()}
                    maxSwipeDistance={100}
                    bounceFirstRowOnMount={false}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#169',
        height: 100,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        marginLeft: 15,
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    quickContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 15,
    },
    quick: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 100
    }
});




