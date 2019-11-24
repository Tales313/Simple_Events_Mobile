import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

export default class TopBar extends Component {

    render(){
        return(
            <View style={styles.menu}>
                <View style={styles.hamburguer}> 
                    <Image style={styles.hamburguerIcon} source={require('../images/hamburguer.png')} />
                </View>
                <View style={styles.textView}> 
                    <Text style={styles.text}>Simple Events</Text>
                </View>
                <View style={styles.menuRight}></View>
            </View>
        )
    }

}

styles = StyleSheet.create({
    menu: {
        //flex: 1,
        height: (Dimensions.get('window').height / 100) * 8,
        flexDirection: 'row',
        backgroundColor: '#309ebf'
    },
    hamburguer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hamburguerIcon: {
        height: 20,
        width: 25
    },
    textView: {
        //borderWidth: 1,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
    },
    menuRight: {
        width: '15%'
    }
})