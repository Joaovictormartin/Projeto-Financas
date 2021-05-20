import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {Conteiner, BtnMenu } from './styles';

export default function Header() {

    const nav = useNavigation();

    return (
        <Conteiner>
            <BtnMenu onPress={ () => nav.toggleDrawer()} >
                <Icon name="menu" size={30} color="#FFF" />
            </BtnMenu>
        </Conteiner>
    );
}