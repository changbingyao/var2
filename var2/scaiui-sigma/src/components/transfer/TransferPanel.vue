<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-show="checkboxCtrl"
        v-model="allChecked"
        :disabled="operator == 'view'"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">
        {{ title }}
        <span>{{checkedSummary}}</span>
      </el-checkbox>
      <span v-show="!checkboxCtrl" style="font-size: 14px;color: #303133;">{{ title }}</span>
    </p>
    <div v-show="checkboxCtrl" class="el-transfer-panel__body" style="overflow: auto;">
      <el-checkbox-group
        @scroll.native="targetScroll"
        v-model="checked"
        class="el-transfer-panel__list">
        <el-checkbox
          class="el-transfer-panel__item"
          v-for="item in data"
          :label="item.key"
          :disabled="item.disabled || operator == 'view'"
          :key="item.key">
          <option-content :option="item"></option-content>
        </el-checkbox>
        <p class="el-transfer-panel__empty" style="font-size: 14px;" v-if="data.length == 0">noData</p>
      </el-checkbox-group>
    </div>
    <div  v-show="!checkboxCtrl" class="el-transfer-panel__body" style="overflow: auto;" @scroll="perScroll">
      <div class="accessRow" style="height: 29px; line-height: 29px;" v-for="item in data">
        <sFormItem2>
          <el-input v-model="item.dataPerTime" placeholder="请输入时长" :disabled="operator == 'view'"></el-input>
        </sFormItem2>
        <sFormItem2>
          <sSelect v-model="item.dataPerTimeUnit" option="TIME_UNIT" :disabled="operator == 'view'" clear></sSelect>
        </sFormItem2>
      </div>
      <p class="el-transfer-panel__empty" style="padding-top: 12px;" v-show="data.length == 0">noData</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TransferPanel",
    props: {
      checkboxCtrl: Boolean,
      title: String,
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      operator: {
        type: String
      }
    },
    data() {
      return {
        checked: [],
        allChecked: false,
        format: {
          type: Object,
          default() {
            return {};
          }
        },
        checkChangeByUser: true
      }
    },
    watch: {
      checked(newVal, oldVal) {
        this.updateAllChecked();
      },
      data() {
        const checked = [];
        const filteredDataKeys = this.data.map(item => item[this.key]);
        this.checked.forEach(item => {
          if (filteredDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      },
      checkableData() {
        this.updateAllChecked();
      },
    },
    computed: {
      // 过滤
      checkableData() {
        return this.data.filter(item => !item.disabled);
      },

      isIndeterminate() {
        const checkedLength = this.checked.length;
        return checkedLength > 0 && checkedLength < this.checkableData.length;
      },

      // 计算总数
      checkedSummary() {
        const checkedLength = this.checked.length;
        const dataLength = this.data.length;
        const { noChecked, hasChecked } = this.format;
        if (noChecked && hasChecked) {
          return checkedLength > 0
            ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
            : noChecked.replace(/\${total}/g, dataLength);
        } else {
          return `${ checkedLength }/${ dataLength }`;
        }
      },
    },
    components: {
      OptionContent: {
        props: {
          option: Object
        },
        render(h) {
          const getParent = vm => {
            if (vm.$options.componentName === 'TransferPanel') {
              return vm;
            } else if (vm.$parent) {
              return getParent(vm.$parent);
            } else {
              return vm;
            }
          };
          const panel = getParent(this);
          const transfer = panel.$parent || panel;
          return panel.renderContent
            ? panel.renderContent(h, this.option)
            : transfer.$scopedSlots.default
              ? transfer.$scopedSlots.default({ option: this.option })
              : <span>{ this.option.label }</span>;
        }
      }
    },
    methods: {
      // target滚动事件
      targetScroll(e) {
        e.path[3].lastElementChild.lastElementChild.scrollTop = e.target.scrollTop;
      },

      // 持久化设置滚动事件
      perScroll(e) {
        e.path[2].children[2].children[1].children[0].scrollTop = e.target.scrollTop;
      },

      // 全选功能
      handleAllCheckedChange(value) {
        this.checked = value ? this.checkableData.map(item => item.key) : [];
        this.$emit('disabledChanged', [this.title, this.checked]);
      },

      // 更新全选状态
      updateAllChecked() {
        const checkableDataKeys = this.checkableData.map(item => item.key);
        if (checkableDataKeys && checkableDataKeys.length > 0) {
          checkableDataKeys.map((item) => {
            if (this.checked.indexOf(item) > -1) {
              this.allChecked = true;
            } else {
              this.allChecked = false;
            }
          })
        } else {
          this.allChecked = false;
        }
        this.$emit('disabledChanged', [this.title, this.checked]);
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-input--small .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }

  /deep/ .el-transfer-panel__header > .el-checkbox {
    margin-right: 0 !important;
  }

  /deep/ .el-transfer-panel__header > .el-checkbox > .el-checkbox__label {
    font-size: 14px;
  }

  /deep/ .el-transfer-panel__body > .el-checkbox-group > .el-checkbox > .el-checkbox__label > span {
    font-size: 12px !important;
  }

  /deep/ .el-transfer-panel__body > .accessRow {
    padding: 0 10px !important;
  }

  /deep/ .el-transfer-panel__body > .accessRow > .el-col {
    height: 30px !important;
  }

  /deep/ .el-transfer-panel__body > .accessRow:first-child {
    margin-top: 5px !important;
  }

  /deep/ .el-transfer-panel__body > .accessRow:last-child {
    margin-bottom: 6px !important;
  }

  /deep/ .el-transfer-panel__body > .accessRow .el-form-item {
    margin: 0 !important;
  }
</style>
