import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Evento from './Evento_Show'
import Editar_Evento from './Evento_Update'
import Adicionar_Evento from './Evento_New'
import EventosList from './Eventos_List'
import EspecialidadesList from './Especialidades_List'
import Adicionar_Especialidade from './Especialidade_New'
import UserNew from './User_New'

class Home extends Component {

    static navigationOptions = {
        title: 'Home',
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
    }

    abrirTelaCadastro() {
        this.props.navigation.navigate('Adicionar_Usuario')
    }

    abrirTelaLogin() {
        // por enquanto que o login não está implementado
        // navega direto pra tela de eventos
        //this.props.navigation.navigate('Login')
        this.props.navigation.navigate('EventosList')
    }

    render(){
        return(
            <View style={styles.tela}>
                <View style={styles.container1}>
                    <Text style={styles.textoGrande}>Simple Events</Text>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity
                        onPress={() => this.abrirTelaCadastro()}>
                        <View style={styles.botaoCadastro}>
                            <Text style={styles.textoBotaoCadastro}>Cadastro</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.abrirTelaLogin()}>
                        <View style={styles.botaoLogin}>
                            <Text style={styles.textoBotaoLogin}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const AppNavigator = createStackNavigator(
    {
        Home: {screen: Home},
        EventosList: {screen: EventosList},
        Evento: {screen: Evento},
        Editar_Evento: {screen: Editar_Evento},
        Adicionar_Evento: {screen: Adicionar_Evento},
        Adicionar_Usuario: {screen: UserNew},
        EspecialidadesList: {screen: EspecialidadesList},
        Adicionar_Especialidade: {screen: Adicionar_Especialidade},
    },
    {
        initialRouteName: 'Home'
    }
  )
  
const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
    render(){
      return(
        <AppContainer></AppContainer>
      )
    }
  }

const styles = StyleSheet.create({
    tela: {
        height: '100%',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoGrande: {
        fontWeight: 'bold',
        color: '#309ebf',
        fontSize: 40,
    },
    container2: {
        flex: 1,
        paddingHorizontal: 60,
    },
    botaoCadastro: {
        borderWidth: 1,
        marginTop: 80,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#309ebf',
    },
    textoBotaoCadastro: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#309ebf',
    },
    botaoLogin: {
        borderWidth: 1,
        marginTop: 40,
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
    }
})