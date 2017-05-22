import React, { Component } from 'react'
import { AppRegistry, Dimensions, Animated, Button, StyleSheet, ActivityIndicator, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'
import HTMLView from 'react-native-htmlview';
export default class DetailInfo extends Component {

    constructor(props) {
        let cont = props.info.cont;
        cont = cont.replace(new RegExp("</p>\r\n<p>", 'g'), '\n\n');
        props.info.cont = cont;

        super(props);
    }

    getHtmlView() {
        let cont = this.props.info.cont;
        console.log('detailinfo ' + JSON.stringify(this.props.info));
        let a = cont.indexOf('<') >= 0;//是否含有html         
        if (!a) {
            return <Text style={styles.incellCont}>{cont}</Text>
        } else {
            return <HTMLView value={cont} stylesheet={htmlStyles} />
        }
    }

    genRefText() {//生产参考的文字
        let reference = this.props.info.cankao;
        if (reference != undefined && reference != '0') {
            return (<Text style={styles.translateRefTxt}>
                <Text>参考资料:{'\n'}</Text>
                <Text>{reference}</Text>
            </Text>);
        }
    }

    generateJudage() {
        let ok = this.props.info.ok;
        let noOk = this.props.info.noOk;
        return <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.translateRefTxt}>你认为本页内容：</Text>
            <TouchableHighlight onPress={() => { }} underlayColor='red'>
                <Text onPress={() => { console.log("hhhhhhhh") }} style={styles.userfulButton} >{`有用(${ok})`}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { }}>
                <Text onPress={() => { }} style={styles.userfulButton}>{`没用(${noOk})`}</Text>
            </TouchableHighlight>
        </View>
    }
    render() {
        let style = this.props.style == undefined ? {} : this.props.style;
        style = Object.assign(style, { left: 10, backgroundColor: '#f2f1e4' });
        return (
            <View style={style}>
                <Text style={styles.incellAuthor}><Text style={styles.incellAuthorName}>作者:</Text> {this.props.info.author}</Text>
                {
                    this.getHtmlView()
                }
                {
                    this.genRefText()
                }
                {
                    this.generateJudage()
                }
            </View>
        );
    }

}

const styles = {
    incellCont: {
        fontSize: 17,
        color: '#2e2e2e',
        lineHeight: 40,
        paddingRight: 20,
        paddingTop: 6,
        paddingBottom: 6,
    },
    incellAuthor: {
        fontSize: 17,
        color: '#676767'
    },
    incellAuthorName: {
        color: '#2e2e2e',
        lineHeight: 35,
    },
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
AppRegistry.registerComponent('DetailInfo', () => DetailInfo);