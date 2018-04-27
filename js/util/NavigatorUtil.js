import { NavigationActions } from 'react-navigation';

export default class NavigatorUtil {
    /**
     * 返回上一页
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 跳转首页
     */
    static resetToHomePage(params) {
        const { navigation, theme, selectedTab} = params;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "HomePage",
                    params: {
                        theme: theme,
                        selectedTab: selectedTab
                    }
                })
            ]
        });
        navigation.dispatch(resetAction);
    }



}