import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import {AuthContext} from '../../contexts/auth';
import Header from '../../components/Header';

export default function Profile() {

    const { user, signOut } = useContext(AuthContext);
    
    const nav = useNavigation();

    return (
        <Container>
            <Header/>
            <Nome> {user && user.nome} </Nome>

            <NewLink onPress={ () => nav.navigate('Registrar')}>
                <NewText> Registrar gastos </NewText>
            </NewLink>

            <Logout onPress={ () => signOut()}>
                <LogoutText> Sair </LogoutText>
            </Logout>
        </Container>
    );
}