import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'
import ListCell from './ListCell'
import {
    StackNavigator,
} from 'react-navigation';

export default class RecentFreshView extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSrouce = ds.cloneWithRows([
            { author: "礼拜" }
        ]);
        this.getData((data) => {
            this.dataSrouce = ds.cloneWithRows(data.gushiwens);
            this.setState((state) => {
                return { needFresh: true }
            });
        });

    }


    getData(callback) {
        fetch('http://app.gushiwen.org/api/upTimeTop11.aspx?n=4173603315&page=1&pwd=&id=0&token=gswapi', { method: 'GET' }).then((response) => response.json()).then((data) => {
            model = data.gushiwens;
            model.map((item) => {
                let mapStr = "(/<br />/g";
                let regex = new RegExp("<br />", "g");
                let content = item.cont.replace(regex, "");
                item.cont = content;
            });
            callback(data);

            // let  modlearray = Array.from(model);

        });
    }

    getCellModel(json) {
        return {
            icon: "a",
            first: json.nameStr,
            sectond: "作者:{json.author} ",
            third: json.content
        }
    }

    render() {

        console.log("the navigato"+ this.props.navigator);
        return (
            <View>
                <ListView style={styles.conttainer}
                    dataSource={this.dataSrouce}
                    renderRow={(data) => {
                        return (<ListCell showModel={{
                            showName: data.nameStr,
                            des: `作者:${data.author}`,
                            content: data.cont,
                            icon: "http://img.gushiwen.org/authorImg/libai.jpg"
                        }
                        }
                            callback={(data) => {
                                this.props.jumpCallBack(data);
                            }}
                            data={data}
                        />)
                    }}

                    renderSectionHeader={() => {
                        return (<View style={styles.section}><Text style={styles.title}>最近更新</Text></View>)
                    }}
                    automaticallyAdjustContentInsets={false}
                >

                </ListView>
            </View>

        );
    }

}
const styles = {
    conttainer: {
        backgroundColor: 'blue',


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
    }
}

AppRegistry.registerComponent('RecentFreshView', () => RecentFreshView);