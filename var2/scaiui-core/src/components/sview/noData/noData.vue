<template>
    <div class="nodata"><br><br><br><br>
      <img src="/static/img/noData.png" alt="">
      <!--<div class="no-text">{{$t('noData')}}</div>-->
    </div>
</template>

<script>
    export default {
        name: "noData"
    }
</script>

<style scoped lang="scss">
  @import 'assets/scss/variables.scss';
  .nodata {
    height: 100%;
    width: 100%;
    text-align: center;
    vertical-align: middle;

    img{
      height:300px;
    }

    .no-text {
      font-size: $base-font;
      color: $mian-unac-font;
    }
  }
</style>
