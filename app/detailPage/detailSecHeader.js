import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'

export default class DetailSecHeader extends Component {
    constructor(props){
        super(props);
        this.generateStyles();
        this.props.showText = '';
        this.props.height= 50;
    }

    generateStyles(){
        this.styles = {
            headerText:{
                position:'absolute',
                color:'#ffffff',
                bottom:9,
                left:9,
                backgroundColor:'#7ea7ce',
                // width:72,
                fontSize:18,
            }
        }
    }
    render(){
        let viewStyle = {height:this.props.height,backgroundColor:'#f2f1e4',borderBottomWidth:1,borderBottomColor:'#e0dede'};     
        return (
            <View style={viewStyle}>
                <Text style={this.styles.headerText} numberOfLines={1}>{this.props.showText}</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('DetailSecHeader', () => DetailSecHeader);