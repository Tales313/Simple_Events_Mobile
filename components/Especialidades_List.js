import React, { Component } from 'react'
import { ScrollView, FlatList, StyleSheet, Text, View } from 'react-native'

export default class EspecialidadesList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getEspecialidadesFromApi()
    }

    getEspecialidadesFromApi() {
        const url = 'https://s-events-api.herokuapp.com/api/users/'
        //const url = 'http://localhost:8000/especialidades'
        fetch(url).then(res => res.json()).then(res => {
            this.setState({data: res})
        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
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
        flex: 1,
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
