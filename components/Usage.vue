<template>
  <div class="container usage-content">
    <h1 class="display-3 text-center">Usage</h1>
    <h3>1. ファイルを選択</h3>
    <p class="lead">
      ファイルは複数選択することで、同一グラフ内に表示することができます。<br>
      ファイルを再選択するとグラフは更新されます。
    </p>
    <h3>2. グラフ書式を設定</h3>
    <p class="lead">
      テキストフィールドからグラフタイトル、x軸の最大値を設定できます。（更新時はEnterを押してください。グラフが再レンダリングされます）
    </p>
    <p class="lead">
      線グラフのポイントをクリックするとその点以降の値が削除されます。
    </p>
    <h3>3. グラフを保存</h3>
    <p class="lead">
      グラフ上を右クリックし、「名前を付けて画像を保存」を選択してください。画像データとしてグラフを保存することが可能です。<br>
      推奨ブラウザ（Google Chrome , Firefox)
    </p>
    <h3>色・ポイントの設定</h3>
    <p class="lead">
      グラフの色、ポイントの形状はランダムです。重なった場合は再ロードしてください。
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.usage-content {

}
</style>