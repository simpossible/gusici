import React, { Component } from 'react'
import { AppRegistry,Dimensions,Animated, Button, StyleSheet, ActivityIndicator, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import HTMLView from 'react-native-htmlview';
import DetailInfo from './detailInfo'
export default class DetailInfoView extends Component {

    constructor(props) {
        super(props);
        console.log("props===" + JSON.stringify(this.props.data));
        this.state ={};
        this.state.xOff =new Animated.Value(Dimensions.get('window').width);
    }

    componentDidMount() {
        Animated.timing(this.state.xOff,{toValue:0}).start();   
    }
    genInfoView() {
        let uri = this.props.data.uri;
        console.log("82732======"+JSON.stringify(this.props.data));
        if (uri != undefined) {//需要重新清秋

        } else {
            return <DetailInfo info={this.props.data.info} />
        }
    }

   

    render() {
        let style = Object.assign({},this.props.style);
        style = Object.assign(style,{left:this.state.xOff});
        return <Animated.ScrollView style={style}>
            <Text style={styles.title}>{this.props.data.name}</Text>          
            {this.genInfoView()}
        </Animated.ScrollView>
    }
}

const styles = {
    incellAuthor: {
        fontSize: 17,
        color: '#676767',
        left:10,

    },
    incellAuthorName: {
        color: '#2e2e2e',
        lineHeight: 35,
    },
    title: {
        color: '#245079',
        fontSize: 17,
        left: 10,
        marginTop: 15,
        marginBottom: 6,
    },
}

AppRegistry.registerComponent('DetailInfoView', () => DetailInfoView);