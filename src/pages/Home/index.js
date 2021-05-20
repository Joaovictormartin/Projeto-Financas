import React, { useContext, useState, useEffect } from 'react';
import {Alert, ActivityIndicator, TouchableOpacity, Touchable, Platform} from 'react-native';
import { format, isPast, set } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {AuthContext} from '../../contexts/auth';
import {Background, Container, NomeUsuario, SaldoUsuario, Title, List, Area} from './styles';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import DatePicker from '../../components/DatePicker';

export default function Home(){

  const {user} = useContext(AuthContext);
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [loadingSaldo, setLoadingSaldo] = useState(false);
  const [newDate, setNewDate] = useState(new Date);
  const [show, setShow] = useState(false);

  useEffect(() => {

    async function loadList() {
      
      setLoadingSaldo(true);

      await firebase.database().ref('Users').child(user.uid).on('value', (snapshot) => {
        setSaldo(parseFloat(snapshot.val().saldo));
      });

      setLoadingSaldo(false);

      await firebase.database().ref('Historico').child(user.uid)    //acessa o BD com o id do Usua
      .orderByChild('date')                                         //Ordena pelo campo Date
      .equalTo(format(newDate, 'dd/MM/yy'))                        //Filtra só a data do dia
      .limitToLast(10)                                              //Limita só os 10 primeiros
      .on('value', (snapshot) => {
        setHistorico('')

        snapshot.forEach( (childItem) => {
          let List ={
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor.toFixed(2),
            date: childItem.val().date,
          };
          setHistorico(oldArray => [...oldArray, List].reverse());
        })
      })

    }
    loadList();
  },[newDate])

  function handleDelete(data) {
    if(isPast(new Date(data.date))){  //Verifica se a data já passou
      alert("Você não pode excluir um registro antigo!");
    }

    Alert.alert(
      'Cuidado Atenção!',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSucess(data)
        }
      ]
    )
  }

  async function handleDeleteSucess(data){

    await firebase.database().ref('Historico').child(user.uid).child(data.key).remove()
    .then( async (value) => {
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? 
      saldoAtual += parseFloat(data.valor) : 
      saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('Users').child(user.uid).child('saldo').set(saldoAtual);
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  function handleShowPicker() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date)
  }

  return (
    <Background>
      <Header/>
      <Container>
        <NomeUsuario>{user && user.nome}</NomeUsuario>
        {
          loadingSaldo ?
          (
            <ActivityIndicator
              size={20}
              color="#FFF"
            />
          )
          :
          (
            <SaldoUsuario>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</SaldoUsuario>
          )
        } 
      </Container>

      <Area>
        <TouchableOpacity 
        style={{flexDirection: 'row', alignItems: 'baseline'}}
        onPress={handleShowPicker}
        >
          <Icon
          name="event"
          color="#FFF"
          size={30}
          />
          <Title>Últimas movimentações</Title>
        </TouchableOpacity>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={ ({item}) => (<HistoricoList data={item} deleteItem={handleDelete} />) }
      />

      {show && (
        <DatePicker
        onClose={handleClose}
        date={newDate}
        onChange={onChange}
        />
      )}

    </Background>
  );
}