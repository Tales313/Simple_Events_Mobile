import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, ToastAndroid,
    Text, View, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'

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

        // se usuario logado for adm:
        // no actions abaixo adicione um
        // botao para listagem de especialidades

        this.actions = [
            {
                text: 'Novo Evento!',
                name: 'Adicionar_Evento',
                icon: require('../images/calendar.jpg'),
                position: 1,
            },
            {
                text: 'Especialidades',
                name: 'EspecialidadesList',
                icon: require('../images/especialidade.png'),
                position: 2
            },
        ]
        
        this.getEventosFromApi()
    }     

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

    abrirListEspecialidades() {
        this.props.navigation.navigate('EspecialidadesList') 
    }

    refresh() {
        this.getEventosFromApi()
    }

    render() {
        return (
            <ScrollView style={styles.tela}>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.eventos}
                        keyExtractor={item => item.nome}
                        renderItem={({item}) => (
                            <View style={styles.evento}>
                                <View style={styles.nomeData}>
                                    <TouchableOpacity 
                                        onPress={ () => this.props.navigation.navigate('Evento', {
                                            nome: item.nome,
                                            descricao: item.descricao,
                                            data: item.data,
                                            local: item.local,
                                        }) }>
                                        <Text style={styles.nome}>{item.nome}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.data}>{item.data}</Text>
                                </View>
                                <View style={styles.editarApagar}>
                                    <TouchableOpacity
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
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.apagarEvento(item.id)}>
                                        <Icon name="trash" size={25} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <ActionButton buttonColor="#309ebf">
                    <ActionButton.Item
                        buttonColor="#39ad83"
                        title="Novo Evento"
                        onPress={() => this.abrirAddEvento()}>
                        <Icon name="calendar" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#7339ad"
                        title="Especialidades"
                        onPress={() => this.abrirListEspecialidades()}>
                        <Icon name="users" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    tela: {
        height: '100%',
    },
    container: {
        height: (Dimensions.get('window').height / 100) * 92,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    nome: {
        fontSize: 18,
    },
    data: {
        fontSize: 12,
        color: 'grey'
    },
    evento: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#dedede'
    },
    nomeData: {
        flex: 8,
    },
    editarApagar: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})
