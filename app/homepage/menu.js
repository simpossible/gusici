import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'

export default class Menu extends Component {
    constructor() {
        super();
        this.state = {
            select: false,
        }

    }
    static defaultProps = {
        showName: "hehe",
        callback: () => { console.log("default callback => menu clicked") },
        menu: {
            name: 'menu',
            select: false
        }
    }

    onPress() {
        //menu 点击后的回调   先执行 menubar 传入的回调 再更新样式
        this.props.callback();
        this.setState((state) => {
            return { select: !state.select }
        });
    }

    render() {
        let styless = this.props.menu.select ? styles.menuSelcetText : styles.menuText;
        let menuStyle = {};
        Object.assign(menuStyle, styles.menu);
        if (this.props.menu.select == true) {
            Object.assign(menuStyle, { borderBottomWidth: 2 });
            Object.assign(menuStyle, { borderColor: '#bbbbbb' });
        }
        return (

            <View style={menuStyle}>
                <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                    <Text style={styless}>{this.props.menu.name}</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


styles = {
    menu: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
    },
    menuText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#7d7c79',
        height: 40,
        paddingTop: 13,
    },
    menuSelcetText: {
        lineHeight: 14,
        textAlign: 'center',
        color: '#6e6e6e',
        fontWeight: '800',
        height: 40,
        paddingTop: 13,
    }

}
AppRegistry.registerComponent('Menu', () => Menu);