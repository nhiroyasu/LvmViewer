<script>
import { maxTimeCount } from "~/plugins/lvmFormat.js";
import {
  CYCLE_MILL_SECOND,
  BorderColors,
  PointStyles
} from "~/plugins/Static.js";

import { Line } from "vue-chartjs";

export default {
  extends: Line,
  name: "chart",
  data() {
    return {
      data: {
        labels: [],
        datasets: []
      },
      options: {
        title: {
          display: true,
          text: "実験Xの比較グラフ",
          fontSize: 24
        },
        scales: {
          xAxes: [
            {
              ticks: {
                stepSize: 100.0
              },
              scaleLabel: {
                display: true,
                labelString: "時間t [ms]",
                fontSize: 18
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 150
                // suggestedMin: 0
              },
              scaleLabel: {
                display: true,
                labelString: "角度θ [arb.unit]",
                fontSize: 18
              }
            }
          ]
        },
        hover: {
          mode: "point"
        },
        onClick: this.onClickPoint
      }
    };
  },
  props: {
    title: String,
    datasetList: Array,
    biasList: Array,
    xLabelMax: Number
  },
  mounted() {
    this.addPlugin({
      beforeDraw: function(c) {
        var ctx = c.chart.ctx;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.chart.width, c.chart.height);
        ctx.save();
      }
    });
    this.renderChart(this.data, this.options); // レンダリング処理（値の変化には応じない）
  },
  methods: {
    convertDatasetPart(dataset) {
      const baseDataset = {
        label: dataset.label,
        id: dataset.label,
        data: dataset.data,
        borderColor:
          BorderColors[Math.floor(Math.random() * BorderColors.length)],
        backgroundColor: "rgba(255,255,255, 1.0)",
        fill: false,
        lineTension: 0.0,
        pointStyle: PointStyles[Math.floor(Math.random() * PointStyles.length)],
        pointBorderWidth: 4
      };

      return baseDataset;
    },
    createLabels(length) {
      let labels = [];
      for (let i = 0; i < length; i++) {
        labels.push(i * CYCLE_MILL_SECOND);
      }
      return labels;
    },
    onClickPoint(event, elements) {
      let index = elements[0]._index;
      let datasetIndex = elements[0]._datasetIndex;
      this.data.datasets[datasetIndex].data = this.data.datasets[datasetIndex].data.slice(0, index);
      this.renderChart(this.data, this.options);
    }
  },
  watch: {
    biasList(newValue, oldValue) {
      this.biasList = newValue;
    },
    datasetList(newValue, oldValue) {
      let maxLength = maxTimeCount(this.datasetList);
      this.data.labels = this.createLabels(maxLength);
      this.data.datasets = this.datasetList.map((dataset, index) => {
        let convertedPart = this.convertDatasetPart(dataset);
        convertedPart.data = convertedPart.data.map(
          value => value + 100 * index
        ); // bias付与
        return convertedPart;
      });
      this.options.scales.yAxes[0].ticks.suggestedMax =
        100 * this.datasetList.length;
      this.renderChart(this.data, this.options);
    },
    title(newValue, oldValue) {
      if (newValue !== "") {
        this.options.title.text = newValue;
        this.renderChart(this.data, this.options);
      }
    },
    xLabelMax(newValue, oldValue) {
      if (newValue !== 0 && newValue !== null) {
        let maxLabel = Math.floor(newValue / 100) * 100;
        this.options.scales.xAxes[0].ticks.max = maxLabel;
        this.renderChart(this.data, this.options);
      }
    }
  }
};
</script>
