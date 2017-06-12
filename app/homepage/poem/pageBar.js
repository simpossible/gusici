import React, { Component } from 'react'
import { AppRegistry, Button, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'

import PicButton from './picButton'

export default class PageBar extends Component {
    constructor(props) {
        super(props);
    }

    generateLeftItems() {
        let icon = require('../../res/link_left.png');
        let items = [{ icon: icon }, { text: '上一页' }];
        let canclick = this.props.currentPage > 1 ? true : false;
        return <PicButton ref='left' style={styles.leftItem} items={items} touchAble={true} callBack={this.leftItemClicked.bind(this)} canClick={canclick} />
    }

    leftItemClicked() {
        this.props.callBack(--this.props.currentPage);
    }

    generateRightItems() {
        let icon = require('../../res/link_right.png');
        let items = [{ text: '下一页' }, { icon: icon },];
        let canclick = this.props.currentPage < this.props.allPage ? true : false;
        console.log("the right is canclick" + canclick);
        return <PicButton ref='right' style={styles.rightItem} items={items} touchAble={true} callBack={this.rightItemClicked.bind(this)} canClick={canclick} />
    }

    rightItemClicked() {
        this.props.callBack(++this.props.currentPage);
    }

    genterateCenterItem() {
        let items = [{ text: `第${this.props.currentPage}/${this.props.allPage}页` }];
        let canclick = this.props.allPage - this.props.currentPage > 0 ? true : false;
        return <PicButton ref='center' style={styles.center} items={items} touchAble={true} callBack={this.rightItemClicked.bind(this)} canClick={true} />
    }

    render() {
        let style = {};
        Object.assign(style, this.props.style);
        Object.assign(style, styles.bar);
        return <View style={style}>
            {this.generateLeftItems()}
            {this.genterateCenterItem()}
            {this.generateRightItems()}
        </View>
    }


}

const styles = {
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pageNumber: {

    },
    jump: {

    },
    leftItem: {
        left: 14
    },
    center: {

    },
    rightItem: {
        right: 14,
    }
}

AppRegistry.registerComponent('PageBar', () => PageBar);