import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    ToastAndroid,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

export default class EspecialidadeNew extends Component {

    static navigationOptions = {
        title: 'Nova Especialidade',
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
        }
    }

    alterarNome = nome => {
        this.setState({nome})
    }

    alterarDescricao = descricao => {
        this.setState({descricao})
    }

    getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('@token')
          return value
        } catch(e) {
          console.log(e)
        }
      }

    criarEspecialidade = async () => {
        let nome = this.state.nome
        let descricao = this.state.descricao

        let token = await this.getToken()

        const link = 'https://s-events-api.herokuapp.com/api/especialidades/'
        const cabecalho = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({
                'nome': nome,
                'descricao': descricao,
            })
        }

        let response = await fetch(link, cabecalho)
        if(response.status == 201) {
            ToastAndroid.show('Especialidade Criada!', ToastAndroid.SHORT)
            const refreshFunction = this.props.navigation.getParam('refresh')
            refreshFunction() // atualizando a listagem de especialidades
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
                    >Nova Especialidade</Text>
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
                <TouchableOpacity
                        onPress={() => this.criarEspecialidade()}
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
        height: (Dimensions.get('window').height / 100) * 92,
        paddingHorizontal: 40,
        paddingVertical: 70,
    },
    textoGrande: {
        fontWeight: 'bold',
        color: '#309ebf',
        fontSize: 30,
    },
    inputBloco: {
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