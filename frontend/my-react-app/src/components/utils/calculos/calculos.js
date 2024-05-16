
export function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth() + 1;
  const diaAtual = hoje.getDate();
  const mesNascimento = nascimento.getMonth() + 1;
  const diaNascimento = nascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
}

export function calcularTMB(peso, altura, idade, sexo) {
  let tmb;

  if (sexo === 'M') {
    tmb = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * idade;
  } else if (sexo === 'F') {
    tmb = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * idade;
  } else {
    throw new Error('Sexo inválido. Use "M" para masculino ou "F" para feminino.');
  }

  return Math.floor(tmb);
}
