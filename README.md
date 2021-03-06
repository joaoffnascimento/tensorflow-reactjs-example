<h1 align="center">Estudo de caso sobre redes neurais</h1>

Projeto para treinamento de um modelo para fazer previsões a partir de dados numéricos que descrevem um conjunto de carros. Utilizando um pequeno conjunto de dados e um modelo simples.

Exemplo de um dos carros do conjuto fornecido:

```json
{
  "aceleracao": 12,
  "cilindros": 8,
  "deslocamento": 307,
  "cavalos": 130,
  "milhasPorGalao": 18,
  "nome": "chevrolet chevelle malibu",
  "origem": "USA",
  "pesoEmLibras": 3504,
  "ano": "1970-01-01"
}
```

> O principal objetivo ter contato com a terminologia, os conceitos e a sintaxe básica dos modelos de treinamento com o TensorFlow.js.

> Por se tratar de um processo de treinamento de um modelo para prever números contínuos, essa tarefa pode ser de cunho regressivo. Vamos treinar o modelo mostrando muitos exemplos de entradas junto com a saída correta. Isso é chamado de aprendizado supervisionado.

## O que foi criado neste projeto:

- Uma página da Web que usa o utilizando o `ReactJS`, implementando a biblioteca `TensorFlow.js` para treinar um modelo no navegador. O modelo aprenderá a prever "milhas por galão" (MPG) de acordo com a "potência".

## Passos executados para o treinamento e inferência dos dados:

- Carregar e preparar os dados para o treinamento;

- Etapa de definição da arquitetura do modelo;

- Treinar o modelo e monitorar o desempenho durante o treinamento;

- Fazer algumas previsões para avaliar o modelo treinado;

## O que foi aprendido implentando este caso de uso:

- Práticas recomendadas para a preparação de dados de machine learning, como embaralhamento e normalização;

- A sintaxe do TensorFlow.js para a criação de modelos usando a API tf.layers;

- O monitoramento do treinamento no navegador com a biblioteca tfjs-vis
  Pré-requisitos;

- Conhecimento conceitual das redes neurais. [Introdução a Redes Neurais e Deep Learning](https://www.youtube.com/watch?v=Z2SGE3_2Grg)

---

<div>
<details>
  <summary> <b> Mais detalhes sobre o painel da aplicação</b> <i>(Clique aqui para expandir)</i> </summary>
<br/>

![exemplo_previsao_completa](https://raw.githubusercontent.com/joaoffnascimento/tensorflow-reactjs-example/main/public/exemplo_previsao_completa.png?token=AE5MZLHQDOJUCUWX7XHFXY3BHAZ4C)

![dashboard_lateral_vazio](https://raw.githubusercontent.com/joaoffnascimento/tensorflow-reactjs-example/main/public/dashboard_lateral_vazio.png?token=AE5MZLBJBLVUMQQZXDIAUELBHAZSA)

![dashboard_lateral_carga](https://raw.githubusercontent.com/joaoffnascimento/tensorflow-reactjs-example/main/public/dashboard_lateral_carga.png?token=AE5MZLDVZL6C5DJS4M4XZLLBHAZYU)

![relatorio_desempenho_treinamento](https://raw.githubusercontent.com/joaoffnascimento/tensorflow-reactjs-example/main/public/relatorio_desempenho_treinamento.png?token=AE5MZLEISCZRQ4JY2RVFMNLBHAZ2K)

![representacao_predicaoXdados_originais](https://raw.githubusercontent.com/joaoffnascimento/tensorflow-reactjs-example/main/public/representacao_predicaoXdados_originais.png?token=AE5MZLHPGKC5DUZ6CPAU5WLBHAZ2S)

</details>
</div>

---

<div>
<details>
  <summary> <b> Explicando as funções utilizadas para execução do estudo de caso</b> <i>(Clique aqui para expandir)</i> </summary>
<br/>
<h3>As funções mencionadas abaixo se encontram no arquivo functions.js</h3>

- GetDatasetFunction: ` Função responsável por realizar requisição ao storage do google, e obter o dataset necessário para execução do estudo de caso;`
- GraphDataVisualisation: ` Função para remover quaisquer entradas sem definição de milhas por galão ou potência. Monta esses dados em um gráfico de dispersão para demonstrar o resultado;`
- createModel: ` Função que **instancia o modelo** sequencia; porque as entradas fluem diretamente para baixo em direção à saída. Outros tipos de modelos podem ter ramificações ou várias entradas e saídas, mas, em muitos casos, os modelos serão sequenciais. E adiciona as camadas, essa ação adiciona uma camada de entrada à nossa rede, que é conectada automaticamente a uma camada dense com uma unidade oculta;`
- Model: ` Isso criará uma instância do modelo e exibirá um resumo das camadas na página da Web;`
- convertToTensor: ` Função responsável por preparar os dados para o treinamento -> Embaralhar os dados: Aqui, deixamos os exemplos que serão alimentados no algoritmo de treinamento em ordem aleatória. -> Converter em tensores: Depois, adotamos outra prática recomendada para o treinamento de machine learning. Normalizamos os dados. Faremos isso no intervalo numérico 0-1 usando escalonamento mínimo e máximo. E por ultimo retornar os dados e os limites de normalização;`
- trainModel: `Essa é umas das principais funções. Com a instância de modelo criada e os dados representados como tensores, temos tudo pronto para iniciar o processo de treinamento. O valor informado no input "epochs" é consumido aqui, esse será nossa quantidade de treinamento;`
- Prediction: `Essa funcção tem como objetivo gerar o input para digitarmos nossa pergunta, em nosso caso, quantidade de cavalos;`
- testModel: `Nessa etapa nosso modelo está "treinado", queremos fazer algumas previsões. Vamos avaliar o modelo vendo o que ele prevê. Lembrando que resultado final ira depender bastante de quanto seu modelo foi "treinado", então quanto mais treinar seu modelo melhor será resultado final.`

</details>
</div>
