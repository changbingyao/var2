<template>
  <div>
    <!--主体-->
    <el-form label-width="120px">
      <el-row>
        <sFormItem2 style="width: 100%" :label="$t('fee.vendorName')" prop="vendorName">
          <el-input style="width: 85%;" v-model="currentRow.vendorName" :disabled="operator=='edit'"></el-input>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('interface.interfaceName')" prop="interfaceName">
          <el-input style="width: 85%;" v-model="currentRow.interfaceName" :disabled="operator=='edit'"></el-input>
        </sFormItem2>
        <sFormItem2 style="width: 100%;" :label="$t('fee.packageType')" prop="packageType">
          <sSelect style="width: 85%;" :option="packageTypeList" v-model="currentRow.feeId"></sSelect>
        </sFormItem2>
        <!--是否-->
        <el-radio-group v-model="radioValue">
          <sFormItem2 style="width: 100%" :label="$t('interface.feeBuyall')" prop="feeBuyall">
            <el-radio :label="1">{{$t('yes')}}</el-radio>
          </sFormItem2>
          <sFormItem2 style="width: 100%" :label="$t('interface.feeMonthly')" prop="feeMonthly">
            <el-radio :label="2">{{$t('yes')}}</el-radio>
            <span style="margin: 0 10px 0 100px;">{{$t('interface.feeMonthlyEnd')}}</span>
            <el-date-picker :placeholder="$t('pleaseSelect')+$t('fee.feeDate')" v-model="currentRow.crtDate" :disabled="radioValue != 2" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </sFormItem2>
          <sFormItem2 style="width: 100%" :label="$t('interface.feeSingle')" prop="feeBuyall">
            <el-radio :label="3">{{$t('yes')}}</el-radio>
          </sFormItem2>
        </el-radio-group>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button type="primary" @click="handleSubmit()" v-show="operator!='view'">{{$t('ok')}}</el-button>
          <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "RateView",
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
      }
    },
    data() {
      return {
        feeSingleRate: '',
        radioValue: '',
        initCurrentRow: {},
        currentRow: {},
        packageTypeList: []   //套餐类型
      }
    },
    watch: {
      currentRow(newVal) {
        this.currentRow = newVal;
        if (this.currentRow.feeBuyall == 'Y' && this.currentRow.feeMonthly == 'Y') {
          this.radioValue = 3;
        } else if (this.currentRow.feeBuyall == 'N' && this.currentRow.feeMonthly == 'Y') {
          this.radioValue = 2;
        } else if (this.currentRow.feeBuyall == 'Y' && this.currentRow.feeMonthly == 'N') {
          this.radioValue = 1;
        } else {
          this.radioValue = '';
        }
      }
    },
    methods: {
      // 获取传递过来的数据
      getCurrentRowData(data) {
        this.currentRow = data;
        this.initCurrentRow = Object.assign({}, data);
        if (this.currentRow.feeBuyall == 'Y' && this.currentRow.feeMonthly == 'Y') {
          this.radioValue = 3;
        } else if (this.currentRow.feeBuyall == 'N' && this.currentRow.feeMonthly == 'Y') {
          this.radioValue = 2;
        } else if (this.currentRow.feeBuyall == 'Y' && this.currentRow.feeMonthly == 'N') {
          this.radioValue = 1;
        } else {
          this.radioValue = '';
        }
      },

      // 套餐类型查询
      getPackageList() {
        this.$service.get('/fee/feeInfoDefines', {params: {limit: this.$pageSize, offset: 1, feeId: ''}})
          .then( r=> {
            if (r.data.code === '000000') {
              this.packageTypeList = [];
              r.data.data.rows.forEach((item) => {
                this.packageTypeList.push({label: item.feeId, value: item.feeId});
              });
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
          })
      },

      // 取消功能
      handleCancel() {
        this.currentRow.feeId = this.initCurrentRow.feeId;
        this.currentRow.crtDate = this.initCurrentRow.crtDate;
        this.$emit('closeDialog', false);
      },

      // 确认功能
      handleSubmit() {
        if (this.operator == "edit") {
          if (this.radioValue === 3) {
            this.currentRow.feeBuyall = 'Y';
            this.currentRow.feeMonthly = 'Y';
          } else if (this.radioValue === 2) {
            this.currentRow.feeBuyall = 'N';
            this.currentRow.feeMonthly = 'Y';
          } else if (this.radioValue === 1) {
            this.currentRow.feeBuyall = 'Y';
            this.currentRow.feeMonthly = 'N';
          }
          this.$service.put('/interface/interfaceInfo', this.currentRow)
            .then(r => {
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
                });
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
  }
</script>

<style lang="scss" scoped>
  .external-header-box {
    width: 100%;
    height: 15vh;
    text-align: center;
    .box-card {
      display: inline-block;
      width: 14%;
      height: 90%;
      margin-right: 50px;
      padding: 10px;
      border-top-left-radius: 25px;
      color:#fff;
      .el-card__body {
        padding: 0px !important;
      }
      .box-card-title {
        display: inline-block;
        margin: 10px 0 0 10px;
        font-size: 12px;
      }
      .box-card-total {
        font-size: 26px;
        margin: 10px 0;
        text-align: center;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .cost-el-form-item {
    display: inline-block;
  }
</style>
