import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, ToastAndroid,
    Text, View, Dimensions, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './TopBar'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Evento from './Evento_Show'

class EventosList extends Component {

    static navigationOptions = {
        title: 'Eventos',
        headerStyle: {
            backgroundColor: '#309ebf'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            eventos: [],
            refresh: 0
        }
    }

    componentDidMount() {
        this.getEventosFromApi()
    }

    apagarEvento= async (id) => {
        const link = 'https://s-events-api.herokuapp.com/api/eventos/'
        const cabecalho = {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'id': id
            })
        }

        let response = await fetch(link, cabecalho)
        if(response.status >= 200 && response.status <= 204) {
            ToastAndroid.show('Evento Apagado!', ToastAndroid.SHORT)
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }
        this.setState({refresh: this.state.refresh+1})
    }

    getEventosFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/eventos/'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({eventos: res})
        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <ScrollView style={{height: '100%'}}>
                <Menu/>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.eventos}
                        keyExtractor={item => item.nome}
                        renderItem={({item}) => (
                            <View style={styles.evento}>
                                <TouchableHighlight 
                                    onPress={ () => this.props.navigation.navigate('Evento', {
                                        nome: item.nome,
                                        descricao: item.descricao,
                                        data: item.data,
                                        local: item.local
                                    }) }>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                </TouchableHighlight>
                                <Text style={styles.descricao}>{item.data}</Text>
                                <TouchableHighlight
                                    onPress={() => this.apagarEvento(item.id)}>
                                    <Icon name="trash" size={25} color="red" />
                                </TouchableHighlight>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        )
    }
}

const AppNavigator = createStackNavigator(
    {
        EventosList: {screen: EventosList},
        Evento: {screen: Evento}
    },
    {
        initialRouteName: 'EventosList'
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

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: (Dimensions.get('window').height / 100) * 92,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    nome: {
        fontSize: 18,
    },
    descricao: {
        fontSize: 12,
        color: 'grey'
    },
    evento: {
        //borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    }
})
