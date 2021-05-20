import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform, Keyboard, ActivityIndicator } from 'react-native';

import {
  Background, 
  Container, 
  Logo, 
  AreaInput, 
  Input, 
  SubmitButton,
  SubmitText,
  Link,
  LinkText} from './styles';
import {AuthContext} from '../../contexts/auth';

export default function SingIn() {
  
  const nav = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, loadingAuth} = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
    Keyboard.dismiss();
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? `padding` : ''} enabled> 
        <Logo source={require('../../img/Logo.png')} />

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

        <SubmitButton onPress={ handleLogin }>
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
              <SubmitText> Acessar </SubmitText>
            )
          }  
        </SubmitButton>

        <Link onPress={ () => nav.navigate('SignUp')}>
          <LinkText> Criar uma conta! </LinkText>
        </Link>

      </Container>
    </Background>
  );
}