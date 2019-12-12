import React, { Component } from 'react'
import { 
    ScrollView, 
    FlatList, 
    StyleSheet, 
    Text, 
    View, 
    Dimensions, 
    TouchableOpacity, 
    ToastAndroid 
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'

export default class EspecialidadesList extends Component {

    static navigationOptions = {
        title: 'Especialidades',
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
            especialidades: [],
        }
    }

    componentDidMount() {
        this.getEspecialidadesFromApi()
    }

    getEspecialidadesFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/especialidades/'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({especialidades: res})
        }).catch(error => {
            console.error(error)
        })
    }

    abrirAddEspecialidade() {
        this.props.navigation.navigate('Adicionar_Especialidade', {
            refresh: this.refresh.bind(this)
        }) 
    }

    abrirEditarEspecialidade(id) {
        ToastAndroid.show('Implementar Editar!!!', ToastAndroid.SHORT)
    }

    apagarEspecialidade(id) {
        ToastAndroid.show('Implementar Apagar!!!', ToastAndroid.SHORT)
    }

    refresh() {
        this.getEspecialidadesFromApi()
    }

    render() {
        return (
            <ScrollView style={styles.tela}>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.especialidades}
                        keyExtractor={item => item.nome}
                        renderItem={({item}) => (
                            <View style={styles.especialidade}>
                                <View style={styles.nomeDescricao}>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                    <Text style={styles.descricao}>{item.descricao}</Text>
                                </View>
                                <View style={styles.editarApagar}>
                                    <TouchableOpacity
                                        onPress={() => this.abrirEditarEspecialidade()}>
                                        <Icon name="pencil" size={25} color="blue" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.apagarEspecialidade(item.id)}>
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
                        title="Nova Especialidade"
                        onPress={() => this.abrirAddEspecialidade()}>
                        <Icon name="user" style={styles.actionButtonIcon} />
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
        paddingHorizontal: 5,
    },
    especialidade: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 8,
        borderBottomWidth: 1,
        borderColor: '#dedede'
    },
    nome: {
        fontSize: 18,
    },
    descricao: {
        fontSize: 12,
        color: 'grey',
    },
    nomeDescricao: {
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
