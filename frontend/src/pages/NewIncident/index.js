import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi';
import { Container, Form, Section } from './styles';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <Container>
    <div className="content">
      <Section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#e02041" />
          Voltar para home
        </Link>
      </Section>

      <Form onSubmit={handleNewIncident}>
        <input 
          placeholder="Título do caso"
          value={title}
          onChange={e => setTitle(e.target.value)}  
        />
        <textarea 
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}  
        />
        <input 
          placeholder="Valor em reais"
          value={value}
          onChange={e => setValue(e.target.value)}  
        />
        <button className="button" type="submit">Cadastrar</button>
      </Form>
    </div>
  </Container>
  );
}
