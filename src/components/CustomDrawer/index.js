import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import {AuthContext} from '../../contexts/auth';

export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);
 
    return (
    <DrawerContentScrollView {...props} >
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
            <Image
            source={require('../../img/Logo.png')}
            style={{width: 85, height: 85}}
            resizeMode="contain"
            />

            <Text style={{color: '#FFF', fontSize: 18, marginTop: 5}}>
                Bem Vindo(a)
            </Text>

            <Text style={{
                color: '#FFF', 
                fontSize: 17, 
                fontWeight: 'bold', 
                paddingBottom: 25,
                textTransform: 'capitalize'
                }}>
                {user && user.nome}
            </Text>

        </View>

        <DrawerItemList {...props} />

        <DrawerItem
            {...props}
            label="Sair"
            inactiveBackgroundColor="#c62c36"
            onPress={() => signOut()}   
        />

    </DrawerContentScrollView>
  );
}