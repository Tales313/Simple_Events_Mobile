import React, { Component } from 'react'
import { 
    ScrollView, 
    FlatList, 
    StyleSheet, 
    ToastAndroid,
    Text, 
    View, 
    Dimensions, 
    TouchableOpacity 
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AsyncStorage from '@react-native-community/async-storage'

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
            usuarioLogado: '',
        }

        this.getEventosFromApi()
    }

    getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('@token')
          return value
        } catch(e) {
          console.log(e)
        }
    }

    getUserName = async () => {
        try {
            const value = await AsyncStorage.getItem('@username')
            return value
        } catch(e) {
            console.log(e)
        }
    }

    apagarEvento = async (id) => {
        let token = await this.getToken()
        const link = 'https://s-events-api.herokuapp.com/api/eventos/' + id + '/'
        const cabecalho = {
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
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

    botaoEspecialidades = () => {
        if (this.state.usuarioLogado == 'admin')
            return (
                <ActionButton.Item
                    buttonColor="#7339ad"
                    title="Especialidades"
                    onPress={() => this.abrirListEspecialidades()}>
                    <Icon name="users" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            )    
    }

    async getEventosFromApi() {
        let usuarioLogado = await this.getUserName()
        this.setState({usuarioLogado})
        const url = 'https://s-events-api.herokuapp.com/api/eventos/'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({eventos: res})
        }).catch(error => {
            console.error(error)
        })
    }

    abrirAddEvento() {
        this.props.navigation.navigate('Adicionar_Evento', {
            refresh: this.refresh.bind(this),
        }) 
    }

    abrirListEspecialidades() {
        this.props.navigation.navigate('EspecialidadesList') 
    }

    refresh() {
        this.getEventosFromApi()
    }

    renderBotoesEditarApagar = (owner) => {
        // se o usuario logado for dono do evento,
        // renderize os botoes de editar e apagar
        if(this.state.usuarioLogado == owner)
            return (
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
            )
        else
            return (
                <View></View>
            )
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
                                            id: item.id,
                                            //nome: item.nome,
                                            //descricao: item.descricao,
                                            //data: item.data,
                                            //local: item.local,
                                        }) }>
                                        <Text style={styles.nome}>{item.nome}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.data}>{item.data}</Text>
                                </View>
                                {this.renderBotoesEditarApagar(item.owner)}
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
                    {this.botaoEspecialidades()}
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
