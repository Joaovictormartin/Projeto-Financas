import styled from 'styled-components';

export const Container = styled.View`
flex: 1;
background-color: #131313;
align-items: center;
`;

export const Nome = styled.Text`
text-align: center;
text-transform: capitalize;
font-size: 28px;
margin-top: 50px;
margin-bottom: 25px;
color: #FFF;
`;

export const NewLink = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #00b94a;
width: 80%;
height: 45px;
border-radius: 10px;
margin-bottom: 10px;
`;

export const NewText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight: bold;
`;

export const Logout = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #c62c36;
width: 80%;
height: 45px;
border-radius: 10px;
margin-bottom: 10px;
`;

export const LogoutText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight: bold;
`;
