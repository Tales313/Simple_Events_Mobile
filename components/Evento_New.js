import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    ToastAndroid,
    ScrollView,
    CheckBox,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

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
            refresh: 0,
            nome: '',
            descricao: '',
            data: '',
            local: '',
            especialidades: [],
            vagas: [],
        }

        this.getEspecialidadesFromApi()
    }

    getEspecialidadesFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/especialidades/'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({especialidades: res})
            for (let e in res)
                this.state.vagas.push(0)
            this.refresh()
        }).catch(error => {
            console.error(error)
        })
    }

    renderCheckBoxes = () => {
        return this.state.especialidades.map((e, i) => {
            return (
                <View key={e.nome} style={styles.especialidade}>
                    <Text style={styles.nomeEspecialidade}>{e.nome} </Text>
                    <TouchableOpacity
                        onPress={() => this.removeVaga(i)}
                    >
                        <Icon name="minus" size={25} color="red" />
                    </TouchableOpacity>
                    <Text>{this.state.vagas[i]}</Text>
                    <TouchableOpacity
                        onPress={() => this.addVaga(i)}
                    >
                        <Icon name="plus" size={25} color="green" />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    refresh = () => {
        this.setState({refresh: this.state.refresh+1})
    }

    addVaga = indice => {
        this.state.vagas[indice] += 1
        this.refresh()
    }

    removeVaga = indice => {
        if((this.state.vagas[indice] - 1) >= 0) {
            this.state.vagas[indice] -= 1
            this.refresh()
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

    criarEvento = async () => {
        let nome = this.state.nome
        let descricao = this.state.descricao
        let data = this.state.data
        let local = this.state.local
        let vagas = []
        this.state.vagas.forEach((qtd_vagas, index) => {
            if (qtd_vagas > 0)
                vagas.push([this.state.especialidades[index].nome, qtd_vagas])
        })

        let token = await this.getToken()

        const link = 'https://s-events-api.herokuapp.com/api/eventos/'
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
                'data': data,
                'local': local,
                'vagas': vagas,
            })
        }

        let response = await fetch(link, cabecalho)
        console.log(response)
        let evento =  await response.json()
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
            <ScrollView>
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
                    <View style={styles.headerVagas}>
                        <Text style={styles.vagash3}>Vagas</Text>
                    </View>
                    <View style={styles.especialidades}>
                        {this.renderCheckBoxes()}
                    </View>
                    <View style={styles.inputBloco}>
                        <TouchableOpacity
                            onPress={() => this.criarEvento()}
                        >
                        <View style={styles.botaoSubmit}>
                            <Text style={styles.textoBotaoSubmit}>Criar</Text>
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
    headerVagas: {
        //borderWidth: 1,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    vagash3: {
        fontSize: 25,
    },
    especialidades: {
        //borderWidth: 1,
        paddingHorizontal: 15,
    },
    especialidade: {
        //borderWidth: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    nomeEspecialidade: {
        width: 100,
    },
    inputQtdVagas: {
        borderBottomWidth: 1,
        borderBottomColor: '#309ebf',
        height: 40,
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