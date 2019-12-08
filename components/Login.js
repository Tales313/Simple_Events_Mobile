import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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

    login = () => {
        // TODO
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