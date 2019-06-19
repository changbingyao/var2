<template>
  <div style="width: 93%;">
    <el-form :model="currentRow" :rules="rules" ref="feeRuleView" label-width="120px">
      <el-row>
        <sFormItem2 style="width: 100%;" :label="$t('feeRule.interfaceType')" prop="interfaceType">
          <el-radio label="A" v-model="currentRow.interfaceType" @change="getInterList" :disabled="operator!='add'">{{$t('feeRule.OutInterface')}}</el-radio>
          <el-radio label="B" v-model="currentRow.interfaceType" @change="getInterList" :disabled="operator!='add'">{{$t('feeRule.InInterface')}}</el-radio>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" v-if="currentRow.interfaceType == 'B'" :label="$t('batch.access')" prop="reqSystem">
          <sSelect style="width: 100%;" @change="changeReqSystem" v-model="currentRow.reqSystem" :option="reqSystemList" :disabled="operator!='add'" :placeholder="$t('placeholder.select',[$t('batch.access')])"></sSelect>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('feeRule.interfaceSelect')" prop="idStr">
          <sSelect style="width: 100%;" multiple v-model="currentRow.idStr" :option="interfaceNameList" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('feeRule.interfaceSelect')])"></sSelect>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('interface.feeCode')" prop="costCode">
          <sSelect style="width: 100%;" v-model="currentRow.costCode" :option="feeCodeList" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('interface.feeCode')])"></sSelect>
        </sFormItem2>
        <sFormItem2 :label="$t('log.startDate')" prop="startTime">
          <el-date-picker style="width: 100%;" v-model="currentRow.startTime" value-format="yyyy-MM-dd" type="date" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('log.startDate')])"></el-date-picker>
        </sFormItem2>
        <sFormItem2 :label="$t('log.endDate')" prop="endTime">
          <el-date-picker style="width: 100%;" v-model="currentRow.endTime" value-format="yyyy-MM-dd" type="date" :disabled="operator=='view'" :placeholder="$t('placeholder.select',[$t('log.endDate')])"></el-date-picker>
        </sFormItem2>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
          <el-button class="baseBlue" v-show="operator!='view'" @click="handleSubmit('feeRuleView')">{{$t('ok')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "FeeRuleView",
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
      reqSystemList: {type: Array},
      currentRow: {type: Object},
      initCurrentRow: {}
    },
    data() {
      return {
        interfaceNameList: [],
        feeCodeList: [],
        offset: 0,
        rules: {
          interfaceType: [{required: true, message: this.$t('placeholder.select', [this.$t('feeRule.interfaceType')]), trigger: 'change'}],
          reqSystem: [{required: true, message: this.$t('placeholder.select', [this.$t('batch.access')]), trigger: 'change'}],
          idStr: [{required: true, message: this.$t('placeholder.select', [this.$t('feeRule.interfaceSelect')]), trigger: 'change'}],
          costCode: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.feeCode')]), trigger: 'change'}],
          startTime: [{required: true, message: this.$t('placeholder.select', [this.$t('log.startDate')]), trigger: 'change'}],
          endTime: [{required: true, message: this.$t('placeholder.select', [this.$t('log.endDate')]), trigger: 'change'}]
        }
      }
    },
    methods: {
      // 接入商改变时
      changeReqSystem(val) {
        this.reqSystemList.find((item)=>{
          if (item.value == val) {
            this.currentRow.reqSystemName = item.label;
          }
        });
      },

      // 获取接口名称列表
      getInterList() {
        this.$service.get('/interface/interfaceInfo', {params: {offset: this.offset, interfaceType: this.currentRow.interfaceType}})
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.interfaceNameList = [];
                r.data.data.map(item => {
                  this.interfaceNameList.push({label: item.interfaceName, value: item.interfaceId})
                });
              }
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

      // 获取计费代码列表
      getFeeCodeList() {
        this.$service.get('/fee/feeQueryDefines/FeeQueryManage', {params: {offset: this.offset, limit: 100000}})
          .then(r => {
            if (r.data.code === '000000') {
              if (r.data.data) {
                this.feeCodeList = [];
                r.data.data.rows.map(item => {
                  this.feeCodeList.push({label: item.costCode, value: item.costCode})
                });
                this.feeCodeList = this.unique(this.feeCodeList);
              }
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

      // 去重功能
      unique(arr) {
        const res = [arr[0]];
        for (var i = 1; i < arr.length; i++){
          var repeat = false;
          for(var j=0; j < res.length; j++ ){
            if (arr[i].value == res[j].value) {
              repeat = true;
              break;
            }
          }
          if(!repeat) {
            res.push(arr[i]);
          }
        }
        return res;
      },

      // 提交功能
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.feeRuleEdit();
            } else {
              this.feeRuleAdd();
            }
          }
        });
      },

      // 添加功能
      feeRuleAdd() {
        this.$service.post('/fee/feeRuleDefine', this.currentRow)
          .then(r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$message({
                showClose: true,
                message: r.data.msg,
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
      feeRuleEdit() {
        this.$service.put('/fee/feeRuleDefine', this.currentRow)
          .then(r => {
            if (r.data.code === '000000') {
              this.handleCancel();
              this.$message({
                showClose: true,
                message: r.data.msg,
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

      // 取消功能
      handleCancel() {
        this.handleClear();
        this.$emit('closeModal');
        this.$emit('loadData');
      },

      // 清空验证
      handleClear() {
        this.$refs.feeRuleView.clearValidate();
        // this.$options.propsData.currentRow = {};
        // Object.assign(this.$options.propsData.currentRow, {});
        // console.log(this.$options.propsData.currentRow);
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
