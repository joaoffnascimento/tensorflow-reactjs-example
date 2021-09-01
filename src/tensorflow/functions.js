import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import ReactJson from 'react-json-view';
import React, { useState } from 'react';
import axios from 'axios';

export const GetDatasetFunction = ({ filter }) => {
    const [carDatasetInfo, setCarDatasetInfo] = useState([]);

    const loadData = async () => {
        try {
            const { data } = await axios(
                'https://storage.googleapis.com/tfjs-tutorials/carsData.json'
            );
            setCarDatasetInfo(data);
            filter(data);
        } catch (err) {
            throw err;
        }
    };

    return (
        <div>
            <h3>Vamos começar? siga os passos abaixo:</h3>
            <h4>
                1) obtenha os dados fornecidos pelo Google e verifique o gráfico
                a direita.
            </h4>
            <button onClick={loadData}>Obter Dados</button>
            {carDatasetInfo.length ? (
                <div>
                    <h4>
                        Um exemplo de objeto obtido, ou seja um dos carros do
                        dataset obtido:
                    </h4>
                    <ReactJson
                        name="example_car"
                        collapsed="true"
                        src={{
                            aceleracao: carDatasetInfo[0].Acceleration,
                            cilindros: carDatasetInfo[0].Cylinders,
                            deslocamento: carDatasetInfo[0].Displacement,
                            cavalos: carDatasetInfo[0].Horsepower,
                            milhasPorGalao: carDatasetInfo[0].Miles_per_Gallon,
                            nome: carDatasetInfo[0].Name,
                            origem: carDatasetInfo[0].Origin,
                            pesoEmLibras: carDatasetInfo[0].Weight_in_lbs,
                            ano: carDatasetInfo[0].Year,
                        }}
                    />
                </div>
            ) : (
                <h6>Aguardando carga dos dados...</h6>
            )}
        </div>
    );
};

export const GraphDataVisualisation = ({ cleanedData }) => {
    const values = cleanedData.map((car) => ({
        x: car.horsepower,
        y: car.mpg,
    }));

    tfvis.render.scatterplot(
        { name: 'Cavalos versus Milhas por Galão' },
        { values },
        {
            xLabel: 'Cavalos',
            yLabel: 'Milhas por Galão',
            height: 300,
        }
    );
    return <div></div>;
};

export const createModel = () => {
    const model = tf.sequential();

    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
};

export const Model = () => {
    const model = createModel();
    tfvis.show.modelSummary({ name: 'Resumo do Modelo' }, model);
    return model;
};

export const convertToTensor = (data) => {
    return tf.tidy(() => {
        tf.util.shuffle(data);

        const inputs = data.map((d) => d.horsepower);
        const labels = data.map((d) => d.mpg);

        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizedInputs = inputTensor
            .sub(inputMin)
            .div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor
            .sub(labelMin)
            .div(labelMax.sub(labelMin));

        return {
            inputs: normalizedInputs,
            labels: normalizedLabels,
            inputMax,
            inputMin,
            labelMax,
            labelMin,
        };
    });
};

export const trainModel = async (model, inputs, labels, epochs) => {
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
    });

    const batchSize = 32;

    return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
            { name: 'Desempenho de treinamento' },
            ['loss', 'mse'],
            { height: 200, callbacks: ['onEpochEnd'] }
        ),
    });
};

export const Prediction = ({ model }) => {
    const [prediction, setPrediction] = useState(0);
    const [userHPInput, setUserHPInput] = useState(0);

    const onChange = (e) => {
        setUserHPInput(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();

        makePrediction();
    };
    const makePrediction = () => {
        const value = model.predict(tf.tensor([userHPInput * 1]));
        setPrediction(Math.abs(value.dataSync()[0]));
    };

    return (
        <>
            <h4>Digite a quantidade de cavalos desejada:</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="number"
                    name="hp"
                    value={userHPInput}
                    onChange={onChange}
                />
                <br />
                <button type="Enviar" onClick={onSubmit}>
                    Faça uma previsão de Milhas Por Galão:
                </button>
            </form>
            {prediction && <h3>Previsão: {prediction}</h3>}
        </>
    );
};

export const testModel = (model, inputData, normalizationData) => {
    const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

    const [xs, preds] = tf.tidy(() => {
        const xs = tf.linspace(0, 1, 100);
        const preds = model.predict(xs.reshape([100, 1]));

        const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);

        const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

        return [unNormXs.dataSync(), unNormPreds.dataSync()];
    });

    const predictedPoints = Array.from(xs).map((val, i) => {
        return { x: val, y: preds[i] };
    });

    const originalPoints = inputData.map((d) => ({
        x: d.horsepower,
        y: d.mpg,
    }));

    tfvis.render.scatterplot(
        { name: 'Predições de modelo x dados originais' },
        {
            values: [originalPoints, predictedPoints],
            series: ['original', 'predicted'],
        },
        {
            xLabel: 'Cavalos',
            yLabel: 'Milhas por Galão',
            height: 300,
        }
    );
};
