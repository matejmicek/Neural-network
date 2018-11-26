class Point {
    constructor() {
        this.indicators = new Array(2);
        this.indicators[0] = random(width);
        this.indicators[1] = random(height);
        this.label = 69;
        if (this.indicators[0] <= this.indicators[1]) {
            this.label = 1;
        } else {
            this.label = -1;
        }
    }
}
