<template>
  <div>
    <b-form-group label="グラフ設定">
      <b-form-group>
        <b-form-input
          id="title-filed"
          @change="onChangedTitleFiled($event)"
          placeholder="グラフタイトルを入力"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="number"
          placeholder="x軸の最大値を入力"
          step="100"
          @change="xLabelMax = Number($event)"
        ></b-form-input>
      </b-form-group>
    </b-form-group>
    <chart
      v-if="datasetList"
      :datasetList="datasetList"
      :biasList="biasList"
      :title="chartTitle"
      :xLabelMax="xLabelMax"
    />
  </div>
</template>

<script>
import { lvmToList } from "~/plugins/lvmFormat.js";
import { FileNameToLabel } from "~/plugins/Static.js";

import Chart from "~/components/Chart.vue";

export default {
  components: {
    Chart
  },
  props: {
    loadedFiles: Array
  },
  data() {
    return {
      biasList: [],
      dataLoadFlag: false,
      heightRange: 300,
      chartTitle: "",
      xLabelMax: 0
    };
  },
  created() {},
  methods: {
    onChangedTitleFiled(value) {
      this.chartTitle = value;
    }
  },
  computed: {
    datasetList() {
      let datasetList = this.loadedFiles.map(dataObj => {
        return {
          label: FileNameToLabel[dataObj.name],
          data: lvmToList(dataObj.file)
        };
      });
      return datasetList;
    }
  }
};
</script>

<style lang="scss" scoped></style>
