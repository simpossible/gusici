import React, { Component } from 'react'
import { AppRegistry, ScrollView, Text, View, NavigatorIOS } from 'react-native'

import Component1 from "./app/components/component1/Component1"

import Component2 from "./app/components/Component2/Component2"
import HomeHeader from './app/homepage/header'
import MenuBar from './app/homepage/menubar'
import RecentFreshView from './app/homepage/recentfresh/RecentFreshView'
import DetailPoem from './app/detailPage/detailPoem'
import PoemView from './app/homepage/poem/poemView'

import { AuthorManager } from './app/author/AuthorManager'

export default class myapp extends Component {

    constructor() {
        super();
        let authors = new AuthorManager();
        authors.getAllAuthorPic();
        this.state = {
            bars: [
                {
                    name: "推荐",
                    select: true
                },
                {
                    name: "诗文",
                    select: false
                },
                {
                    name: "名句",
                    select: false
                },
                {
                    name: "典籍",
                    select: false
                },
                {
                    name: "作者",
                    select: false
                },

            ]
        }
    }

    jump(data) {
        this.props.navigator.push({
            component: DetailPoem,
            navigationBarHidden: false,
            barTintColor: '#D1D0A9',
            leftButtonTitle: '首页',
            backButtonTitle: "首页",
            title: `${data.nameStr}`,
            rightButtonIcon: require('./app/res/write.png'),
            leftButtonIcon: require('./app/res/back@2x.png'),
            onLeftButtonPress: () => {
                this.props.navigator.pop();
            },
            passProps: { data: data },
            tintColor: '#505050'
        });
    }

    render() {
        return (
            <View style={{ flex: 1,}}>
                <HomeHeader />
                <MenuBar bars={this.state.bars} />
                <ScrollView horizontal={true} automaticallyAdjustContentInsets={false} pagingEnabled={true}>
                    {/*<RecentFreshView style={{ backgroundColor: 'blue', flex: 1, }} jumpCallBack={this.jump.bind(this)}

                    >
                    </RecentFreshView>*/}

                    <PoemView url='http://app.gushiwen.org/api/upTimeTop11.aspx?n=4173603315&page=1&pwd=&id=0&token=gswapi' jumpCallBack={this.jump.bind(this)}/>

                </ScrollView>
            </View>
        );
    }
}

class main extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: myapp,
                    title: '首页',
                }}
                style={{ flex: 1, height: 0 }} navigationBarHidden={true}
            />
        )
    }
}

AppRegistry.registerComponent('gusici', () => main);