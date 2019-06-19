<template>
  <div style="width: 92%;">
    <el-form :model="currentRow" :rules="rules" ref="routeEditForm" label-width="120px">
      <el-row>
        <sFormItem2 style="width: 100%;" :label="$t('routes.routeName')" prop="routeName">
          <el-input style="width: 100%;" v-model="currentRow.routeName" :disabled="operator=='view'"></el-input>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('routes.serveInterfaceName')" prop="interfaceInfos">
          <sSelect style="width: 100%;" multiple v-model="currentRow.interfaceInfos" :option="serveInterfaceOptions" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.serveInterfaceName')])" clearable></sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('routes.switchType')" prop="switchType">
          <sSelect v-model="currentRow.switchType" @change="changeType" option="SWITCH_TYPE" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.switchType')])" clearable></sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('routes.switchCondition')" prop="switchCond">
          <sSelect v-model="currentRow.switchCond" option="SWITCH_COND" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.switchCondition')])"></sSelect>
        </sFormItem2>
        <!--线路1-->
        <sFormItem2 :label="$t('basicInfoOne')">
          <sSelect v-show="currentRow.switchType == '1'" style="width: 100%;" @change="changeLine" v-model="line1" :option="lineOptions" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.line')])"></sSelect>
          <el-input v-show="currentRow.switchType == '2'" maxLength="3" style="width: 100%;" @input="changeProporation" v-model="proporation[0]" :disabled="operator=='view'" :placeholder="$t('routes.range')" clearable suffix-icon="el-icon-erp-percent"></el-input>
        </sFormItem2>
        <!--线路2-->
        <sFormItem2 :label="$t('basicInfoTwo')">
          <sSelect v-show="currentRow.switchType == '1'" style="width: 100%;" @change="changeLine" v-model="line2" :option="lineOptions" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.line')])"></sSelect>
          <el-input v-show="currentRow.switchType == '2'" :disabled="operator=='view' || line2Ctrl" maxLength="3" style="width: 100%;" @input="changeProporation" v-model="proporation[1]" :placeholder="$t('routes.range')" clearable suffix-icon="el-icon-erp-percent"></el-input>
        </sFormItem2>
        <!--线路3-->
        <sFormItem2 :label="$t('basicInfoThree')">
          <sSelect v-show="currentRow.switchType == '1'" style="width: 100%;" @change="changeLine" v-model="line3" :option="lineOptions" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.line')])"></sSelect>
          <el-input v-show="currentRow.switchType == '2'" :disabled="operator=='view' || line3Ctrl" maxLength="3" style="width: 100%;" @input="changeProporation" v-model="proporation[2]" :placeholder="$t('routes.range')" clearable suffix-icon="el-icon-erp-percent"></el-input>
        </sFormItem2>
        <!--线路4-->
        <sFormItem2 :label="$t('basicInfoFour')">
          <sSelect v-show="currentRow.switchType == '1'" style="width: 100%;" @change="changeLine" v-model="line4" :option="lineOptions" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('routes.line')])"></sSelect>
          <el-input v-show="currentRow.switchType == '2'" :disabled="operator=='view' || line4Ctrl" maxLength="3" style="width: 100%;" @input="changeProporation" v-model="proporation[3]" :placeholder="$t('routes.range')" clearable suffix-icon="el-icon-erp-percent"></el-input>
        </sFormItem2>
      </el-row>
      <!--footer部分-->
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" v-permission="'save','保存'" @click="handleSubmit('routeEditForm')" v-show="operator!='view'">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "RouteEdit",
    model: {
      prop: 'dialogIsVisible',
      event: 'closeDialog'
    },
    props: {
      dialogIsVisible: {
        required: true
      },
      operator: {
        type: String,
        required: true
      },
      currentRow: {type: Object}
    },
    data() {
      return {
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        proporation: ['', '', '', ''],
        initCurrentRow: {},
        serveInterfaceOptions: [],
        lineOptions: [],
        //校验输入
        rules: {
          routeName: [{required: true, message: this.$t('placeholder.default', [this.$t('routes.routeName')]), trigger: 'blur'}],
          interfaceInfos: [{required: true, message: this.$t('placeholder.select', [this.$t('routes.serveInterfaceName')]), trigger: 'change'}],
          switchType: [{required: true, message: this.$t('placeholder.select', [this.$t('routes.switchType')]), trigger: 'change'}],
          switchCond: [{required: true, message: this.$t('placeholder.select', [this.$t('routes.switchCondition')]), trigger: 'change'}]
        }
      }
    },
    watch: {
      currentRow: function (newVal, oldVal) {
        if (newVal) {
          if (newVal.switchType == 1) {
            this.line1 = newVal.line1;
            this.line2 = newVal.line2;
            this.line3 = newVal.line3;
            this.line4 = newVal.line4;
          } else if (newVal.switchType == 2) {
            this.proporation[0] = newVal.line1;
            this.proporation[1] = newVal.line2;
            this.proporation[2] = newVal.line3;
            this.proporation[3] = newVal.line4;
          }
          this.handleClear();
          this.currentRow = newVal;
        }
      },

      proporation: function(newVal) {
        if (newVal) {
          newVal.forEach((val, i) => {
            if (parseInt(val) > 100 || parseInt(val) === 0) {
              newVal[i] = '';
            }  else if (newVal[i] && newVal[i].length > 1 && newVal[i].charAt(0) == '0') {
              newVal[i] = '';
            }
          });
        }
      }
    },
    computed: {
      line2Ctrl() {
        return this.isEmpty(this.proporation[0]);
      },
      line3Ctrl() {
        return this.isEmpty(this.proporation[0]) || this.isEmpty(this.proporation[1]);
      },
      line4Ctrl() {
        return this.isEmpty(this.proporation[0]) || this.isEmpty(this.proporation[1]) || this.isEmpty(this.proporation[2]);
      }
    },
    methods: {
      // 初始化数据
      getCurrentRowData(data) {
        this.initCurrentRow = Object.assign({}, data);
      },

      // 查询所有内部服务接口名称
      getInterfaceList(id, flg) {
        this.$service.get('/interface/routeConfigs/interfaceList', {params: {routeId: id, flg: flg}})
          .then( r => {
            if (r.data.code === '000000') {
              this.serveInterfaceOptions = [];
              r.data.data.forEach((item) => {
                this.serveInterfaceOptions.push({label: item.interfaceName, value: item.interfaceId});
              })
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
      },

      // 查询所有线路下拉框值
      getLineOptions() {
        this.$service.get('/plist/LINE_TYPE', {params: {locale: this.$i18n.locale}}).then(r => {
          if (r.data.code === '000000') {
            this.lineOptions = [];
            r.data.data.forEach((item) => {
              if (this.operator == 'add') {
                this.lineOptions.push({label: item.label, value: item.value, disabled: false});
              } else {
                this.lineOptions.push({label: item.label, value: item.value, disabled: false});
                this.changeLine();
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: r.data.msg,
              type: 'error'
            });
          }
          window.sessionStorage.setItem('_DICT_' + this.option, JSON.stringify(r.data.data));
        }).catch(err => {
            this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },

      // 切换方式改变时触发
      changeType(val) {
        if (val == 1) {
          this.currentRow.line1 = this.line1;
          this.currentRow.line2 = this.line2;
          this.currentRow.line3 = this.line3;
          this.currentRow.line4 = this.line4;
        } else if (val == 2) {
          this.currentRow.line1 = this.proporation[0];
          this.currentRow.line2 = this.proporation[1];
          this.currentRow.line3 = this.proporation[2];
          this.currentRow.line4 = this.proporation[3];
        }
      },

      // 线路改变时触发
      changeLine() {
        var lineList = [this.line1, this.line2, this.line3, this.line4];
        for(var j = 0; j < this.lineOptions.length; j++) {
          let flag = false;
          for(let i = 0; i < lineList.length; i++) {
            if (lineList[i] == this.lineOptions[j].value) {
                flag = true;
                break;
            }
          }
          if (flag) {
            this.lineOptions[j].disabled = true;
          } else {
            this.lineOptions[j].disabled = false;
          }
        }
      },

      // 权重改变时触发
      changeProporation(val) {
        if (!/^[0-9]*$/.test(val)) {
          this.proporation.forEach((item, i) => {
            if (val == item) {
              this.proporation[i] = '';
            }
          });
        }
      },

      // 清空验证
      handleClear() {
        this.$refs.routeEditForm.clearValidate();
      },

      // 取消功能
      handleCancel() {
        this.handleClear();
        this.line1 = '';
        this.line2 = '';
        this.line3 = '';
        this.line4 = '';
        this.proporation = ['', '', '', ''];
        Object.assign(this.$options.propsData.currentRow, this.initCurrentRow);
        this.$emit('closeDialog', false);
      },

      // 确认提交功能
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.currentRow.switchType == 1) {
              this.currentRow.line1 = this.line1;
              this.currentRow.line2 = this.line2;
              this.currentRow.line3 = this.line3;
              this.currentRow.line4 = this.line4;
            } else if (this.currentRow.switchType == 2) {
              let sum = 0;
              this.proporation.forEach((item, i) => {
                if (!this.isEmpty(item)) {
                  sum = sum + parseInt(item);
                }
              });
              if (sum != 100) {
                this.$message({
                  showClose: true,
                  message: this.$t('routes.totalRange'),
                  type: 'warning'
                });
                return;
              } else {
                this.currentRow.line1 = this.proporation[0];
                this.currentRow.line2 = this.proporation[1];
                this.currentRow.line3 = this.proporation[2];
                this.currentRow.line4 = this.proporation[3];
              }
            }
            if (this.operator == "edit") {
              this.routeEdit();
            } else {
              this.routeAdd();
            }
          } else {
            return;
          }
        });
      },

      // 添加功能
      routeAdd() {
        this.$service.post('/interface/routeConfigs', this.currentRow)
          .then( r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      },

      // 编辑功能
      routeEdit() {
        this.$service.put('/interface/routeConfigs', this.currentRow)
          .then( r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$emit('loadData');
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-transfer > .el-transfer-panel {
    width: 40% !important;
  }

  /deep/ .el-select .el-select--small {
    width: 100% !important;
  }
</style>
