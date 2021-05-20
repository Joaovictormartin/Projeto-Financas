import styled from 'styled-components';

export const Background = styled.View`
flex: 1;
background-color: #131313;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'rgba(0,0,0,0.3)',
})`
height: 50px;
width: 90%;
background-color: rgba(255, 255, 255, 0.9);
margin-top: 30px;
font-size: 17px;
border-radius: 10px;
padding-left: 10px;
`;

export const SubmitBtn = styled.TouchableOpacity`
height: 50px;
width: 90%;
margin-top: 20px;
align-items: center;
justify-content: center;
background-color: #00b94a;
border-radius: 10px;
`;

export const SubmitText = styled.Text`
font-size: 21px;
color: #FFF;
font-weight: bold;
`;

