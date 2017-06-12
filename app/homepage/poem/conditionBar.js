import React, { Component } from 'react'
import { AppRegistry, Image, Button, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'

export default class ConditionBar extends Component {
    constructor(props) {
        super(props);
        console.log("khk"+JSON.stringify(props.buttons));
    }

    generateButtons() {
        return this.props.buttons.map((item, index) => {
            let name = item.name;
            let callBack = item.callBack;
            let style = Object.assign({}, styles.button);

            if (this.props.selected == index) {
                style.color = '#a22919';
            }
            return <View key={'conditionbartext' + index} >
                <TouchableHighlight onPress={                    
                    ()=>{item.callback(name)}}>
                    <Text style={style}>{name}</Text>
                </TouchableHighlight>
            </View>
        });
    }

    render() {
        let mainstype = Object.assign({}, this.props.style);
        mainstype = Object.assign(mainstype, styles.main);
        let icon = require('../../res/downtringle.png');
        return (
            <View style={mainstype}>
                <Text style={styles.type}>{this.props.name}</Text>
                <View style={styles.buttons} >
                    {this.generateButtons()}
                </View>
                <Image source={icon} style={styles.tringle} />
            </View>
        );
    }
}

const styles = {
    main: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0dede',
        alignItems: 'center',

    },
    type: {
        left: 7,
        color: '#375e3c',
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        color: '#2a527a',
        paddingLeft: 10,
        paddingRight: 10,
    },
    tringle: {
        position: 'absolute',
        right: 10,
    }
}

AppRegistry.registerComponent('ConditionBar', () => ConditionBar);