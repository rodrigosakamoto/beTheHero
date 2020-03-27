import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  div.content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Section = styled.section`
  width: 100%;
  max-width: 380px;

  h1 {
    margin: 64px 0 32px;
    font-size: 32px;
  }

  p {
    font-size: 18px;
    color: #737380;
    line-height: 32px;
  }
`;

export const RegisterForm = styled(Form)`
  width: 100%;
  max-width: 450px;

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 10px;
    font-weight: bold;
  }

  input {
    margin-top: 8px;
  }

  div {
    display: flex;

    input + input {
      margin-left: 8px;
    }
  }
`;

export const ModalView = styled.div`
  visibility: ${(props) => (props.visible ? 'block' : 'hidden')};
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  z-index: 9999;
  margin: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  border-radius: 4px;
  width: 500px;
  max-width: 500px;
  background: #fff;
  button {
    border: 0;
    background: #e02041;
    border-radius: 50%;
    padding: 5px;
    align-self: flex-end;
    margin-top: -40px;
    font-size: 16px;
    width: 35px;
    border: 3px solid #fff;
    font-weight: bold;
    height: 35px;
    color: #fff;
  }
  p {
    font-size: 16px;
    color: #666;
    line-height: 26px;
  }
  h2 {
    font-size: 24px;
    color: #444;
    font-weight: bold;
  }

  strong {
    font-size: 18px;
    color: #444;
    font-weight: bold;
    margin: 15px 0;
  }
`;
