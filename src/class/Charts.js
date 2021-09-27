import data from "../data/single.json";

export class Charts {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
    this.init = this.init.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
    this.init();
  }

  init() {
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(0, 0, this.width - 1, this.height - 1);
    this.drawPoints(
      data.columns.x.map((date, index) => ({
        date,
        value: data.columns.y0[index],
      })),
      data.columns.x,
      data.columns.y0,
      data.colors.y0
    );
  }

  drawPoints(points, xValues, yValues, color) {
    const XStep = this.width / (xValues[xValues.length - 1] - xValues[0]);

    const sortedYValues = yValues.slice().sort((a, b) => a - b);
    const YStep =
      this.height /
      (sortedYValues[sortedYValues.length - 1] - sortedYValues[0]);
    // const YStep = this.height / sortedYValues[sortedYValues.length - 1];

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;

    this.ctx.moveTo(
      points[0].date - xValues[0] * XStep,
      points[0].value * YStep
    );
    this.ctx.beginPath();

    console.log(this.height);
    console.log(sortedYValues[0]);
    points.slice(1).forEach((point) => {
      const x = (point.date - xValues[0]) * XStep,
        y = this.height - (point.value - sortedYValues[0]) * YStep;

      if (y < 0) console.log(point);
      this.ctx.lineTo(x, y);
    });
    this.ctx.stroke();
  }
}
