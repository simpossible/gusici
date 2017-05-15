import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'

export default class Component1 extends Component {
    constructor() {
        super();
        this.state = {
            name: 'steven',
            showName: true
        }    
}

static defaultProps = {
    message : "hihihi"

}

    render() {
       console.log("this is a log");
        let name = this.state.showName ? this.state.name : "NO name";
        return (
            <View>
                <Text>{this.props.message}</Text>
                <Text>{name}:this</Text>
            </View>
        );
    }
}
AppRegistry.registerComponent('Component1', () => component1);