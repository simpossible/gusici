import React, { Component } from 'react'
import { AppRegistry, Button, StyleSheet, ActivityIndicator, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import HTMLView from 'react-native-htmlview';
import DetailInfo from './detailInfo'
export default class DetailCell extends Component {

    constructor(props) {
        super(props);
        // this.props.celldata = {};
        this.props.minWidth = 130;//字数相关        
        this.shouldExtend = false;//是否需要展开
        this.props.moudle = '';

        this.moreData = undefined;
        this.callBack;
        this.isloading = false;
        switch (this.props.celldata.nameStr) {

        }
    }

    generateContent() {
        if (!this.shouldExtend) {
            return (<Text style={styles.cont} numberOfLines={3}>{this.props.celldata.cont}</Text>);
        } else {
            if (this.moreData != undefined) {
                console.log("_______"+JSON.stringify(this.moreData));
                return <DetailInfo info ={this.moreData}/>                
            } else {
                if (this.isloading) {
                    return (<ActivityIndicator style={styles.activity} color="blue" />);
                }
            }
        }
    }


    extendIconClicked() {//下箭头点击后
        this.shouldExtend = !this.shouldExtend;
        if (this.shouldExtend) {
            if (this.moreData == undefined) {
                this.loadDetail();
            } else {
                this.shouldExtend = true;
            }
        }
        this.setState((a) => { return { ref: true } });
    }

    loadDetail() {//加载 更多的详细信息
        this.isloading = true;
        let uri = `${host}${this.props.module}.aspx?id=${this.props.celldata.id}&token=gswapi&random=${Math.random() * 1000}`;        
        fetch(uri, { method: 'GET' }).then((response) => { return response.json() })
            .then((jsonData) => {
                console.log("   " + JSON.stringify(jsonData))
                this.moreData = jsonData;
                let cont = this.moreData.cont;
                cont = cont.replace(new RegExp("</p>\r\n<p>", 'g'), '\n\n');

                // let reg = new RegExp("<br />",'g'); //识别换行
                // cont = cont.replace(reg,'\n'); 

                this.moreData.cont = cont;
                // cont = cont.replace(new RegExp('<.*?>',"g"),''); //过滤所有标签
                // this.moreData.cont = cont;
                this.isloading = false;
                this.shouldShowMore = true;
                this.setState((state) => { return { ref: true } });
            });
        // this.setState((state) => { return { ref: true } });
    }

    cellClicked() {//cell 的背景被点击后 这里应该生成info 视图  并且动画进入
        console.log("detail cell clicked"+ JSON.stringify(this.props));
        let callBack = this.props.callback.method;
        if (callBack != undefined) {
            if (this.moreData != undefined) {
                callBack({info: this.moreData, name: this.props.celldata.nameStr});
            } else {
                let uri = `${host}${this.props.module}.aspx?id=${this.props.celldata.id}&token=gswapi&random=${Math.random() * 1000}`;
                callBack({ uri: uri, name: this.props.celldata.nameStr });
            }
        }
    }
 

    render() {
        let icon = this.shouldExtend ? require('../res/arrow_grey_up_small.png') : require('../res/arrow_grey_down_small.png');
        return (
            <TouchableHighlight onPress={this.cellClicked.bind(this)} underlayColor='#d1cfad'>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#e0dede' }}>
                    <Text style={styles.title}>{this.props.celldata.nameStr}</Text>
                    {this.generateContent()}
                    <TouchableWithoutFeedback onPress={this.extendIconClicked.bind(this)}>
                        <Image source={icon} style={styles.extendIcon} />
                    </TouchableWithoutFeedback>
                </View>
            </TouchableHighlight>);
    }


}
const styles = {
    title: {
        color: '#245079',
        fontSize: 17,
        left: 10,
        marginTop: 15,
        marginBottom: 6,
    },
    cont: {
        color: 'black',
        fontSize: 17,
        left: 10,
        lineHeight: 28,
        paddingRight: 30,

    },
    extendIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    extentCell: {
        left: 10,
        paddingRight: 25,
    },
    incellAuthor: {
        fontSize: 17,
        color: '#676767'
    },
    incellAuthorName: {
        color: '#2e2e2e',
        lineHeight: 35,
    },
    incellName: {
        color: '#2e2e2e',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 35,
    },
    incellCont: {
        fontSize: 17,
        color: '#2e2e2e',
        lineHeight: 40,
        paddingRight: 20,
        paddingTop: 6,
        paddingBottom: 6,
    },
    activity: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 100,
    }, translateRefTxt: {//原文译注参考 的样式
        fontSize: 14,
        // left: 10,
        color: "#676767",
        lineHeight: 20
    },
    userfulButton: {
        borderWidth: 0.5,
        alignSelf: 'center',
        color: '#676767',
        marginLeft: 6,
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 6,
        paddingLeft: 6,
    }
}

const htmlStyles = StyleSheet.create({
    p: {
        fontSize: 17,
        color: '#2e2e2e',
        lineHeight: 30,
    },
    br: {
        fontSize: 17,
        color: '#2e2e2e',
        lineHeight: 30,
    },
    strong: {
        fontSize: 17,
        lineHeight: 30,
    }
});

const host = 'http://app.gushiwen.org/api/';

AppRegistry.registerComponent('DetailCell', () => DetailCell);