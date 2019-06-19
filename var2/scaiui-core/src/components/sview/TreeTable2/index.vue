<template>
  <el-table ref="reference" :data="formatData" border :row-style="rowStyleHandler" :height="height">
    <el-table-column v-if="columns.length===0" :label="$t('level')" width="170" align="left" show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" :style="{marginLeft: scope.row.level * 50 + 'px'}"
              class="ms-tree-space"></span>
        <span class="tree-ctrl" @click="toggleExpanded(scope.row, scope.$index)">
          <i v-if="scope.row.hasChildren  && !scope.row._expanded"
             class="el-icon-arrow-right"/>
          <i v-if="scope.row.hasChildren && scope.row._expanded"
             class="el-icon-arrow-down"/>
          <i v-if="!scope.row.hasChildren" class="el-icon-minus"/>
        </span>
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text"
                     :width="column.width">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.row,scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>
  /**
   Auth: Lei.j1ang
   Created: 2018/1/19-13:59
   */
  import treeToArray from './eval'
  import Vue from 'vue'
  import tableUtil from '../../../utils/table'

  export default {
    name: 'TreeTable',
    props: {
      /* eslint-disable */
      data: {
        type: [Array, Object],
        required: false
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandLevel: {
        type: Number,
        default: 99999999999
      },
      collapsable: {
        type: Boolean, default: true
      },
      height: {
        type: Number
      }
    },
    computed: {
      // 格式化数据源
      formatData: function () {
        let tmp;
        if (this.data == undefined) {
          return;
        }
        if (!Array.isArray(this.data)) {
          tmp = [this.data];
        } else {
          tmp = this.data;
        }
        const func = this.evalFunc || treeToArray;
        const args = this.evalArgs ? Array.concat([tmp, this.expandLevel], this.evalArgs) : [tmp, this.expandLevel];
        return func.apply(null, args)
      }
    },
    methods: {
      rowStyleHandler({row, rowIndex}) {
        if (rowIndex === 0 || row._level === 1) {
          row._show = true;
        }
        return row._show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded: function (row, index) {
        if (!this.collapsable) {
          return;
        }
        if (row) {
          //console.log("====toggleExpanded2222>>>", row ,row["_expanded"])
          let visible = row["_expanded"] ? false : true;
          Vue.set(row, "_expanded", visible);
          this.toggleChildren(row);
          //通过设置hoverRow触发rowStyleHandler
          if (this.$refs.reference.store.states.hoverRow !== index) {
            this.$refs.reference.store.commit('setHoverRow', index);
          } else {
            this.$refs.reference.store.commit('setHoverRow', -1);
          }
        }

      },
      toggleChildren: function (row) {
        if (row.children && row.children.length > 0) {
          for (let i = 0; i < row.children.length; i++) {
            //console.log("====toggleExpanded333>>>", row, row["_expanded"])
            Vue.set(row.children[i], "_show", row._expanded);
            if (!row._expanded) {
              Vue.set(row.children[i], "_expanded", row._expanded);
              this.toggleChildren(row.children[i]);
            }
          }
        }
      }
    }
  }
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style scoped>
  .hiddenRow {
    display: none !important;
  }

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 20px;
    height: 14px;
  }

  .processContainer {
    width: 100%;
    height: 100%;
  }

  table td {
    line-height: 26px;
  }

  .tree-ctrl {
    /*display: inline-block;
    cursor: pointer;*/
    /*position: relative;*/
    /*cursor: pointer;*/
    /*color: $color-blue;*/
    /*margin-left: -$space-width;*/
  }
</style>
