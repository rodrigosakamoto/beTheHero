import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Input } from '@rocketseat/unform';
import { FiArrowLeft} from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container, RegisterForm, Section } from './styles';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
  whatsapp: Yup.string().required('O whatsapp é obrigatório'),
  city: Yup.string().required('O nome da cidade é obrigatório'),
  uf: Yup.string(2, 'Apenas dois caracteres').required('A sigla do estado é obrigatório'),
})

export default function Register() {
  const history = useHistory();

  async function handleRegister({name, email, whatsapp, city, uf}) {
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {

    const response = await api.post('ongs', data);
    
    toast.success('Cadastrado com sucesso')
    alert(`Seu ID de acesso ${response.data.id}`);

    history.push('/');
    } catch(err) {
      toast.error('Erro no cadastro tente novamente')
    }
  }

  return (
    <Container>
      <div className="content">
        <Section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a enctrontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>
        </Section>

        <RegisterForm schema={schema} onSubmit={handleRegister}>
          <Input
            placeholder="Nome da ONG"
            name="name"
           />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <Input
            placeholder="WhatsApp"
            name="whatsapp"
          />
          <div>
              <Input
                placeholder="Cidade"
                name="city" 
              />
              <Input
                placeholder="UF"
                name="uf"
                style={{ width: 80 }}
              />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </RegisterForm>
      </div>
    </Container>
  );
}
