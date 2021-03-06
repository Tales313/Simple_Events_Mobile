import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
    ToastAndroid,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

export default class EventoShow extends Component {

    static navigationOptions = {
        title: 'Evento',
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
            refresh: 0,
            nome: '',
            descricao: '',
            owner: '',
            data: '',
            local: '',
            finalizado: '',
            vagas: [],
            checked: '',
            usuarioLogado: '',
        }

        this.getEventoFromApi()

    }

    async getEventoFromApi() {
        const id = this.props.navigation.getParam('id')
        let url = 'https://s-events-api.herokuapp.com/api/eventos/' + id + '/'
        let response = await fetch(url)
        let evento = await response.json()
        let usuarioLogado = await this.getUserName()

        this.setState({nome: evento.nome})
        this.setState({descricao: evento.descricao})
        this.setState({owner: evento.owner})
        this.setState({data: evento.data})
        this.setState({local: evento.local})
        this.setState({finalizado: evento.finalizado})
        this.setState({vagas: evento.vagas})
        this.setState({usuarioLogado})
    }

    refresh = () => {
        this.setState({refresh: this.state.refresh+1})
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

    candidatar = async () => {
        let id_da_vaga = 0
        for (let vaga of this.state.vagas) {
            if(vaga.especialidade == this.state.checked)
                id_da_vaga = vaga.id
        }
        
        if(id_da_vaga == 0) {
            alert('Essa vaga não existe')
            return
        }

        let url = 'https://s-events-api.herokuapp.com/api/vagas/' + id_da_vaga + '/candidatar/'
        let token = await this.getToken()
        let cabecalho = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
            }
        }
        let response = await fetch(url, cabecalho)
        if(response.status >= 200 && response.status <= 204) {
            ToastAndroid.show('Candidatura Efetuada!', ToastAndroid.SHORT)
            this.props.navigation.goBack()
        } else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }
    }

    abrirDeferimento(id_vaga, qtd_vagas, especialidade, finalizado) {
        this.props.navigation.navigate('Deferir_Candidatura', {
            id_vaga: id_vaga,
            qtd_vagas: qtd_vagas,
            especialidade: especialidade,
            finalizado: finalizado,
        })
    }

    finalizar = async () => {
        let id = this.props.navigation.getParam('id')
        let url = 'https://s-events-api.herokuapp.com/api/eventos/' + id + '/'
        let token = await this.getToken()
        let cabecalho = {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({
                'nome': this.state.nome,
                'descricao': this.state.descricao,
                'data': this.state.data,
                'local': this.state.local,
                'finalizado': true,
            })
        }

        let response = await fetch(url, cabecalho)
        let evento =  await response.json()
        if(response.status == 200) {
            ToastAndroid.show('Evento finalizado!', ToastAndroid.SHORT)
            const refreshFunction = this.props.navigation.getParam('refresh')
            refreshFunction() // atualizando a listagem de eventos
            this.props.navigation.goBack()
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }
    }

    renderBlocoVagas = () => {
        return (
            <View style={styles.BlocoVagas}>
                <Text style={styles.vagasNome}>Vagas</Text>
                {this.renderVagas()}
                {this.renderBotaoCandidatar()}
            </View>
        )
    }
///
    renderVagas = () => {
        if(this.state.usuarioLogado == this.state.owner) {
            return this.state.vagas.map(vaga => {
                return (
                    <TouchableOpacity style={styles.vaga}
                        onPress={() => this.abrirDeferimento(
                            vaga.id, vaga.qtd_vagas, vaga.especialidade, this.state.finalizado)}
                    >
                        <Text>{vaga.especialidade} / {vaga.qtd_candidatos} candidatos</Text>
                    </TouchableOpacity>
                )
            })
        }

        let checked = this.state.checked
        if(!this.state.finalizado){
            return this.state.vagas.map(vaga => {
                return (
                    <View style={styles.vaga}>
                        <RadioButton 
                            value={vaga.especialidade}
                            status={checked === vaga.especialidade ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ checked: vaga.especialidade })} }
                        />
                        <Text>{vaga.especialidade}</Text>
                    </View>            
                )
            })
        } else {
            return (
                <View>
                    <Text>Inscrições encerradas!</Text>
                </View>
            )
        }
    }

    renderBotaoCandidatar = () => {
        if(this.state.usuarioLogado == this.state.owner) {
            return (<View><Text></Text></View>)
        } else {
            if(this.state.finalizado) {
                return (<View><Text></Text></View>)
            } else {
                return (
                    <TouchableOpacity
                        onPress={() => this.candidatar()}
                    >
                        <View style={styles.botaoCandidatar}>
                            <Text style={styles.textoBotaoCandidatar}>Candidatar-se</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
    }
///
    renderFinalizar = () => {
        if(this.state.finalizado == true) {
            return (
                <View></View>
            )
        ///
        } else {
            if(this.state.usuarioLogado == this.state.owner) {
                return (
                    <TouchableOpacity
                        onPress={() => this.finalizar()}
                    >
                        <View style={styles.botaoFinalizar}>
                            <Text style={styles.textoBotaoFinalizar}>Finalizar Inscrições</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.blocoNome}>
                        <Text style={styles.nome}>{this.state.nome}</Text>
                    </View>
                    <View style={styles.blocoDescricao}>
                        <Text style={styles.descricao}>{this.state.descricao}</Text>
                    </View>
                    <View style={styles.blocoLocalData}>
                        <Text style={styles.dataLocal}>{this.state.data}</Text>
                        <Text style={styles.dataLocal}>{this.state.local}</Text>
                    </View>
                    {this.renderBlocoVagas()}
                    {this.renderFinalizar()}
                </View>
            </ScrollView>
        )
    }

}
///
const styles = StyleSheet.create({
    container: {
        //height: (Dimensions.get('window').height / 100) * 92,
        paddingHorizontal: 40,
        paddingVertical: 30,
    },
    blocoNome: {
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    nome: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    blocoDescricao: {
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    descricao: {
        fontSize: 15,
        color: 'grey',
        textAlign: 'center',
    },
    blocoLocalData: {
        //borderWidth: 1,
    },
    dataLocal: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    BlocoVagas: {
        //borderWidth: 1,
        marginTop: 20,
    },
    vagasNome: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10,
    },
    vaga: {
        //borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    botaoCandidatar: {
        marginTop: 40,
        backgroundColor: '#309ebf',
        paddingHorizontal: 80,
        paddingVertical: 8,
        borderRadius: 25,
    },
    textoBotaoCandidatar: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    botaoFinalizar: {
        backgroundColor: '#309ebf',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    textoBotaoFinalizar: {
        color: '#fff',
        fontWeight: 'bold',
    }
})