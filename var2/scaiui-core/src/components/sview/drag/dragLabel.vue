<template>
  <div :style="labelStyle" class="item">
    <el-popover placement="bottom"
                :disabled="label[title].length <= strOverNum"
                trigger="hover">
      <div class="pop-text">{{label[title]}}</div>
      <div slot="reference">
        <img style="vertical-align: middle"
             v-if="showItemIcon"
             :src="'/static/img/report/'+ (label.columnType ? label.columnType : 'int') + '.png'" alt="">
        <span>{{ label[title] | strOver(strOverNum)}}</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
    export default {
        name: "drage-label",
        props: {
          labelStyle: Object,
          strOverNum: {
            type: Number,
            default: function() {
              return 10
            }
          },
          label: Object,
          showItemIcon: Boolean,
          title: {
            type: String,
            default: function() {
              return 'name'
            }
          }
        },
        data() {
          return {

          }
        }
    }
</script>

<style scoped lang="scss">
  @import 'assets/scss/variables.scss';
  .item{
    min-width: $base-length * 3;
    text-align: center;
    vertical-align: middle;
    font-size: $base-font;
    background-color: royalblue;
    color: #eee;
    margin: $base-length * .6 $base-length;
  }
  .item:hover{
    cursor: pointer;
  }
</style>
