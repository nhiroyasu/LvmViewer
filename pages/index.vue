<template>
  <div>
    <b-jumbotron header="LvmViewer" lead="とある電気実験のグラフビューア">
      <p>
        とある電気実験のレポート作成に特化したグラフビューア。
        <br />対象の方以外は、このアプリの利用価値は皆無です。御退出願います。
      </p>
      <b-button variant="primary" href="https://cyan-0fbcf9.com" target="_blank">開発者について</b-button>
      <b-button variant="primary" href="#usage">使い方</b-button>
    </b-jumbotron>
    <div class="container graph-container">
      <div class="row justify-content-center m-0 p-0">
        <b-form-group class="col-10 col-md-6">
          <b-form-file
            v-model="files"
            :state="Boolean(files)"
            placeholder="ファイルを選択、またはドロップ"
            drop-placeholder="ドロップする"
            accept=".lvm"
            multiple
          ></b-form-file>
        </b-form-group>
        <div class="space"></div>
        <div class="col-12 col-md-10 my-3">
          <graph-view :loadedFiles="loadedFiles" />
        </div>
      </div>
      <hr class="space" />
      <usage-view id="usage" />
      <div class="space"></div>
    </div>
  </div>
</template>

<script>
import GraphView from "~/components/GraphView.vue";
import UsageView from "~/components/Usage.vue";

export default {
  components: {
    GraphView,
    UsageView
  },
  data() {
    return {
      files: [],
      loadedFiles: []
    };
  },
  computed: {},
  watch: {
    files(newValue, oldValue) {
      this.loadedFiles = [];
      this.files.map(file => {
        let reader = new FileReader();
        reader.onload = event => {
          let fileText = event.target.result;
          this.loadedFiles.push({
            name: file.name,
            file: fileText
          });
        };
        reader.readAsText(file);
      });
    }
  }
};
</script>

<style lang="scss">
.space {
  margin: 50px 0px;
}

.graph-container {
  margin: 0px;
  padding: 0px;
  max-width: 100vw;
}
</style>
