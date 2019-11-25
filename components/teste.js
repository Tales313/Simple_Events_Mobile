/*
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
 
class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: 'lightblue'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
  
  render() {
  return(
    <View style={{flex: 1, justifyContent: 'center'}}>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 50}}>Tela Inicial</Text>
      </View>

      <Button 
        title="ir pra profile" 
        onPress={ () => this.props.navigation.navigate('Profile', {nome: 'tales'}) }
      />
    </View>
  )
}
}

class ProfileScreen extends Component {

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: 'lightblue'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center'}}>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 50}}>Tela Profile</Text>
        <Text style={{fontSize: 50}}>{this.props.navigation.getParam('nome')}</Text>
      </View>

      <Button 
        title="Voltar" 
        onPress={ () => this.props.navigation.goBack() }
      />
    </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen}
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render(){
    return(
      <AppContainer></AppContainer>
    )
  }
}