import React, { Component } from 'react'
import { AppRegistry, Text, View, Image, StyleSheet, TextInput } from 'react-native'


export default class HomeHeader extends Component {

    render() {
        let icon = require("../res/person_down.png");
        let randownicon = require("../res/random.png");
        return (
            <View style={styles.header}>
                <Image source={icon} style={styles.headericon} />
                <TextInput style={styles.headerInput} />
                <Image source={randownicon} style={styles.rightIcon} />
               
            </View>
        );
    }

}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#D1D0A9',
        height: 64
    },
    headericon: {
        // flex: 1,
        width: 25,
        height: 25,
        marginLeft: 15,
        marginBottom: 20,
        marginRight:24,
        marginTop:30
    },
    headerInput: {
        flex: 1,
        backgroundColor: 'white',
        height: 25,
        top: 30,
        borderRadius:5
    },
    rightIcon: {
        width: 25,
        height: 25,
        marginLeft: 15,
        marginBottom: 20,
        marginRight:24,
        marginTop:30
    }
});

AppRegistry.registerComponent('HomeHeader',() => HomeHeader);