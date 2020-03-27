import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container, IncidentForm, Section } from './styles';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

const schema = Yup.object().shape({
  title: Yup.string().required('O título do caso é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  value: Yup.string('Apenas números').required('O valor é obrigatório'),
});

export default function NewIncident() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident({ title, description, value }) {
    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });
      toast.success('Novo caso cadastrado com sucesso');
      history.push('/profile');
    } catch (err) {
      toast.error('Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <Container>
      <div className="content">
        <Section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </Section>

        <IncidentForm schema={schema} onSubmit={handleNewIncident}>
          <Input placeholder="Título do caso" name="title" />
          <Textarea placeholder="Descrição" name="description" />
          <Input placeholder="Valor em reais" name="value" />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </IncidentForm>
      </div>
    </Container>
  );
}
