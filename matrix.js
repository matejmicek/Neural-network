class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (let i = 0; i < rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    static fromArray(arr) {
        let array = arr;
        let b = new Matrix(array.length, 1);
        for (let i = 0; i < arr.length; i++) {
            b.data[i][0] = arr[i];
        }
        return b;
    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }

    }

    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    subtract(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n;
                }
            }
        }
    }

    static add(a, b) {
        if ((a.rows == b.rows) && (a.cols === b.cols)) {
            let result = new Matrix(a.rows, a.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    result.data[i][j] = a.data[i][j] + b.data[i][j];
                }
            }
            return result;
        } else {
            console.log("addition was not succesful!");
        }

    }

    static subtract(a, b) {
        if ((a.rows == b.rows) && (a.cols === b.cols)) {
            let result = new Matrix(a.rows, a.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    result.data[i][j] = a.data[i][j] - b.data[i][j];
                }
            }
            return result;
        } else {
            console.log("subtraction was not succesful!");
        }

    }

    static multiply(a, b) {
        var a = a;
        var b = b;
        if (a.cols != b.rows) {
            console.log("what the fuck you doin man? Cols ain't rows.");
        } else {
            var result = new Matrix(a.rows, b.cols);
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    var sum = 0;
                    for (let x = 0; x < a.cols; x++) {
                        sum += a.data[i][x] * b.data[x][j];

                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }
    }
    multiply(n) {
        if (n instanceof Matrix) {
            // hadamard product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            // Scalar product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n;
                }
            }
        }
    }
    static transpose(n) {
        var result = new Matrix(n.cols, n.rows);
        for (let i = 0; i < n.rows; i++) {
            for (let j = 0; j < n.cols; j++) {
                result.data[j][i] = n.data[i][j];
            }
        }
        return result;
    }

    print() {
        console.table(this.data);
    }

    map(f) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                var val = this.data[i][j];
                this.data[i][j] = f(val);
            }
        }
    }

    static map(n, func) {
        var result = new Matrix(n.rows, n.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                var val = n.data[i][j];
                result.data[i][j] = func(val);
            }
        }
        return result;
    }

}

//
//var m = new Matrix(2, 3);
////m.randomize();
////m.randomize(10);
////n.randomize();
//m.print();
