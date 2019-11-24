import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native'
import Menu from './TopBar'

export default class EventosList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getEventosFromApi()
    }

    getEventosFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/users/'
        //const url = 'http://localhost:8000/eventos'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({data: res})
        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <ScrollView style={{height: '100%'}}>
                <Menu/>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item.nome}
                        renderItem={({item}) => (
                            <View style={styles.evento}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.descricao}>{item.data_nascimento}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: (Dimensions.get('window').height / 100) * 92,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    nome: {
        fontSize: 18,
    },
    descricao: {
        fontSize: 12,
        color: 'grey'
    },
    evento: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
    }
})
