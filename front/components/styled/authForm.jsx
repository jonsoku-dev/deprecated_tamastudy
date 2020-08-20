import styled from 'styled-components';

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 100%;
  }
`;
export const Input = styled('div')`
  > input {
    width: 100%;
    padding: ${(props) => props.theme.space * 2}px 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${(props) => (props.error ? '#D8000C' : '#000000')};
    margin-bottom: ${(props) => props.theme.space}px;
    outline: none;
    border: none;
    border-bottom: 1px solid ${(props) => (props.error ? '#D8000C' : '#737373')};
    background: ${(props) => props.error && '#FFD2D2'};
    &::placeholder {
      color: ${(props) => (props.error ? '#D8000C' : '#737373')}
    }
  }
`;

export const ErrorMessage = styled('span')`
  color: #e03737;
`;

export const CheckboxWrapper = styled('div')`
  ${(props) => props.term
  && `
    display:flex;
    justify-content: center;
  `}
  label {
    margin: 0 !important;
  }
`;

export const SNSWrapper = styled('div')`
  input {
    font-size: 1rem;
    padding: ${(props) => props.theme.space * 1}px 0;
  }
`;
export const ButtonWrapper = styled('div')`
  margin: ${(props) => props.theme.space * 2}px;
  display: flex;
  justify-content: center;
  > button {
    margin: 0 ${(props) => props.theme.space}px;
  }
`;
