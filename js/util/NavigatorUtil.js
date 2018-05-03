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

    /**
     * 跳转到搜索页面
     */
    static goToSearchPage(params) {
        const {navigation, theme} = params;
        navigation.navigate('SearchPage', {
            navigation: navigation,
            theme: theme
        })
    }

    /**
     * 跳转到菜单详情页
     */
    static goToMenuPage(params, routeName) {
        const {navigation} = params;
        navigation.navigate(routeName, {
            ...params
        })
    }


}