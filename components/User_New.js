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

export default class UserNew extends Component {

    static navigationOptions = {
        title: 'Novo Usuário',
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
            username: '',
            telefone: '',
            data_nascimento: '',
            email: '',
            password: '',
        }
    }

    alterarNome = nome => {
        this.setState({nome})
    }

    alterarUsername = username => {
        this.setState({username})
    }

    alterarTelefone = telefone => {
        this.setState({telefone})
    }

    alterarDataNascimento = data_nascimento => {
        this.setState({data_nascimento})
    }
    
    alterarEmail = email => {
        this.setState({email})
    }

    alterarPassword = password => {
        this.setState({password})
    }
    
    salvarToken = async (token) => {
        try {
          await AsyncStorage.setItem('@token', token)
        } catch (e) {
          console.log(e)
        }
    }

    criarUser = async () => {
        let nome = this.state.nome
        let username = this.state.username
        let telefone = this.state.telefone
        let data_nascimento = this.state.data_nascimento
        let email = this.state.email
        let password = this.state.password

        let link = 'https://s-events-api.herokuapp.com/api/users/'
        let cabecalho = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'nome': nome,
                'username': username,
                'telefone': telefone,
                'data_nascimento': data_nascimento,
                'email': email,
                'password': password
            })
        }

        let response = await fetch(link, cabecalho)
        let usuario =  await response.json()
        if(response.status == 201) {
            ToastAndroid.show('Usuário Criado!', ToastAndroid.SHORT)
            link = 'https://s-events-api.herokuapp.com/api/api-token-auth/'
            cabecalho = {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password,
                })
            }
            response = await fetch(link, cabecalho)
            let json = await response.json()
            this.salvarToken(json.token)

            this.props.navigation.navigate('EventosList', {
                usuario_nome: usuario.nome,
                //usuario_id: usuario.id
            })
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
            console.log(response.status)
        }

    }

    render(){
        return(
            <View style={{height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.inputBloco}>
                    <Text
                        style={{fontSize: 45}}
                    >Novo Usuário</Text>
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
                        <Text style={styles.label} >Username</Text>
                        <TextInput style={styles.inputText} value={this.state.username} 
                            onChangeText={this.alterarUsername} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Telefone</Text>
                        <TextInput style={styles.inputText} value={this.state.telefone} 
                            onChangeText={this.alterarTelefone} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Data de nascimento</Text>
                        <DatePicker 
                            style={styles.inputText}
                            date={this.state.data_nascimento}
                            mode="date"
                            format="YYYY-MM-DD"
                            onDateChange={this.alterarDataNascimento}
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
                        <Text style={styles.label} >Email</Text>
                        <TextInput style={styles.inputText} value={this.state.email}
                            onChangeText={this.alterarEmail} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <View>
                        <Text style={styles.label} >Password</Text>
                        <TextInput style={styles.inputText} value={this.state.password} 
                            onChangeText={this.alterarPassword} />
                    </View>
                </View>
                <View style={styles.inputBloco}>
                    <Button title="Criar" onPress={this.criarUser} color="#309ebf"/>
                </View>
            </View>
            </View>
        )
    }

}

//const AppNavigator = createStackNavigator(
//    {
//        EventosList: {screen: EventosList},
//       Evento: {screen: Evento},
//        Editar_Evento: {screen: Editar_Evento},
//        Adicionar_Evento: {screen: Adicionar_Evento},
//        Adicionar_Usuario: {screen: UserNew},
//        EspecialidadesList: {screen: EspecialidadesList},
//        Adicionar_Especialidade: {screen: Adicionar_Especialidade},
//    },
//    {
//        initialRouteName: 'Adicionar_Usuario'
//    }
//  )
  
//const AppContainer = createAppContainer(AppNavigator)

//export default class App extends Component {
//    render(){
//      return(
//        <AppContainer></AppContainer>
//      )
//    }
//  }


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: (Dimensions.get('window').height / 100) * 92,
        paddingHorizontal: 40,
        //paddingVertical: 30,
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