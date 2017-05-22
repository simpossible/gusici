import React, { Component } from 'react'
import { AppRegistry, Dimensions, Animated, Button, StyleSheet, ActivityIndicator, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import HTMLView from 'react-native-htmlview';
import DetailInfo from './detailInfo'
export default class DetailInfoView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.xOff = new Animated.Value(Dimensions.get('window').width);
    }

    componentDidMount() {
        Animated.timing(this.state.xOff, { toValue: 0 }).start();
    }
 
    back() {
        Animated.timing(this.state.xOff, { toValue: Dimensions.get('window').width ,duration: 800,}).start((value)=>{
            if(this.props.dismissCallBack != undefined){                
                this.props.dismissCallBack();
            }
        });
    }

    genInfoView() {
        let uri = this.props.data.uri;
        if (uri != undefined) {//需要重新清秋
            this.loadInfo(uri, (json) => {
                this.props.data = Object.assign(this.props.data, { info: json });

                this.props.data.uri = undefined;
                this.setState((s) => { return { ref: true } });
            });
        } else {
            return <DetailInfo info={this.props.data.info} main={true} />
        }
    }

    loadInfo(uri, callback) {
        fetch(uri, { method: 'GET' }).then((response) => { return response.json() })
            .then(callback);
    }


    render() {
        let style = Object.assign({}, this.props.style);
        style = Object.assign(style, { left: this.state.xOff });

        return <Animated.ScrollView style={style} >
            <Text style={styles.title}>{this.props.data.name}</Text>
            {this.genInfoView()}
        </Animated.ScrollView>
    }
}

const styles = {
    incellAuthor: {
        fontSize: 17,
        color: '#676767',
        left: 10,

    },
    incellAuthorName: {
        color: '#2e2e2e',
        lineHeight: 35,
    },
    title: {
        color: 'black',
        fontSize: 17,
        left: 10,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 6,
    },
}

AppRegistry.registerComponent('DetailInfoView', () => DetailInfoView);