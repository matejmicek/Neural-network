function sigmoid(x) {
    return (1 / (1 + Math.exp(-x)));
}

function xonex(x) {
    return (x * (1 - x));
}

class NeuralNetwork {
    constructor(input, hidden, output) {

        this.inputNodes = input;
        this.hiddenNodes = hidden;
        this.outputNodes = output;
        this.lr = 0.1;

        this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
        this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);

        this.weightsIH.randomize();
        this.weightsHO.randomize();

        this.biasIH = new Matrix(this.hiddenNodes, 1);
        this.biasHO = new Matrix(this.outputNodes, 1);

        this.biasIH.randomize();
        this.biasHO.randomize();

    }
    feedforward(input) {
        let inputs = Matrix.fromArray(input);
        let hidden = Matrix.multiply(this.weightsIH, inputs);
        hidden.add(this.biasIH);
        hidden.map(sigmoid);

        let outputs = Matrix.multiply(this.weightsHO, hidden);
        outputs.add(this.biasHO);
        outputs.map(sigmoid);

        return outputs.toArray();

    }


    train(inputs, targets) {

        //feed forward
        inputs = Matrix.fromArray(inputs);

        let hidden = Matrix.multiply(this.weightsIH, inputs);
        hidden.add(this.biasIH);
        hidden.map(sigmoid);

        let outputs = Matrix.multiply(this.weightsHO, hidden);
        outputs.add(this.biasHO);
        outputs.map(sigmoid);

        //feed forward end


        //calculating output deltas

        targets = Matrix.fromArray(targets);

        let output_errors = Matrix.subtract(targets, outputs);

        let gradients = Matrix.map(outputs, xonex);

        //gradients.print();
        gradients.multiply(output_errors);

        gradients.multiply(this.lr);



        let hidden_transposed = Matrix.transpose(hidden);
        let weightsHO_deltas = Matrix.multiply(gradients, hidden_transposed);
        this.weightsHO.add(weightsHO_deltas);
        this.biasHO.add(gradients);

        //calculating hidden deltas

        let weightsHO_transposed = Matrix.transpose(this.weightsHO);
        let hidden_errors = Matrix.multiply(weightsHO_transposed, output_errors);

        let hidden_gradient = Matrix.map(hidden, xonex);


        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.lr);



        let inputs_T = Matrix.transpose(inputs);
        let weightsIH_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        this.weightsIH.add(weightsIH_deltas);

        this.biasIH.add(hidden_gradient);

    }
}
