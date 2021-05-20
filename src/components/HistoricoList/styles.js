import styled from 'styled-components';

export const Container = styled.View`
margin-bottom: 5px;
padding: 10px;
box-shadow: 2px 2px rgba(0,0,0, 0.40);
background-color: rgba(0,0,0, 0.02);
`;

export const Tipo = styled.View`
flex-direction: row;
`;

export const IconView = styled.View`
flex-direction: row;
background-color: ${props => props.tipo === 'despesa' ? '#C62c36' : '#049301'};
padding-top: 3px;
padding-bottom: 3px;
padding-left: 8px;
padding-right: 8px;
border-radius: 7px;
`;

export const TipoTexto = styled.Text`
color: #FFF;
font-style: italic;
font-size: 18px;
`;

export const ValorTexto = styled.Text`
color: #222;
font-size: 22px;
font-weight: bold;
`;
