import React, { Component } from 'react'
import { AppRegistry, Button, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'

import ConditionBar from './conditionBar'

export default class ConditionView extends Component {
    constructor(props) {
        super(props);

    }

    genConditionBars() {

     return  this.props.conditions.map((item,index) => {            
            return <ConditionBar key={`conditionviwe${index}`} name={item.name} buttons={item.buttons} style={styles.conditionbar} selected={item.selected} />
        });
    }

    render() {
        return (
            <View style={styles.main}>
                {this.genConditionBars()}
            </View>)
    }
}

const styles = {
    main: {                
    },
    type: {

    },
    buttons: {
        flexDirecttion: 'row',
    },conditionbar:{
        height :40,
    }    
}

AppRegistry.registerComponent('ConditionView', () => ConditionView);