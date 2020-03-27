import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  Container,
  RegisterForm,
  Section,
  ModalView,
  ModalBox,
} from './styles';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  whatsapp: Yup.string().required('O whatsapp é obrigatório'),
  city: Yup.string().required('O nome da cidade é obrigatório'),
  uf: Yup.string(2, 'Apenas dois caracteres').required(
    'A sigla do estado é obrigatório'
  ),
});

export default function Register() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleRegister({ name, email, whatsapp, city, uf }) {
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);
      setId(response.data.id);
      toast.success('Cadastrado com sucesso');
      setVisible(!visible);
    } catch (err) {
      toast.error('Erro no cadastro tente novamente');
    }
  }

  function handleClose() {
    setVisible(!visible);
    history.push('/');
  }

  return (
    <Container>
      <div className="content">
        <Section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a
            enctrontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>
        </Section>

        <RegisterForm schema={schema} onSubmit={handleRegister}>
          <Input placeholder="Nome da ONG" name="name" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input placeholder="WhatsApp" name="whatsapp" />
          <div>
            <Input placeholder="Cidade" name="city" />
            <Input placeholder="UF" name="uf" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </RegisterForm>
      </div>

      <ModalView visible={visible}>
        <ModalBox>
          <button type="button" onClick={handleClose}>
            X
          </button>
          <h2>Seu ID de acesso:</h2>
          <strong>ID: {id}</strong>
          <p>Salve para efetuar o logon</p>
        </ModalBox>
      </ModalView>
    </Container>
  );
}
