import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
            data: '',
            local: '',
            vagas: [],
            checked: '',
        }

        this.getEventoFromApi()

    }

    async getEventoFromApi() {
        const id = this.props.navigation.getParam('id')
        let url = 'https://s-events-api.herokuapp.com/api/eventos/' + id + '/'
        let response = await fetch(url)
        let evento = await response.json()

        let vagas_aux = []
        let vaga_aux, esp
        for(let vaga of evento.vagas) {
            url = 'https://s-events-api.herokuapp.com/api/especialidades/' + vaga.especialidade + '/'
            response = await fetch(url)
            esp = await response.json()
            vaga_aux = vaga
            vaga_aux.nome = esp.nome
            vagas_aux.push(vaga_aux)
        }
        this.setState({nome: evento.nome})
        this.setState({descricao: evento.descricao})
        this.setState({data: evento.data})
        this.setState({local: evento.local})
        this.setState({vagas: vagas_aux})
    }

    refresh = () => {
        this.setState({refresh: this.state.refresh+1})
    }

    candidatar() {
        alert('IMPLEMENTAR!')
    }

    renderVagas = () => {
        let checked = this.state.checked
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
                    <View style={styles.BlocoVagas}>
                        <Text style={styles.vagasNome}>Vagas</Text>
                        {this.renderVagas()}
                        <TouchableOpacity
                            onPress={() => this.candidatar()}
                        >
                        <View style={styles.botaoCandidatar}>
                            <Text style={styles.textoBotaoCandidatar}>Candidatar-se</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }

}

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
    }
})