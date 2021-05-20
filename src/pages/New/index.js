import React,{ useState, useContext } from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'

import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import TelaPicker from '../../components/Picker';
import {AuthContext} from '../../contexts/auth';
import {Background, Input, SubmitBtn, SubmitText} from './styles';

export default function New() {

  const nav = useNavigation();

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const {user: usuario} = useContext(AuthContext);

  function  handleSubmit() {
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || tipo === null){
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados!',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd() {
    let uid = usuario.uid   //pegando o id do usuario no contexto
    let key = await firebase.database().ref('Historico').child(uid).push().key; //Gerando uma chave dentro da Tabela Hidstórico 
    
    await firebase.database().ref('Historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor), 
      date: format(new Date(), 'dd/MM/yy')
    });

    //Atualizando o saldo
    let user = firebase.database().ref('Users').child(uid);
    await user.once('value').then( (snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo)
      
      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);

    });
    setValor('');
    Keyboard.dismiss();
    nav.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
      <Background>
        <Header/>
        <SafeAreaView style={{alignItems: 'center'}}>

          <Input
          placeholder="Valor desejado"
          keyboardType="numeric"
          returnType="next"
          onSumitEditing={ () => Keyboard.dismiss()}
          onChangeText={ (text) => setValor(text)}
          value={valor}
          />

         <TelaPicker onChange={setTipo} tipo={tipo}/>

          <SubmitBtn onPress={ () => handleSubmit()}>
            <SubmitText>
              Registrar
            </SubmitText>
          </SubmitBtn>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
    );
}