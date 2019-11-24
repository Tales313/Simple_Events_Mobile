import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    Dimensions, 
    Button,
    ToastAndroid,
    TouchableHighlight
} from 'react-native'
import DatePicker from 'react-native-datepicker'

export default class EventoNew extends Component {

    state = {
        nome: '',
        descricao: '',
        data: '',
        local: ''
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

    criarEvento() {
        ToastAndroid.show('Evento Criado!', ToastAndroid.SHORT);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.inputBloco}>
                    <Text
                        style={{fontSize: 45}}
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
                            format="DD-MM-YYYY"
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
                    <Button title="Criar" onPress={this.criarEvento} color="#309ebf"/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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