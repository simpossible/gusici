import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'

export default class DetailCell extends Component {

    constructor(props) {
        super(props);
        // this.props.celldata = {};
        this.props.minWidth = 130;//字数相关        
        this.shouldExtend = false;//是否需要展开
        this.props.moudle = '';

        this.moreData = undefined;

        switch (this.props.celldata.nameStr) {

        }
    }

    generateContent() {
        if (!this.shouldExtend) {
            return (<Text style={styles.cont} numberOfLines={3}>{this.props.celldata.cont}</Text>);
        } else {
            if (this.moreData != undefined) {
                return this.generateMoreInfoView();
            }
        }
    }

    generateMoreInfoView() {//生成扩展后的视图 点击下箭头
        return (<View style= {styles.extentCell}>
            <Text style={styles.incellAuthor}><Text style={styles.incellAuthorName}>作者</Text> {this.moreData.author}</Text>
            <Text style={styles.incellName} >{this.moreData.nameStr}</Text>
            <HtmlText>{this.moreData.cont}</HtmlText>
        </View>);
    }

    extendIconClicked() {//下箭头点击后
        this.shouldExtend = !this.shouldExtend;
        if (this.shouldExtend) {
            if (this.moreData == undefined) {
                this.loadDetail();
            } else {
                this.shouldShowMore = true;
            }
        }
        this.setState((a) => { return { ref: true } });
    }

    loadDetail() {//加载 更多的详细信息
        let uri = `${host}${this.props.module}.aspx?id=${this.props.celldata.id}&token=gswapi&random=${Math.random() * 1000}`;
        console.log("the uri is "+ uri);
        fetch(uri, { method: 'GET' }).then((response) => { return response.json()})
            .then((jsonData) => {
                console.log("ths jsonData is"+ JSON.stringify(jsonData))
                this.moreData = jsonData;
                // let cont = this.moreData.cont;
                // let reg = new RegExp("<br />",'g'); //识别换行
                // cont = cont.replace(reg,'\n'); 
                // cont = cont.replace(new RegExp('<.*?>',"g"),''); //过滤所有标签
                // this.moreData.cont = cont;
                this.shouldShowMore = true;
                this.setState((state) => { return { ref: true } });
            });
    }

    render() {
        let icon = this.shouldExtend ? require('../res/arrow_grey_up_small.png') : require('../res/arrow_grey_down_small.png');
        return (<View style={{ borderBottomWidth: 1, borderBottomColor: '#e0dede' }}>
            <Text style={styles.title}>{this.props.celldata.nameStr}</Text>
            {this.generateContent()}
            <TouchableWithoutFeedback onPress={this.extendIconClicked.bind(this)}>
                <Image source={icon} style={styles.extendIcon} />
            </TouchableWithoutFeedback>
        </View>);
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
    extentCell:{
        left:10,
    },
    incellAuthor:{
        fontSize:17,        
        color:'#676767'
    },
    incellAuthorName:{
        color:'#2e2e2e',
        lineHeight:35,
    },
    incellName:{
        color:'#2e2e2e',
        fontSize:20,
        fontWeight:'bold',     
        lineHeight:35,   
    },
    incellCont:{
        fontSize:17,
        color:'#2e2e2e',
        lineHeight:30,
    }

}

const host = 'http://app.gushiwen.org/api/';
const moudles = {
    '赏析': 'shangxi',
    '译文及注释': 'fanyi',
};

AppRegistry.registerComponent('DetailCell', () => DetailCell);