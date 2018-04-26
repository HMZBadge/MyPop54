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
    View,
    Button
} from 'react-native';

type Props = {};
export default class AppTableView extends Component<Props> {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Button
                    title={"FlatListDemo"}
                    onPress={() => {
                        navigation.navigate("FlatListDemo")
                    }}
                />
                <Button
                    title={"SwipeableFaltListDemo"}
                    onPress={() => {
                        navigation.navigate("SwipeableFlatListDemo")
                    }}
                />
                <Button
                    title={"SectionListDemo"}
                    onPress={() => {
                        navigation.navigate("SectionListDemo")
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
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
