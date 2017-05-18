import React, { Component } from 'react'
import { AppRegistry,Button, StyleSheet, ActivityIndicator, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import HTMLView from 'react-native-htmlview';
export default class DetailCell extends Component {

    constructor(props) {
        super(props);
        // this.props.celldata = {};
        this.props.minWidth = 130;//字数相关        
        this.shouldExtend = false;//是否需要展开
        this.props.moudle = '';

        this.moreData = undefined;
        this.isloading = false;
        switch (this.props.celldata.nameStr) {

        }
    }

    generateContent() {
        if (!this.shouldExtend) {
            return (<Text style={styles.cont} numberOfLines={3}>{this.props.celldata.cont}</Text>);
        } else {
            if (this.moreData != undefined) {                
                return this.generateMoreInfoView();
            } else {                
                if (this.isloading) {                    
                    return (<ActivityIndicator style={styles.activity} color="blue" />);
                }
            }
        }
    }

    generateMoreInfoView() {//生成扩展后的视图 点击下箭头
        // const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;
        //  console.log('========'+JSON.stringify(this.moreData.cont));
        //  let strong = this.moreData.cont;
        //  strong = strong.match(new RegExp("<strong>.*?[\n]</strong>",'g'));
        // console.log('========'+strong);
        // let strongtext = strong.replace(new RegExp('<.*?>','g'),'');
        // let cont = this.moreData.cont.replace(new RegExp('<strong>*.?</strong>',''),'');
        return (<View style={styles.extentCell}>
            <Text style={styles.incellAuthor}><Text style={styles.incellAuthorName}>作者:</Text> {this.moreData.author}</Text>
            {
                this.getHtmlView()
            }
            {
                this.genRefText()
            }
            {
                this.generateJudage()
            }

        </View>);
    }
    getHtmlView() {
        let cont = this.moreData.cont;
        let a = cont.indexOf('<') >= 0;//是否含有html         
        if (!a) {
            return <Text style={styles.incellCont}>{this.moreData.cont}</Text>
        } else {
            return <HTMLView value={this.moreData.cont} stylesheet={htmlStyles} />
        }
    }

    genRefText() {//生产参考的文字
        let reference = this.moreData.cankao;
        return (<Text style={styles.translateRefTxt}>
            <Text>参考资料:{'\n'}</Text>
            <Text>{reference}</Text>
        </Text>);
    }

    generateJudage(){
        let ok = this.moreData.ok;
        let noOk = this.moreData.noOk;
        return <View style={{flexDirection:'row',alignItems:'center',marginBottom:20}}>
            <Text style={styles.translateRefTxt}>你认为本页内容：</Text>
            <TouchableHighlight onPress={()=>{}} underlayColor='red'>
            <Text onPress = {()=>{console.log("hhhhhhhh")}} style={styles.userfulButton} >{`有用(${ok})`}</Text>
            </TouchableHighlight>
             <TouchableHighlight onPress={()=>{}}>
            <Text onPress = {()=>{}} style={styles.userfulButton}>{`没用(${noOk})`}</Text>
            </TouchableHighlight>            
        </View>
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
        console.log("the uri is " + uri);
        fetch(uri, { method: 'GET' }).then((response) => { return response.json() })
            .then((jsonData) => {
                console.log("   " + JSON.stringify(jsonData))
                this.moreData = jsonData;
                let cont = this.moreData.cont;
                cont = cont.replace(new RegExp("</p>\r\n<p>", 'g'), '\n\n');
                this.moreData.cont = cont;
                // let reg = new RegExp("<br />",'g'); //识别换行
                // cont = cont.replace(reg,'\n'); 
                // cont = cont.replace(new RegExp('<.*?>',"g"),''); //过滤所有标签
                // this.moreData.cont = cont;
                this.isloading = false;
                this.shouldShowMore = true;
                this.setState((state) => { return { ref: true } });
            });
        // this.setState((state) => { return { ref: true } });
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
    userfulButton:{        
        borderWidth:0.5,
        alignSelf: 'center',        
        color:'#676767',
        marginLeft:6,
        paddingTop:6,
        paddingBottom:6,
        paddingRight:6,
        paddingLeft:6,
    }
}

const htmlStyles = StyleSheet.create({
    p: {
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
const moudles = {
    '赏析': 'shangxi',
    '译文及注释': 'fanyi',
};

AppRegistry.registerComponent('DetailCell', () => DetailCell);