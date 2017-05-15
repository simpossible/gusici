import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS,Text, View } from 'react-native'
export default class amyapp extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: MyScene,
                    title: 'My Initial Scene',
                }}
                style={{ flex: 1 }}
            />
        )
    }
}