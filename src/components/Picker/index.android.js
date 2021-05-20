import React from 'react';
import {Picker} from '@react-native-community/picker';

import {PickerView} from './styles';

export default function TelaPicker({onChange, tipo}) {
 return (
   <PickerView>
       <Picker
       style={{
           width: '100%',
           fontSize: 17
       }}
       selectedValue={tipo}
       onValueChange={ (text) => onChange(text)}
       >
           <Picker.Item label="Receita" value="receita" />
           <Picker.Item label="Despesa" value="despesa" />
       </Picker>
   </PickerView>
  );
}