import React, { Component } from 'react'
import { AppRegistry, Text, View, Image, StyleSheet, TextInput,TouchableHighlight } from 'react-native'

import Menu from './menu'
export default class MenuBar extends Component {

    static defaultProps = {
        bars: [{name:'a',select:false}, {name:'b',select:false}],
    }
    constructor() {
        super();
        this.state = {
            
        }
    }

    rendermenu(bar,index) {
        return (<Menu key ={bar.name} 
                      menu={bar}
                      callback={()=>{
                        this.props.bars.map((item,i)=>{                            
                            if(i!=index){                                
                                item.select=false;
                            }else {                                
                                item.select = true;
                            }
                            this.setState((state)=>{
                                return {                                    
                                }
                            })                            
                        });
                      }}
                        />)
    } 
    render() {        
        return (
            <View style={styles.container}>
                {
                    this.props.bars.map((item,i)=>this.rendermenu(item,i))
                }                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // flex:1,        
        backgroundColor:'#e5e5cc',
        flexDirection:'row',
        height:40,
        // alignItems:'center'
    },
    menu:{
        flex:1,        
        lineHeight:14,
        textAlign:'center',
        color:'#7d7c79',
        alignSelf:'center'    
        
    }
    
});

AppRegistry.registerComponent('MenuBar', () => MenuBar);

