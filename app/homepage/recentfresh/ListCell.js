import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, Image } from 'react-native'

import {AuthorManager} from '../../author/AuthorManager'
export default class ListCell extends Component {
    static defaultProps = {
        showModel: {
            showName: "namenamenamenamenamenamenamenamenamenamenamenamenamenamenamename",
            des: "heh",
            content: "content",
            icon: "http://img.gushiwen.org/authorImg/libai.jpg",
        },
        callback: () => { },
        data: {},//这个data 是存原始数据的       
    }

    constructor(props) {
        super(props);
        this.showNameCallBack = () => { };//第一行的单机回调
        this.callback = () => { };//整体的回调         
        let authorManager = new AuthorManager();
        authorManager.getPicUriByName(this.props.showModel.author,(uri)=>{            
            let url = `http://img.gushiwen.org/authorImg/${uri}.jpg`;
            this.props.showModel.icon = url;
            this.setState((data)=>{return {ref:true}});
        });
        
    }

    render() {
        let imageStyle = {};
        Object.assign(imageStyle, styles.imageStyle);
        if (this.props.showModel.icon == null || this.props.showModel.icon == undefined || this.props.showModel.icon == '') {
            imageStyle.width = 0;
            imageStyle.flex = 0;
        }
        return (
            <TouchableHighlight onPress={() => { this.props.callback(this.props.data) }} underlayColor='#d1cfad' activeOpacity={0.7}>
                <View style={styles.containerStyle}>
                    <Image source={{ uri: this.props.showModel.icon }} style={imageStyle}></Image>
                    <View style={styles.contentStyle}>
                        <Text style={styles.showNameStyle} numberOfLines={1} >{this.props.showModel.showName}</Text>
                        <Text style={styles.desStyle} numberOfLines={1}>{this.props.showModel.des}</Text>
                        <Text style={styles.contStyle} numberOfLines={2}>{this.props.showModel.content}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = {
    containerStyle: {
        flexDirection: 'row',
        height: 134,
        backgroundColor: "#f2f1e4",
        borderBottomWidth: 1,
        borderColor: '#e0dede',
    },
    imageStyle: {
        flex: 1,
        width: 70,
        height: 100,
        marginTop: 17,
        marginLeft: 5,
    },
    contentStyle: {
        flex: 3,
        flexDirection: 'column',
        marginTop: 17,
        marginLeft: 5,
        marginBottom: 17,
        paddingRight: 15,
    },
    showNameStyle: {
        color: '#2a527a',
        fontSize: 17,
        marginBottom: 5,

    },
    desStyle: {
        fontSize: 15,
        color: '#676767',
        marginBottom: 5,
        marginTop: 5,
    },
    contStyle: {
        marginBottom: 1,
        color: '#616161',
        fontSize: 16,
        marginTop: 5,
    }
}
AppRegistry.registerComponent('ListCell', () => ListCell);