import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight ,TouchableOpacity} from 'react-native'

export default class Component2 extends Component {

    onPress() {
        console.log("pressed");
    }
    render() {
        console.log("hehe");
        return (
            <View>
                <View style={styles.myView}>
                    <Text style={styles.myText}>哈哈</Text>
                </View>

                <View style={styles.mycontainer}>
                    <TouchableHighlight
                        onPress={this.onPress}
                        style={styles.v1}
                        underlayColor='blue'
                        >
                        <View style={styles.v1}>
                            <Text> viewe 1</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableOpacity
                    style = {styles.v2}
                    >
                    <View style={styles.v2}>
                        <Text> viewe 2</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={styles.v3}>
                        <Text> viewe 3</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    myView: {
        backgroundColor: 'red'
    },
    myText: {
        color: 'blue'
    },
    mycontainer: {
        flexDirection: 'row',
        height: 100
    },
    v1: {
        flex: 1,
        backgroundColor: 'red',
        padding: 10,
    },
    v2: {
        flex: 1,
        backgroundColor: 'green',
        padding: 10,
    },
    v3: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    }

});

AppRegistry.registerComponent('Component2', () => myapp);