import React, { useState, useContext } from 'react';
import {Platform, ActivityIndicator} from 'react-native';

import {
  Background, 
  Container, 
  AreaInput, 
  Input, 
  SubmitButton,
  SubmitText,
} from '../Signin/styles';
import {AuthContext} from '../../contexts/auth';

export default function SingUp() {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {singUp, loadingAuth} = useContext(AuthContext);

  function handleSingUp() {
    singUp(email, password, nome);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? `padding` : ''} enabled> 
        <AreaInput>
          <Input 
          placeholder="Nome"
          autoCorrect={false}
          autoCapitalize="none"
          value={nome}
          onChangeText={ (textodigitado) => setNome(textodigitado)}
          />
        </AreaInput>

        <AreaInput>
          <Input 
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (textodigitado) => setEmail(textodigitado)}
          />
        </AreaInput>

        <AreaInput>
          <Input 
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ (textodigitado) => setPassword(textodigitado)}
          secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={ handleSingUp }>
        {
            loadingAuth ?
            (
              <ActivityIndicator
              size={20}
              color="#FFF"
              />
            )
            :
            (
              <SubmitText> Cadastrar </SubmitText>
            )
          }           
        </SubmitButton>

      </Container>
    </Background>
  );
}