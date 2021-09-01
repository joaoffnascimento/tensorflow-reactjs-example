import React, { useState } from "react";
import "./styles/app.css";
import {
  GetDatasetFunction,
  GraphDataVisualisation,
  createModel,
  Prediction,
  convertToTensor,
  trainModel,
  testModel,
} from "./tensorflow/functions";

export default function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [trainingStatus, setTrainingStatus] = useState(true);
  const [model, setModel] = useState({});
  const [epochs, setEpochs] = useState(50);

  const filterData = (data) => {
    const filtered = data
      .map((car) => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
      }))
      .filter((car) => car.mpg != null && car.horsepower != null);
    setFilteredData(filtered);
  };

  const prepAndTrainModel = async () => {
    // convert the data to tensors
    const tensorData = convertToTensor(filteredData);
    const { inputs, labels } = tensorData;

    // train model
    const model = createModel();
    console.log("model:", model);
    await trainModel(model, inputs, labels, epochs);
    setModel(model);
    console.log("Done Training");
    testModel(model, filteredData, tensorData);
    setTrainingStatus(false);
  };

  const onChange = (e) => {
    setEpochs(e.target.value * 1);
  };

  return (
    <div className="App">
      <h1>
        Avaliação do 2º Bimestre da disciplina Computação Inteligente: um estudo
        de caso sobre redes neurais
      </h1>
      <h2>Professor: Gilson Júnior</h2>
      <h2>Grupo: João Felipe e Vinicius Oliveira</h2>
      <h3>
        Estudo de caso criado com base no modelo proposto em um dos treinamentos
        fornecidos pela documentação da biblioteca. Para mais informações
        acesse:{" "}
        <a href="https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html?hl=pt-br#0">
          TensorFlow.js: como fazer predições de dados 2D
        </a>
      </h3>
      <h3>Atalhos para manipular a barra direita que contém as visões:</h3>
      <h4>` \crase\ =) Exibir ou ocultar a visualização após obter os dados</h4>
      <h4>~ \Til\ =) Altera entre os dois possíveis modos de visualização.</h4>

      <GetDatasetFunction filter={filterData} />
      <GraphDataVisualisation cleanedData={filteredData} />
      <RecordEpochs onChange={onChange} />
      <button onClick={prepAndTrainModel}>
        {trainingStatus
          ? `Treine o modelo e execute o teste de regressão linear!`
          : `Treinamento concluído!`}
      </button>
      <h5>
        * epochs é o número de vezes que o modelo analisará todo o conjunto de
        dados fornecido. Aqui, serão feitas X iterações usando o conjunto de
        dados.
      </h5>
      <br />
      {!trainingStatus && <Prediction model={model} />}
    </div>
  );
}

const RecordEpochs = ({ onChange }) => {
  return (
    <form>
      <br />
      <h4>2) Quantas epochs* para executar?</h4>
      <input type="number" name="epochs" onChange={onChange} />
    </form>
  );
};
