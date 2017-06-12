import React, { Component } from 'react'
import { AppRegistry, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'
import ListCell from '../recentfresh/ListCell'

import { AuthorManager } from '../../author/AuthorManager'
import RecentFreshView from '../recentfresh/RecentFreshView'

import ConditionView from './conditionView'
import PageBar from './pageBar'

export default class PoemView extends Component {

    constructor(props) {
        super(props);
        var myDate = new Date();
        let time = myDate.toLocaleDateString();
        this.currentpage = 1;
        // Object.assign(this,{url:"http://app.gushiwen.org/api/shiwen/type.aspx?page=1&id=0&token=gswapi&c=%E9%AD%8F%E6%99%8B&p=1&x=&t"});

        this.pageTitle = '';
        this.shouldLoad = true;

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSrouce = ds.cloneWithRows([

        ]);

        this.types = ['不限', '写景', '咏物', '春天', '夏天'];
        this.dynastys = ['不限', '先秦', '两汉', '魏晋', '南北朝'];;
        this.formates = ['不限', '诗', '词', '曲', '文言文'];
        this.conditionT = this.types[1] == "不限" ? '' : this.types[1];
        this.conditionC = this.dynastys[0] == "不限" ? '' : this.dynastys[0];
        this.conditionX = this.formates[0] == "不限" ? '' : this.formates[0];

        this.referesh();

    }
    referesh() {
        this.getData((data) => {
            let ds =new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.dataSrouce = ds.cloneWithRows(data.gushiwens);
            this.setState((state) => {
                return { needFresh: true }
            });
        });
    }

    getData(callback) {        
        let url = `http://app.gushiwen.org/api/shiwen/type.aspx?n=2441288939&page=${this.currentpage}&pwd=&id=0&token=gswapi&c=${this.conditionC}&p=${this.currentpage}&x=${this.conditionX}&t=${this.conditionT}`;
        console.log("the url si " + url);
        fetch(url, { method: 'GET' }).then((response) => response.json()).then((data) => {
            this.allPage = data.sumPage;
            this.currentpage = data.currentPage;

            model = data.gushiwens;
            this.pageTitle = data.pageTitle;
            model.map((item) => {
                let mapStr = "(/<br />/g";
                let regex = new RegExp("<.*?>", "g");
                let content = item.cont.replace(regex, "");
                item.cont = content;
                let authmanager = new AuthorManager;
            });
            callback(data);
        });
    }

    typeConditionClicked(name) {
        this.conditionT = name == "不限" ? '' : name;
        console.log(`typeConditionClicked${name}`);
        this.referesh();
    }

    dynastyClicked(name) {
        this.conditionC = name == "不限" ? '' : name;
        console.log(`dynastyClicked${name}`);
        this.referesh();
    }

    formateClicked(name) {
        this.conditionX = name == "不限" ? '' : name;
        console.log(`formateClicked${name}`);
        this.referesh();
    }

    generateConditionButtons(name, types, callback) {
        let buttons = [];
        for (var i = 0; i < types.length; i++) {
            let name = types[i];
            // let callback = this.tyleConditionClicked;           
            buttons.push({ name: name, callback: callback });
        }
        return { name: name, buttons: buttons }

    }


    genConditionView() {
        let type = this.generateConditionButtons('类型', this.types, this.typeConditionClicked.bind(this));
        let dyna = this.generateConditionButtons('朝代', this.dynastys, this.dynastyClicked.bind(this));
        let form = this.generateConditionButtons('形式', this.formates, this.formateClicked.bind(this));


        let conditions = [type, dyna, form];
        return <ConditionView conditions={conditions} />
    }

    generatePagebar() {
        console.log("allpage = " + this.allPage);
        return <PageBar ref='pagebar' style={styles.pageBar} callBack={this.pageChanged.bind(this)} allPage={this.allPage} currentPage={this.currentpage} />
    }

    pageChanged(page) {
        console.log("the page is " + page);
        this.currentpage = page;
        this.referesh();
    }

    render() {
        let vwidth = Dimensions.get('window').width
        let containerStyle = Object.assign({}, this.props.style);
        containerStyle = Object.assign(containerStyle, { width: vwidth, backgroundColor: '#f2f1e4' });
        return (
            <View style={containerStyle}>
                {this.genConditionView()}
                <ListView style={styles.conttainer}
                    dataSource={this.dataSrouce}
                    renderRow={(data) => {

                        return (<ListCell showModel={{
                            showName: data.nameStr,
                            des: `作者:${data.author}`,
                            content: data.cont,
                            icon: data.icon == undefined ? '' : data.icon,
                            author: data.author,
                        }
                        }
                            callback={(data) => {
                                this.props.jumpCallBack(data);
                            }}
                            data={data}
                        />)
                    }}

                    renderSectionHeader={() => {
                        return (<View style={styles.section}><Text style={styles.title}>{this.pageTitle}</Text></View>)
                    }}
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections={true}
                ></ListView>

                {this.generatePagebar()}

            </View>
        );
    }
}

const styles = {
    conttainer: {
        flex: 1,
        backgroundColor: 'red',
    },
    section: {
        height: 42,
        backgroundColor: "#f2f1e4",
        borderBottomWidth: 1,
        borderColor: '#dddbdd',
    },
    title: {
        textAlign: 'left',
        fontSize: 21,
        color: '#2e2e2e',
        marginTop: 10,
        marginLeft: 7
    },
    pageBar: {
        height: 50,
        backgroundColor: '#e2e2e2',
    }
}
AppRegistry.registerComponent('PoemView', () => PoemView);