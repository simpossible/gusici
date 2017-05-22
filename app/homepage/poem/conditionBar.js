import React, { Component } from 'react'
import { AppRegistry,Button, Dimensions, Text, View, TouchableHighlight, ListView, NavigatorIOS } from 'react-native'

export default class ConditionBar extends Component {
    constructor(props) {
        super(props);

    }

    generateButtons() {        
     return  this.props.buttons.map((item,index)=>{ 
            let name = item.name;
            let callBack = item.callBack;
            return <Text key={`conditionbartext${index}`}>{name}</Text>
            // return <Button title = {name} onPress={()=>{callBack(name)}} color="#841584" style={styles.button}/>
        });
    }

    render() {        
        return (
            <View style={styles.main}>
                <Text>{this.props.name}</Text>
                <View style={styles.buttons} >
                    {this.generateButtons()}
                </View>
            </View>
        );
    }
}

const styles = {
    main: {                
        flexDirection:'row',
        height:50,
    },
    type: {

    },
    buttons:{
        width:300,        
        flexDirection: 'row',
        backgroundColor:'yellow'
    },
    button:{
        width:50,
        backgroundColor:'yellow'
    }
}

AppRegistry.registerComponent('ConditionBar', () => ConditionBar);