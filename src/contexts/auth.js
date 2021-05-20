import React, {  useState, createContext, useEffect  } from 'react';
import AsyncStorage from '@react-native-community/async-storage'

import firebase from  '../services/firebaseConnection';

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setloadingAuth] = useState(false);
 
    useEffect( () => {  //Verifica se tem ususario logado e carrega no setUser
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    },[]);

    async function singUp(email, password, nome){    //Cadastrando usuario
        
        setloadingAuth(true);
        
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (value) => {
            let uid = value.user.uid
            await firebase.database().ref('Users').child(uid).set({
                nome: nome,
                saldo: 0
            }).then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }
                setUser(data);
                storageUser(data);
                setloadingAuth(false);
            });
        }).catch( (error) => {
            //alert(error.code)
            if(error.code === 'auth/email-already-exists'){
                alert('O e-mail fornecido já está em uso por outro usuário. Cada usuário precisa ter um e-mail exclusivo.')
                setloadingAuth(false);
                return;
            }
            if(error.code === 'auth/invalid-email'){
                alert('Email invalido');
                setloadingAuth(false);
                return;
            }
            if(error.code === 'auth/weak-password'){
                alert('Senha deve conter pelo menos 6 caracteres');
                setloadingAuth(false);
                return;
            }
        })
    }

    async function signIn(email, password){    //Função para Logar os usuarios cadastrados
        
        setloadingAuth(true);
        
        await firebase.auth().signInWithEmailAndPassword(email, password). then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('Users').child(uid).once('value').then( (snapshort) => {
                let data = {
                    uid: uid,
                    nome: snapshort.val().nome,
                    email: value.user.email
                }
                setUser(data);
                storageUser(data);
                setloadingAuth(false);
            })
        }).catch( (error) => {
            setloadingAuth(false);
            alert('Email ou senha invalido!');          
        }); 
    }

    async function signOut() {  //Função para deslogar o usuario do App
        await firebase.auth().signOut;
        await AsyncStorage.clear().then( () => {
            setUser(null);
        })
    }

    async function storageUser(data){   //Função para armazenar os dados do usuario
        await  AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }


    return(
        <AuthContext.Provider value={{ 
            signed: !!user,     //se tiver um Usuario Logado essa variavel vai ser True
            user,               //Possui os dados do Usuario
            loading,            //Variavel de Load da tela Home
            loadingAuth,        //Variavel de Load da tela de Login
            singUp,             //Função para cadastrar um novo Usuario
            signIn,             //Função para Logar no App
            signOut             //Função para Deslogar no App
            }}>

            {children}
            
        </AuthContext.Provider>
    );
}

export default AuthProvider;