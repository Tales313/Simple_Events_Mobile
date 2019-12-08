import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    ToastAndroid,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class EventoNew extends Component {

    static navigationOptions = {
        title: 'Novo Evento',
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
            nome: '',
            descricao: '',
            data: '',
            local: '',
            usuario_id: this.props.navigation.getParam('usuario_id')
        }

        console.log('construtor evento new: ' + this.props.navigation.getParam('usuario_id'))
    }

    alterarNome = nome => {
        this.setState({nome})
    }

    alterarDescricao = descricao => {
        this.setState({descricao})
    }

    alterarData = data => {
        this.setState({data})
    }

    alterarLocal = local => {
        this.setState({local})
    }

    criarEvento = async () => {
        let nome = this.state.nome
        let descricao = this.state.descricao
        let data = this.state.data
        let local = this.state.local
        let usuario_id = this.state.usuario_id
        console.log('criar evento usuario_id: ' + usuario_id)

        const link = 'https://s-events-api.herokuapp.com/api/eventos/'
        const cabecalho = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'nome': nome,
                'descricao': descricao,
                'data': data,
                'local': local,
                'finalizado': false,
                'owner': 1
            })
        }

        let response = await fetch(link, cabecalho)
        console.log('response: ' + response)
        let evento =  await response.json()
        console.log('evento: ' + evento)
        if(response.status == 201) {
            ToastAndroid.show('Evento Criado!', ToastAndroid.SHORT)
            const refreshFunction = this.props.navigation.getParam('refresh')
            refreshFunction() // atualizando a listagem de eventos
            this.props.navigation.goBack()
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }

    }

    render(){
        return(
            <View style={{height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.inputBloco}>
                    <Text
                        style={styles.textoGrande}
                    >Novo Evento</Text>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Nome</Text>
                        <TextInput style={styles.inputText} value={this.state.nome} 
                            onChangeText={this.alterarNome} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Descrição</Text>
                        <TextInput style={styles.inputText} value={this.state.descricao} 
                            onChangeText={this.alterarDescricao} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Data</Text>
                        <DatePicker 
                            style={styles.inputText}
                            date={this.state.data}
                            mode="date"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            onDateChange={this.alterarData}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                        />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Endereço</Text>
                        <TextInput style={styles.inputText} value={this.state.local}
                            onChangeText={this.alterarLocal} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <TouchableOpacity
                        onPress={() => this.abrirTelaLogin()}
                    >
                        <View style={styles.botaoSubmit}>
                            <Text style={styles.textoBotaoSubmit}>Criar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: (Dimensions.get('window').height / 100) * 92,
        paddingHorizontal: 40,
        paddingVertical: 70,
    },
    textoGrande: {
        fontWeight: 'bold',
        color: '#309ebf',
        fontSize: 40,
    },
    inputBloco: {
        //borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#5c5c5c',
        fontSize: 18,
        paddingBottom: 15,
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        width: (Dimensions.get('window').width / 3) * 2,
        height: 50,
        borderColor: '#309ebf',
    },
    botaoSubmit: {
        marginTop: 40,
        backgroundColor: '#309ebf',
        paddingHorizontal: 80,
        paddingVertical: 8,
        borderRadius: 25,
    },
    textoBotaoSubmit: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})