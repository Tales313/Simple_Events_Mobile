import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    Button,
    ToastAndroid,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage'

export default class EventoUpdate extends Component {

    static navigationOptions = {
        title: 'Atualizar Evento',
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
            nome: this.props.navigation.getParam('nome'),
            descricao: this.props.navigation.getParam('descricao'),
            data: this.props.navigation.getParam('data'),
            local: this.props.navigation.getParam('local'),
            owner: this.props.navigation.getParam('owner')
        }
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

    getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('@token')
          return value
        } catch(e) {
          console.log(e)
        }
      }

    atualizarEvento = async (id) => {
        let nome = this.state.nome
        let descricao = this.state.descricao
        let data = this.state.data
        let local = this.state.local
        //let owner = this.state.owner

        let token = await this.getToken()

        const link = 'https://s-events-api.herokuapp.com/api/eventos/' + id + '/'
        const cabecalho = {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({
                'nome': nome,
                'descricao': descricao,
                'data': data,
                'local': local,
                //'owner': owner
            })
        }

        let response = await fetch(link, cabecalho)
        if(response.status >= 200 && response.status <= 204) {
            ToastAndroid.show('Evento Atualizado!', ToastAndroid.SHORT)
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
                        style={{fontSize: 45}}
                    >Editar Evento</Text>
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
                    <Button title="Atualizar" 
                        onPress={() => this.atualizarEvento(this.props.navigation.getParam('id'))} color="#309ebf"/>
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
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: "#309ebf",
        width: 50,
        height: 20,
        color: "#fff",
    }
})