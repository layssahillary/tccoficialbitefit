
function Validate(values) {
  let errors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email inválido';
  }

  if (values.senha.length < 8) {
    errors.senha = 'Senha deve ter exatamente 8 caracteres';
  }

  if (values.confirmar_senha !== values.senha) {
    errors.confirmar_senha = 'Confirmar senha não confere com a senha';
  }

  return errors;
}

export default Validate;