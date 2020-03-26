import React from 'react';
import { Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';

import {
  Container, 
  Header, 
  Logo,
  HeaderButton, 
  Incident, 
  IncidentProperty, 
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  Action,
  ActionText
 } from './styles';

export default function Detail() {
  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <Container>
      <Header>
        <Logo source={logoImg} />
        <HeaderButton onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </HeaderButton>
      </Header>

      <Incident>
        <IncidentProperty style={[{marginTop:  0}]} >ONG: </IncidentProperty>
        <IncidentValue>{incident.name} de {incident.city}/{incident.uf}</IncidentValue>

        <IncidentProperty>CASO: </IncidentProperty>
        <IncidentValue>{incident.title}</IncidentValue>

        <IncidentProperty>VALOR: </IncidentProperty>
        <IncidentValue>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            }).format(incident.value)}
        </IncidentValue>
      </Incident>

      <ContactBox>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o herói desse caso.</HeroTitle>

        <HeroDescription>Entre em contato:</HeroDescription>

        <Actions>
          <Action onPress={sendWhatsapp}>
            <ActionText>WhatsApp</ActionText>
          </Action>

          <Action onPress={sendMail}>
            <ActionText>E-mail</ActionText>
          </Action>

        </Actions>
      </ContactBox>

    </Container>
  );
}
