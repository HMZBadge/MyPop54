import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default class RepositoryCell extends Comment {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: RepositoryCell.getIcon(this.props.projectModel.isFavorite),
        };
    }

    static getIcon(isFavorite) {
        return isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png');
    }

    render() {
        let item = this.props.projectModel.item ? this.props.projectModel.item : this.props.projectModel;
        // let favoriteButton = this.props.projectModel.item ?
        //     <TouchableOpacity
        //         style={{ padding: 6 }}
        //         onPress={() => this.onPressFavorite()}
        //         underlayColor='transparent'>
        //         <Image 
        //             style={{padding: 6}}
        //             // onPress=
        //             // />


        //     </TouchableOpacity> : null;

        return nil;
     }
}