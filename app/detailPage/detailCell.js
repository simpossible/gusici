import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight, ListView, NavigatorIOS, ScrollView, Image, TouchableWithoutFeedback } from 'react-native'

export default class DetailCell extends Component {

    constructor(props) {
        super(props);
        // this.props.celldata = {};
        this.props.minWidth = 130;//字数相关        
        this.shouldExtend = false;//是否需要展开
    }

    generateContent(){
        if(!this.shouldExtend){
            return(<Text style={styles.cont} numberOfLines={3}>{this.props.celldata.cont}</Text>);
        }
    }

    extendIconClicked(){
        this.shouldExtend = !this.shouldExtend;
        this.setState((a)=>{return {ref:true}});
    }

    render() {    
        let icon = this.shouldExtend?require('../res/arrow_grey_up_small.png'):require('../res/arrow_grey_down_small.png');            
        return (<View style={{borderBottomWidth:1,borderBottomColor:'#e0dede'}}>
            <Text style={styles.title}>{this.props.celldata.nameStr}</Text>
            {this.generateContent()}
            <TouchableWithoutFeedback onPress={this.extendIconClicked.bind(this)}>
            <Image source={icon} style={styles.extendIcon}/>
            </TouchableWithoutFeedback>
        </View>);
    }


}
const styles = {
    title:{
        color:'#245079',
        fontSize:17,
        left:10,
        marginTop:15,
        marginBottom:6,
    },
    cont:{
        color:'black',
        fontSize:17,
        left:10,
         lineHeight:28,
         paddingRight:30,

    },
    extendIcon:{
        position:'absolute',
        right:10,
        bottom:10,
    }
}

AppRegistry.registerComponent('DetailCell', () => DetailCell);