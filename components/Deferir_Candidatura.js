import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native'
import { RadioButton } from 'react-native-paper'

export default class DeferirCandidatura extends Component {

	static navigationOptions = {
        title: 'Deferir',
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
			id_vaga: this.props.navigation.getParam('id_vaga'),
			candidaturas: [],
			checked: '',
		}

		this.getCandidaturasFromApi()

	}

	async getCandidaturasFromApi() {
		let url = 'https://s-events-api.herokuapp.com/api/candidatosvaga/'
		let response = await fetch(url)
		let todas_candidaturas = await response.json()

		let candidaturas_da_vaga = []
		for (let candidatura of todas_candidaturas)
			if (candidatura.vaga == this.state.id_vaga)
				candidaturas_da_vaga.push(candidatura)
		
		this.setState({candidaturas: candidaturas_da_vaga})
	}

	render() {
		let checked = this.state.checked

		return this.state.candidaturas.map(candidatura => {
			return (
				<View style={styles.vaga}>
                    <RadioButton 
                        value={candidatura.candidato}
                        status={checked === candidatura.candidato ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: candidatura.candidato })} }
                    />
                 	<Text>{candidatura.candidato}</Text>
                </View>
			)
		})
	}

}

const styles = StyleSheet.create({
	vaga: {
    	//borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
})