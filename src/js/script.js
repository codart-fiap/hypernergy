function calcularConta() {
    // Obtém os valores inseridos pelo usuário
    const consumo = parseFloat(document.getElementById('consumo').value) || 0;
    const valorKwh = parseFloat(document.getElementById('valorKwh').value) || 0;

    // Calcula o valor da conta
    const valorConta = consumo * valorKwh;
    document.getElementById('valorConta').textContent = valorConta.toFixed(2);

    // Calcula a possibilidade de economia (20% do valor da conta)
    const economia = valorConta * 0.2;
    document.getElementById('economia').textContent = `Possibilidade de Economia: R$ ${economia.toFixed(2)}`;
}