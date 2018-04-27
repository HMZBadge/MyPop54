import React from 'react';
import {StackNavigator} from 'react-navigation';

import WelcomePage from '../page/WelcomePage';


export default AppNavigator = StackNavigator({
    WelcomePage: {
        screen: WelcomePage,
    },




    
}, {
    navigationOptions: {
        header: null
    }
})