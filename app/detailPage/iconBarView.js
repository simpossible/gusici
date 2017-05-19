import React, { Component } from 'react'
import { AppRegistry,Dimensions, StyleSheet, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'

export default class IconBarView extends Component {

    constructor(props) {
        super(props);
        console.log('9999' + props.height);
    }

    generateItems() {
        let itemIcons = this.props.icons;// {callback:method,icon:icon}        
        if (itemIcons != undefined) {

        let itemwidth = (Dimensions.get('window').width - 24*itemIcons.length) /(itemIcons.length *2);//left width
        let imageStyle = Object.assign({},styles.image);            
        imageStyle = Object.assign(imageStyle,{marginLeft:itemwidth,marginRight:itemwidth});
            return itemIcons.map((item,i) => {
                let icon = item.icon;                
                if (icon != undefined) {
                    let method = item.callback;
                    return <TouchableWithoutFeedback key={`iconbarview${i}`} onPress={method}><Image source={icon}  style = {imageStyle}/></TouchableWithoutFeedback>
                }
            }); 
        }
    }
    render() {
        let container = {};
        container = Object.assign(container, styles.container);
        container = Object.assign(container, { height: this.props.height });

        return (<View style={container}>
            {this.generateItems()}
        </View>)
    }


}

const styles = {
    container: {
        flexDirection: 'row',
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        justifyContent:'center'
    },
    image:{
        
    }

}



AppRegistry.registerComponent('IconBarView', () => IconBarView);