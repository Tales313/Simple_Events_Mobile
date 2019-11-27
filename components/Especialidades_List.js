import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native'

export default class EspecialidadesList extends Component {

    static navigationOptions = {
        title: 'Especialidades',
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
            especialidades: [],
        }
    }

    componentDidMount() {
        this.getEspecialidadesFromApi()
    }

    getEspecialidadesFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/especialidades/'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({especialidades: res})
        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <ScrollView style={{height: '100%'}}>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.especialidades}
                        keyExtractor={item => item.nome}
                        renderItem={({item}) => (
                            <View style={{paddingBottom: 20, paddingLeft: 10}}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.descricao}>{item.email}</Text>
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
        paddingHorizontal: 5,
    },
    nome: {
        fontSize: 18,
    },
    descricao: {
        fontSize: 12,
        color: 'grey'
    }
})
