import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, ToastAndroid,
    Text, View, Dimensions, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EventosList extends Component {

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
            refresh: 0,
            usuario_nome: this.props.navigation.getParam('usuario_nome'),
            usuario_id: this.props.navigation.getParam('usuario_id')
        }
        
        this.getEventosFromApi()
    }

    //componentDidMount() {
        //this.getEventosFromApi()
    //}
        

    apagarEvento = async (id) => {
        const link = 'https://s-events-api.herokuapp.com/api/eventos/' + id + '/'
        const cabecalho = {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
        }

        let response = await fetch(link, cabecalho)
        if(response.status >= 200 && response.status <= 204) {
            ToastAndroid.show('Evento Apagado!', ToastAndroid.SHORT)
            this.refresh()
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }
        this.refresh()
    }

    getEventosFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/eventos/'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({eventos: res})
        }).catch(error => {
            console.error(error)
        })
    }

    abrirAddEvento() {
        console.log('eventos-list-usuario.nome' + this.state.usuario_nome)
        console.log('eventos-list usuario_id: ' + this.state.usuario_id)
        this.props.navigation.navigate('Adicionar_Evento', {
            refresh: this.refresh.bind(this),
            usuario_id: this.state.usuario_id
        }) 
    }

    refresh() {
        this.getEventosFromApi()
    }

    render() {
        return (
            <ScrollView style={{height: '100%'}}>
                <View style={styles.addEvento}>
                    <TouchableHighlight
                        onPress={ () => this.abrirAddEvento() }>
                        <Icon name="plus" size={25} color="green" />
                    </TouchableHighlight>
                </View>
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
                                        local: item.local,
                                    }) }>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                </TouchableHighlight>
                                <Text style={styles.descricao}>{item.data}</Text>
                                <TouchableHighlight
                                    onPress={() => this.props.navigation.navigate('Editar_Evento', {
                                        id: item.id,
                                        nome: item.nome,
                                        descricao: item.descricao,
                                        data: item.data,
                                        local: item.local,
                                        owner: item.owner,
                                        refresh: this.refresh.bind(this)
                                    })}>
                                    <Icon name="pencil" size={25} color="blue" />
                                </TouchableHighlight>
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

const styles = StyleSheet.create({
    addEvento: {
        height: 50,
        justifyContent: 'flex-end',
        paddingLeft: 15,
    },
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
