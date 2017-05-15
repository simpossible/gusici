import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView } from 'react-native'

export default class DetailPoem extends Component {
    //data  传入的data detaildata 请求回来的具体数据
    constructor(props) {
        super(props);
        this.getData();
        this.detailData = {};//请求回来的具体数据
        this.generateStyles();

        this.shouldLoadTransLate = false;
        this.shouldLoadNote = false;
    }


    getData() {
        let dataModel = this.props.data;
        let uri = `http://app.gushiwen.org/api/shiwen/view.aspx?id=${dataModel.id}&token=gswapi&random=${Math.random() * 1000}`;
        console.log(`the uri is ${uri}`);
        fetch(uri, { method: 'GET' })
            .then((response) => response.json())
            .then((jsonData) => {
                this.detaildata = jsonData;
                console.log("the json data is " + jsonData.tb_gushiwen.nameStr);
                this.setState((state) => { return { referesh: true } });
            });
    }

    generateStyles() {
        this.styles = {
            mainPage: {//整个页面
                flex: 1,
                flexDirection: 'column',
                backgroundColor: "#f2f1e4",
            },
            title: {

                color: '#000000',
                fontSize: 22,
                height: 57,
                // marginLeft:10,
                // marginBottom:15,
                top: 20,
                left: 15,
            },
            authorContainer: {
                flexDirection: 'row',
                left: 15,
            },
            author: {
                color: '#676767',
                fontSize: 18,
                marginTop: 8,
            },
            author1: {
                color: '#2a5a7a',
                fontSize: 18,
                marginTop: 8,

            },
            dynastyContainer: {
                flexDirection: 'row',
                left: 15,
            },
            dynasty1: {
                color: '#676767',
                fontSize: 18,
                marginTop: 8,

            },
            dynasty2: {
                color: '#676767',
                fontSize: 18,
                marginTop: 8,

            },
            originTitle: {
                color: '#676767',
                fontSize: 18,
                marginTop: 8,
                left: 15,
            },
            orignContainer: {
                color: 'black',
                left: 15,
                backgroundColor: 'red',
                height: 100,
            },
        }
    }



    generateOriginText() {//这里要根据是否显示 翻译 是否现实注释来 决定显示

        if (this.detaildata == undefined) {
            
        } else { 
            return (<View style={this.styles.orignContainer}>
                <Text>{this.detaildata.tb_gushiwen.yizhu} </Text>
            </View>)
        }



    }

    render() {
        console.log("heheheheheh");
        return (
            <ScrollView style={this.styles.mainPage} >

                <Text style={this.styles.title}>{this.props.data.nameStr}</Text>
                <View style={this.styles.dynastyContainer}>
                    <Text style={this.styles.dynasty1}>朝代:</Text>
                    <Text style={this.styles.dynasty2}>{this.props.data.chaodai}</Text>
                </View>
                <View style={this.styles.authorContainer}>
                    <Text style={this.styles.author}>作者:</Text>
                    <Text style={this.styles.author1}>{this.props.data.author}</Text>
                </View>
                <Text style={this.styles.originTitle}>原文:</Text>
                {this.generateOriginText()}

            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('DetailPoem', () => DetailPoem);