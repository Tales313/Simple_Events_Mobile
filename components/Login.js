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

export default class Login extends Component {

    static navigationOptions = {
        title: 'Login',
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
            username: '',
            senha: '',
        }
    }

    alterarUsername = username => {
        this.setState({username})
    }

    alterarSenha = senha => {
        this.setState({senha})
    }

    salvarToken = async (token) => {
        try {
          await AsyncStorage.setItem('@token', token)
        } catch (e) {
          console.log(e)
        }
    }

    salvarUserName = async (username) => {
        try {
            await AsyncStorage.setItem('@username', username)
        } catch (e) {
            console.log(e)
        }   
    }

    login = async () => {
        let username = this.state.username
        let senha = this.state.senha

        const link = 'https://s-events-api.herokuapp.com/api/api-token-auth/'
        const cabecalho = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': senha,
            })
        }

        let response = await fetch(link, cabecalho)
        let json = await response.json()
        this.salvarToken(json.token)
        this.salvarUserName(username)
        
        if(response.status == 200) {
            this.props.navigation.navigate('EventosList')
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }

    }

    render(){
        return(
            <View style={styles.tela}>
                <View style={styles.container1}>
                    <Text style={styles.textoGrande}>Login</Text>
                </View>
                <View style={styles.container2}>
                    <View style={styles.usernameBloco}>
                        <View>
                            <Text style={styles.label} >Usuário</Text>
                            <TextInput style={styles.inputText} value={this.state.username} 
                                onChangeText={this.alterarUsername} />
                        </View>
                    </View>
                    <View style={styles.senhaBloco}>
                        <View>
                            <Text style={styles.label} >Senha</Text>
                            <TextInput style={styles.inputText} value={this.state.senha} 
                                onChangeText={this.alterarSenha} />
                        </View>
                    </View>
                    <View style={styles.loginBloco}>
                        <TouchableOpacity
                            onPress={() => this.login()}>
                            <View style={styles.botaoLogin}>
                                <Text style={styles.textoBotaoLogin}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    tela: {
        height: '100%',
    },
    container1: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoGrande: {
        fontWeight: 'bold',
        color: '#309ebf',
        fontSize: 40,
    },
    container2: {
        flex: 6,
        paddingHorizontal: 60,
    },
    usernameBloco: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    senhaBloco: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center'
    },
    label: {
        color: '#309ebf',
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
    loginBloco: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    botaoLogin: {
        borderWidth: 1,
        backgroundColor: '#309ebf',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#309ebf',
    },
    textoBotaoLogin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
})