import React, { Component } from 'react'
import { AppRegistry, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'
import ListCell from '../recentfresh/ListCell'

import { AuthorManager } from '../../author/AuthorManager'
import RecentFreshView from '../recentfresh/RecentFreshView'

import ConditionView from './conditionView'

export default class PoemView extends RecentFreshView {

    constructor(props) {
        super(props);
        this.url = 'http://app.gushiwen.org/api/shiwen/type.aspx?n=1049761583&page=1&pwd=&id=0&token=gswapi&c=%E9%AD%8F%E6%99%8B&p=1&x=&t=';
    }


    typeConditionClicked(name) {

    }

    dynastyClicked(name) {

    }

    formateClicked(name) {

    }

    generateConditionButtons(name, types, callback) {
        let buttons = [];
        for (var i = 0; i < types.length; i++) {
            let name = types[i];
            let callback = this.tyleConditionClicked;
            buttons.push({ name: name, callback: callback });
        }
        return { name: name, buttons: buttons }

    }

 

    genConditionView() {
        let types = ['不限', '写景', '咏物', '春天', '夏天'];
        let type = this.generateConditionButtons('类型', types, this.typeConditionClicked.bind(this));

        let dynastys = ['不限', '写景', '咏物', '春天', '夏天'];;
        let dyna = this.generateConditionButtons('朝代', dynastys, this.dynastyClicked.bind(this));

        let formates = ['不限', '写景', '咏物', '春天', '夏天'];;
        let form = this.generateConditionButtons('形式', formates, this.formateClicked.bind(this));

        let conditions = [type, dyna, form];
        return <ConditionView conditions ={conditions} />
    }

    render() {
        let vwidth = Dimensions.get('window').width
        let containerStyle = Object.assign({}, this.props.style);
        containerStyle = Object.assign(containerStyle, { width: vwidth ,backgroundColor:'red'});
        return (
            <View style={containerStyle}>
              {  this.genConditionView() }
            </View>

        );
    }

}
const styles = {
    conttainer: {
        flex:1,
        backgroundColor:'red',
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
