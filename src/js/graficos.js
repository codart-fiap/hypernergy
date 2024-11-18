let graficoAparelhos, graficoSemana, graficoMes;

function atualizarGraficos() {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);

    const cards = document.querySelectorAll('.card');
    
    const labels = [];
    const dadosConsumoMensal = [];
    const dadosConsumoDiario = [];
    
    cards.forEach(card => {
        const nome = card.querySelector('strong');
        if (!nome) {
          return;
        }
        
        const tarifa = parseFloat(card.querySelector('.tarifa')?.value) || 0;
        const potencia = parseFloat(card.querySelector('.potencia')?.value) || 0;
        const tempo = parseFloat(card.querySelector('.tempo')?.value) || 0;
        
        const consumoDiario = ((potencia / 1000) * tempo * tarifa);
        const consumoMensal = consumoDiario * 30;
        
        const consumoDiarioSpan = card.querySelector('.consumo-diario');
        const consumoMensalSpan = card.querySelector('.consumo-mensal');
        
        if (consumoDiarioSpan && consumoMensalSpan) {
            consumoDiarioSpan.textContent = `R$ ${consumoDiario.toFixed(2).replace('.', ',')}`;
            consumoMensalSpan.textContent = `R$ ${consumoMensal.toFixed(2).replace('.', ',')}`;
        }
        
        labels.push(nome.textContent);
        dadosConsumoMensal.push(consumoMensal);
        dadosConsumoDiario.push(consumoDiario);
    });

    if (graficoAparelhos) {
      graficoAparelhos.destroy();
    }
    if (graficoSemana) {
      graficoSemana.destroy();
    }
    if (graficoMes) {
      graficoMes.destroy();
    }

    const ctxAparelhos = document.getElementById('graficoAparelhos').getContext('2d');
    graficoAparelhos = new Chart(ctxAparelhos, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: dadosConsumoMensal,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ]
            }]
        }
    });

    const ctxSemana = document.getElementById('graficoSemana').getContext('2d');
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    const datasets = labels.map((label, index) => {
        const dadosSemana = diasSemana.map(() => {
            const variacao = 0.7 + Math.random() * 0.6;
            return dadosConsumoDiario[index] * variacao;
        });

        return {
            label: label,
            data: dadosSemana,
            borderColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
            ][index],
            fill: false,
            tension: 0.4
        };
    });

    graficoSemana = new Chart(ctxSemana, {
        type: 'line',
        data: {
            labels: diasSemana,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Consumo Diário (R$)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                tooltip: {
                    position: 'nearest'
                }
            }
        }
    });

    const ctxMes = document.getElementById('graficoMes').getContext('2d');
    graficoMes = new Chart(ctxMes, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Consumo Mensal (R$)',
                data: dadosConsumoMensal,
                backgroundColor: '#4BC0C0'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', atualizarGraficos);