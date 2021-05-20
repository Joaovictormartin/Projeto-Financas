import React, { useState } from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

import { Container, Header } from '../../pages/Home/styles';

export default function DatePicker({date, onClose, onChange}) {
    const [datenow, setDatenow] = useState(new Date(date))
 
    return (
        <Container> 
            {Platform.OS === 'ios' && (
                <Header>
                    <TouchableOpacity onPress={onClose}>
                        <Text>Fechar</Text>
                    </TouchableOpacity>
                </Header>
            )}
            <DateTimePicker
            value={datenow}
            mode="date"
            display="default"
            onChange={(event, date) => {
                const currentDate = date || datenow;
                setDatenow(currentDate);
                onChange(currentDate);
            }}
            style={{backgroundColor: '#FFF'}}
            />
        </Container>
  );
}