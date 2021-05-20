import styled from 'styled-components';

export const Background = styled.View`
flex: 1;
background-color: #131313;
`;

export const Container = styled.View`
margin-left: 15px;
margin-bottom: 25px;
`;

export const NomeUsuario = styled.Text`
font-size: 19px;
color: #FFF;
font-style: italic;
text-transform: capitalize;
`;

export const SaldoUsuario = styled.Text`
margin-top: 5px;
font-size: 30px;
color: #FFF;
font-weight: bold;
`;

export const Title = styled.Text`
color: #00b94a;
margin-bottom: 10px;
margin-left: 5px;
font-size: 15px;
`;

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
padding-top: 15px;
background-color: #FFF;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
margin-left: 8px;
margin-right: 8px;
`;
 
export const Area = styled.View`
flex-direction: row;
align-items: baseline;
margin-left: 15px;
`;




