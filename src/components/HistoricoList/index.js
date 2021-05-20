import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Tipo, IconView, TipoTexto, ValorTexto } from './styles';

export default function HistoricoList({data, deleteItem}) {
 return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
        <Container>
            <Tipo>
                <IconView tipo={data.tipo}>
                    <Icon 
                    name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
                    color="#FFF"
                    size={20} />
                    <TipoTexto>{data.tipo}</TipoTexto>
                </IconView>
            </Tipo>
            <ValorTexto>R$ {data.valor}</ValorTexto>
        </Container>
    </TouchableWithoutFeedback>
  );
}