import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions 
} from 'react-native'

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
            nome: '',
            descricao: '',
            data: '',
            local: ''
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

    render(){
        return(
            <View style={{height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.blocoNome}>
                        <Text style={styles.nome}>{this.props.navigation.getParam('nome')}</Text>
                    </View>
                    <View style={styles.blocoDescricao}>
                        <Text style={styles.descricao}>{this.props.navigation.getParam('descricao')}</Text>
                    </View>
                    <View style={styles.blocoLocalData}>
                        <Text style={styles.dataLocal}>{this.props.navigation.getParam('data')}</Text>
                        <Text style={styles.dataLocal}>{this.props.navigation.getParam('local')}</Text>
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
        paddingVertical: 30,
    },
    blocoNome: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nome: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    blocoDescricao: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descricao: {
        fontSize: 15,
        color: 'grey',
        textAlign: 'center',
    },
    blocoLocalData: {
        flex: 7,
    },
    dataLocal: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})