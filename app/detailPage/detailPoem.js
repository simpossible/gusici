import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'

import DetailSecHeader from './detailSecHeader'
import DetailCell from './detailCell'
import IconBarView from './iconBarView'
import DetailInfoView from './detailInfoView'

export default class DetailPoem extends Component {
    //data  传入的data detaildata 请求回来的具体数据
    constructor(props) {
        super(props);

        this.detailData = {};//请求回来的具体数据
        this.generateStyles();
        this.yizhuCankao = 'a';//在原文中显示的译注参考
        this.shouldLoadTransLate = false;
        this.shouldLoadNote = false;

        this.orginTexts = [];
        this.yiTexts = [];
        this.zhuTexts = [];
        this.sectionItems = [];
        this.modules = [];
        this.getData();
        this.showItemView = false;//当前显示的是否是 二级的详细信息

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (r1, r2) => r1 !== r2 });
        this.listDataSource = this.ds.cloneWithRowsAndSections([["a"], ["b", ["c"]]]);
    }


    getData() { //获取数据data
        let dataModel = this.props.data;
        let uri = `http://app.gushiwen.org/api/shiwen/view.aspx?id=${dataModel.id}&token=gswapi&random=${Math.random() * 1000}`;
        console.log(`the uri is ${uri}`);
        fetch(uri, { method: 'GET' })
            .then((response) => { return response.json() })
            .then((jsonData) => {
                this.detaildata = jsonData;

                this.yizhuCankao = jsonData.tb_gushiwen.yizhuCankao;//获取译注参考的值

                let yizhu = this.detaildata.tb_gushiwen.yizhu;//获取译注的值 并解析

                let preg = new RegExp("<p>(.*?)<\/p>", "g"); // 过滤每一个p 标签的内容
                let allp = yizhu.match(preg);//这里得到了每一句的

                allp.forEach(function (element) {
                    this.dealSingleLine(element);
                }, this);

                //解析翻译                
                let data = [];
                let sectionItems = [];
                let module = [];
                let translate = jsonData.tb_fanyis.fanyis;
                if (translate != undefined) {
                    data.push(translate);
                    sectionItems.push("参考翻译");
                    module.push('shiwen/fanyi');
                }

                // 解析赏析
                let analy = jsonData.tb_shangxis.shangxis;
                if (analy != undefined) {
                    data.push(analy);
                    sectionItems.push("参考赏析");
                    module.push('shiwen/shangxi');
                }

                //作者介绍
                let authorIntro = jsonData.tb_author;
                if (authorIntro != undefined) {
                    data.push([authorIntro]);
                    sectionItems.push("作者介绍");
                    module.push('author/author');
                }
                this.modules = module;

                this.sectionItems = sectionItems;
                this.listDataSource = this.ds.cloneWithRowsAndSections(data);


                this.detaildata.tb_gushiwen.yizhu = yizhu;
                this.setState((state) => { return { referesh: true } });

            });
    }

    dealSingleLine(item) {//处理每一句<p>xxx</p>

        let brReg = new RegExp("<br \/>", "g");
        let allSingleItems = item.split(brReg);
        allSingleItems.forEach((singleItem, i) => {

            if (i == 0) {
                let showText = singleItem.replace(new RegExp("<.*?>"), "");
                this.orginTexts.push({ text: showText, color: 'black' });
            } else if (i == 1) {
                let colorReg = new RegExp("color:(#[0-9a-z]{6})", "g");
                let tag = singleItem.match(colorReg);
                let color = tag[0].match(new RegExp('#[a-z0-9]{6}', 'g'));
                let showText = singleItem.replace(new RegExp("<.*?>", "g"), "");
                this.yiTexts.push({
                    color: color,
                    text: showText,
                });

            } else if (i == 2) {
                let colorReg = new RegExp("color:(#[0-9a-z]{6})", "g");
                let tag = singleItem.match(colorReg);
                let color = tag[0].match(new RegExp('#[a-z0-9]{6}', 'g'));
                let ashowText = singleItem.replace(new RegExp("<.*?>", 'g'), "");
                this.zhuTexts.push({
                    color: color,
                    text: ashowText,
                });

            }

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
                alignItems: 'center'
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

            },
            dynasty2: {
                color: '#676767',
                fontSize: 18,

            },
            originTitle: {
                color: '#676767',
                fontSize: 18,
                marginTop: 8,
                left: 15,
            },
            orignContainer: {
                flex: 1,
                color: 'black',
                left: 15,
                // backgroundColor: 'red',
                paddingRight: 20,
                // height: 100,
                marginBottom: 30
            },
            originText: {
                left: 15,
                paddingRight: 20,
                fontSize: 19,
                paddingTop: 10,
                // paddingBottom: 15,
                lineHeight: 30,

            },
            transText: {
                lineHeight: 30
                // paddingTop:15,
            },
            tansIcon: {
                position: 'absolute',
                right: 60,
                top: 54,
                width: 30,
                height: 30,

            },
            noteIcon: {
                position: 'absolute',
                right: 15,
                top: 54,
                width: 30,
                height: 30,
            },
            translateRefTxt: {//原文译注参考 的样式
                fontSize: 14,
                left: 15,
                color: "#676767",
                lineHeight: 20
            },
            infoStyle:{
                position:'absolute',
                backgroundColor:'#f2f1e4',
                top:64,
                left:0,
                bottom:40,
                right:0,                
            }
        }
    }



    generateOriginText() {//这里要根据是否显示 翻译 是否现实注释来 决定显示

        if (this.detaildata == undefined) {

        } else {
            return this.orginTexts.map((item, i) => {
                return (<Text key={`item${i}`} style={this.styles.originText}>{item.text}{this.genarateTranslateAndNote(i)}</Text>);
            });
        }
    }

    genarateTranslateAndNote(index) { //根据是否需要 显示 翻译 以及备注 生成对应的 jsx 标签
        let arr = [];

        if (this.shouldLoadTransLate) {
            let trans = this.yiTexts[index];
            if (trans != undefined)
                arr.push(trans);
        }
        if (this.shouldLoadNote) {
            let note = this.zhuTexts[index];
            if (note != undefined)
                arr.push(note);
        }
        return arr.map((showItem, i) => {
            let style = {};
            Object.assign(style, this.styles.transText);
            Object.assign(style, { color: showItem.color });
            return (<Text key={showItem.text} style={style}>{'\n'}{showItem.text}</Text>);
        });

    }

    tranlateIconClicked() {//译 图片点击的回调
        this.shouldLoadTransLate = !this.shouldLoadTransLate;
        this.setState((a) => { return { ref: true } });
    }

    noteIconClicked() {// 注 图片点击的回调
        this.shouldLoadNote = !this.shouldLoadNote;
        this.setState((a) => { return { ref: true } });
    }

    showReferenceInOrigin() {        //这里生成译注参考 在原文的后面
        if (this.shouldLoadNote == true || this.shouldLoadTransLate == true) {
            if (this.yizhuCankao != undefined) {
                return (<Text style={this.styles.translateRefTxt}>{"参考资料:"}{'\n'}{'1、'}{this.yizhuCankao}}</Text>);
            }
        } else {
            return;
        }
    }

    generateIconBars() {//那个不是tabbar 的tab bar
        let backIcon = {
            icon: require('../res/back@2x.png'), callback: () => {

            }
        }

        let startIcon = {
            icon: require('../res/rating.png'), callback: () => {
                console.log('xixixixixi');
            }
        }
        let heartIcon = {
            icon: require('../res/star.png'), callback: () => {
                console.log('xixixixixi');
            }
        }
        let items;
        if (this.showItemView) {
            items = [startIcon, heartIcon];
        } else {
            item = [backIcon]
        }


        return <IconBarView icons={items} height={40} />

    }

    jumpToDetailInfo(data) {//动画进入info 的视图
        console.log('the data is ' + JSON.stringify(data));
        this.showItemView = true;
        this.setState((state) => { return { jumpData:data } });
    }

    generateInfoView() {
        if (this.showItemView) {            
            return <DetailInfoView data={this.state.jumpData} style={this.styles.infoStyle}/>
        }
    }

    render() {
        let tranicon = this.shouldLoadTransLate ? require("../res/yipic2.png") : require("../res/yipic.png");
        let notIcon = this.shouldLoadNote ? require("../res/zhupic2.png") : require("../res/zhupic.png");
        return (
            <View style={this.styles.mainPage} >
                <ListView dataSource={this.listDataSource}
                    renderRow={(data, sectionID, rowID, highlightRow) => {
                        return <DetailCell celldata={data} module={this.modules[sectionID]} callback={{ method: this.jumpToDetailInfo.bind(this) }} />
                    }}
                    renderSectionHeader={(sectionData, sectionID) => {
                        return (<DetailSecHeader showText={this.sectionItems[sectionID]} height={50} />)
                    }}
                    renderHeader={() => {
                        return (
                            <View>
                                <Text style={this.styles.title}>{this.props.data.nameStr}</Text>
                                <View style={this.styles.dynastyContainer}>
                                    <Text style={this.styles.dynasty1}>朝代: </Text>
                                    <Text style={this.styles.dynasty2}>{this.props.data.chaodai}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={this.tranlateIconClicked.bind(this)}>
                                    <Image source={tranicon} style={this.styles.tansIcon} />
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={this.noteIconClicked.bind(this)}>
                                    <Image source={notIcon} style={this.styles.noteIcon} onPress={this.noteIconClicked} />
                                </TouchableWithoutFeedback>
                                <View style={this.styles.authorContainer}>
                                    <Text style={this.styles.author}>作者: </Text>
                                    <Text style={this.styles.author1}>{this.props.data.author}</Text>
                                </View>
                                <Text style={this.styles.originTitle}>原文: </Text>
                                {this.generateOriginText()}
                                {this.showReferenceInOrigin()}
                            </View>
                        );
                    }}

                    automaticallyAdjustContentInsets={true}
                >

                </ListView>
                {this.generateIconBars()}
                {this.generateInfoView()}
            </View >
        );
    }
}

AppRegistry.registerComponent('DetailPoem', () => DetailPoem);