import React, { Component } from 'react'
import { AppRegistry, Image, Button, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'

export default class PicButton extends Component {

    constructor(props) {
        super(props);//拥有两张图片和中间的字        this.props.items = [{ icon: icon }, { text: text }];      
        this.canClick = props.canClick == undefined ? true : props.canClick;
        
    }

    enableClick(click) {
        if (click) {

        }
        this.canClick = click
    }

    generateButton() {
        return this.props.items.map((item) => {
            if (item.icon != undefined) {
                return <Image key={item.icon} source={item.icon} style={styles.image} resizeMode='stretch' />
            }
            if (item.text != undefined) {
                return <Text key={item.text} style={styles.text}>{item.text}</Text>
            }
        });
    }

    generateCoverView() {
        let can  = this.props.canClick == undefined ? true : this.props.canClick
        if (!can) {
            return (
                <View style={styles.cover}></View>
            )
        }

    }

    render() {
        console.log("sssssssss ");
        let style = {};
        Object.assign(style, this.props.style);
        Object.assign(style, styles.container);
        if (!this.canClick) {

        }
        return (
            <TouchableHighlight onPress={this.props.canClick?() => {                                                
                    this.props.callBack();                
            }:undefined}>
                <View style={style}>
                    {this.generateButton()}
                    {this.generateCoverView()}
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#676767'
    },
    image: {
        height: 16,
        width: 16,
    },
    cover: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity:0.5,
        backgroundColor: '#e2e2e2'
    }
}


AppRegistry.registerComponent('PicButton', () => PicButton);