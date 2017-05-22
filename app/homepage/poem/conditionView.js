import React, { Component } from 'react'
import { AppRegistry, Button, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'

import ConditionBar from './conditionBar'

export default class ConditionView extends Component {
    constructor(props) {
        super(props);

    }

    genConditionBars() {

     return  this.props.conditions.map((item,index) => {
            // console.log('这些条件' + JSON.stringify(item));            
            return <ConditionBar key={`conditionviwe${index}`} name={item.name} buttons={item.buttons} />
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
        backgroundColor: 'green',
    },
    type: {

    },
    buttons: {
        flexDirecttion: 'row',
    }
}

AppRegistry.registerComponent('ConditionView', () => ConditionView);