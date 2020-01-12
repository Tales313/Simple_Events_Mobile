import React, { Component } from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    ToastAndroid,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

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
			qtd_vagas: this.props.navigation.getParam('qtd_vagas'),
			especialidade: this.props.navigation.getParam('especialidade'),
			candidaturas: [],
		}

		this.ids_deferidos = []

		this.getCandidaturasFromApi()

	}

	getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('@token')
          return value
        } catch(e) {
          console.log(e)
        }
    }

	async getCandidaturasFromApi() {
		let url = 'https://s-events-api.herokuapp.com/api/vagas/' + this.state.id_vaga + '/'
		let response = await fetch(url)
		let vaga = await response.json()

		let candidaturas_da_vaga = []
		for (let candidatura of vaga.candidatos_vaga)
				candidaturas_da_vaga.push(candidatura)

		this.setState({candidaturas: candidaturas_da_vaga})
	}

	deferir = async (candidatura) => {
		let state_vaga
		if(candidatura.state_vaga == 1) { // se for deferido
			state_vaga = 2
		} else { // se nao for deferido
			state_vaga = 1
		}

		if(state_vaga == 1) { //contar se vai passar da qtd_vagas
			let qtd_deferidos = 0
			this.state.candidaturas.forEach(c => {
				if(c.state_vaga == 1)
					qtd_deferidos += 1
			})
			console.log('qtd_deferidos: ' + qtd_deferidos)
			console.log('qtd_vaga: ' + this.state.qtd_vagas)
			if((qtd_deferidos + 1) > this.state.qtd_vagas) {
				let txt_deferido = qtd_deferidos == 1 ? 'deferido' : 'deferidos'
				alert('Já existem ' + qtd_deferidos + ' ' + txt_deferido + ' para essa vaga!')
				return
			}
		}

		let token = await this.getToken()

		let url = 'https://s-events-api.herokuapp.com/api/candidatosvaga/' + candidatura.id + '/'
		let cabecalho = {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token ' + token,
            },
            body: JSON.stringify({
                'state_vaga': state_vaga
            })
        }

        let response = await fetch(url, cabecalho)
        if(response.status == 200) {
        	let msg = state_vaga == 1 ? 'Deferido!' : 'Indeferido!'
            ToastAndroid.show(msg, ToastAndroid.SHORT)
            this.props.navigation.goBack()
        }else {
            ToastAndroid.show('Algo deu errado.', ToastAndroid.SHORT)
        }
	}

	renderizarBotao = (candidatura) => {
		if(candidatura.state_vaga == 1) { //deferido
			return (
				<TouchableOpacity
					onPress={() => this.deferir(candidatura)}
				>
					<View style={styles.botaoIndeferir}>
						<Text style={styles.textoBotaoIndeferir}>Indeferir</Text>
					</View>
				</TouchableOpacity>///
			)
		} else { /// indeferido ou nao avaliado
			return (
				<TouchableOpacity
					onPress={() => this.deferir(candidatura)}
				>
					<View style={styles.botaoDeferir}>
						<Text style={styles.textoBotaoDeferir}>Deferir</Text>
					</View>
				</TouchableOpacity>
			)
		}
	}
//
	renderChecks = () => {
		let checks = this.state.checks

		return this.state.candidaturas.map(candidatura => {
			return (
				<View style={styles.vaga}>
					<Text>{candidatura.candidato}</Text>
					{this.renderizarBotao(candidatura)}
                </View>
			)
		})
	}

	renderTextoVaga = () => {
		let txt_vaga = this.state.qtd_vagas == 1 ? 'vaga' : 'vagas'
		return this.state.qtd_vagas + ' ' + txt_vaga + ' para essa especialidade'
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.viewTextoVaga}>
					<Text style={styles.textoVaga}>
						{this.renderTextoVaga()}
					</Text>
				</View>
				{this.renderChecks()}
			</ScrollView>
		)
	}

}
///
const styles = StyleSheet.create({
	container: {
        //height: (Dimensions.get('window').height / 100) * 92,
        paddingHorizontal: 40,
        paddingVertical: 30,
    },
    viewTextoVaga: {
    	paddingVertical: 15,
    },
    textoVaga: {
    	fontSize: 20,
    	textAlign: 'center',
    },
	vaga: {
    	//borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    botaoDeferir: {
        backgroundColor: '#309ebf',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 25,
    },
    textoBotaoDeferir: {
        fontWeight: 'bold',
        color: '#fff',
    },
    botaoIndeferir: {
		backgroundColor: '#ff0000',
		paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 25,
    },
    textoBotaoIndeferir: {
    	fontWeight: 'bold',
        color: '#fff',
    }
})