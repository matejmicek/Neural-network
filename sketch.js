let lr_slider;
let nn;
let counter = 0;
let training_data = [
    {
        inputs: [0, 1],
        targets: [1]
    },
    {
        inputs: [1, 0],
        targets: [1]
    },
    {
        inputs: [1, 1],
        targets: [0]
    },
    {
        inputs: [0, 0],
        targets: [0]
    }
//    {
//        inputs: [0.5, 0.5],
//        targets: [1]
//    }
];


function setup() {
    createCanvas(400, 400);
    nn = new NeuralNetwork(2, 15, 1);
    lr_slider = createSlider(0.01, 0.1, 0.05, 0.01);
    for (let i = 0; i < 50000; i++) {
        let data = random(training_data);
        nn.train(data.inputs, data.targets);
    }

    console.log(nn.feedforward([0, 0]));
    console.log(nn.feedforward([1, 1]));
    console.log(nn.feedforward([1, 0]));
    console.log(nn.feedforward([0, 1]));
}

function draw() {
    background(0);

    nn.lr = lr_slider.value();
    let number_of_iterations = 1000;
    let final_number_of_iterations = 100000;



    for (let i = 0; i < number_of_iterations; i++) {
        let data = random(training_data);
        nn.train(data.inputs, data.targets);
    }
    counter += number_of_iterations;
    let resolution = 3;
    let cols = Math.floor(width / resolution);
    let rows = Math.floor(height / resolution);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            let input_1 = i / (cols - 1);
            let input_2 = j / (rows - 1);
            let output = nn.feedforward([input_1, input_2]);
            let col = output[0] * 255;
            fill(col);
            noStroke();
            rect(x, y, resolution, resolution);
        }
    }
    if (counter % 10000 == 0) {
        counter_l = counter / 1000;
        console.log(counter_l + "k");
    }
    if (counter % final_number_of_iterations == 0) {
        console.log("finished");
        noLoop();
    }
}


//var canvasA = 600;
//var canvasB = 600;
//var length = 50;
//var NumIndicators = 2;
//var points = new Array(length);
//var weights = new Array(NumIndicators);
//
//
//function setup() {
//    createCanvas(canvasA, canvasB);
//    background(51);
//    stroke(255);
//    fill(255);
//    line(0, 0, width, height);
//    for (var i = 0; i < points.length; i++) {
//        points[i] = new Point();
//    }
//    for (var j = 0; j < weights.length; j++) {
//        weights[j] = random(1);
//    }
//    guess(points, weights);
//}
//
//function draw() {
//    for (var i = 0; i < points.length; i++) {
//        if (points[i].label == -1) {
//            fill(255);
//        } else {
//            fill(0);
//        }
//        noStroke();
//        ellipse(points[i].indicators[0], points[i].indicators[1], 8, 8);
//    }
//}
//
//function guess(points, weights) {
//    var sum = 0;
//    for (i = 0; i < points.length; i++) {
//        sum += points[i].indicators[0] * weights[0] + points[i].indicators[1] * weights[1];
//        //console.log(sum);
//        sum = 0;
//    }
//    return sum;
//}
//
//function dotProduct(row, col) {
//    var sum = 0;
//    for (let i = 0; i < row.length; i++) {
//        sum += row[i] * col[i];
//    }
//    return sum;
//}
//

//
//function makeItATwo() {
//    return 2;
//}
//var n = new Matrix(2, 3);
//var m = new Matrix(3, 8);
//var x = n.multiply(m);
//console.table(m);
//console.table(n);
//console.table(x);
