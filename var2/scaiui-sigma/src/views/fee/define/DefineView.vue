<template>
  <div>
    <!--主体-->
    <el-form :model="defineData" ref="editDefine" label-width="120px">
      <el-row>
        <sFormItem2 required style="width: 100%;" :label="$t('fee.feeId')">
          <el-input style="width: 35% !important;" v-model="defineData.feeId" @input="validateFeeId($event, 'defineFeeIdRef')" :disabled="operator=='edit'"></el-input>
          <div ref="defineFeeIdRef" class="el-form-item__error" v-show="feeIdCtrl">{{$t('fee.feeId')}}{{$t('fee.defineFeeIdTips')}}</div>
        </sFormItem2>
        <!--内买断-->
        <sFormItem2 required :label="$t('fee.feeBuyallIns')">
          <el-input v-model="defineData.feeBuyallIn" maxLength="20" @input="validateFeeAndRate($event, 'fee', 'defineFeeBuyallInRef', 'feeBuyallIn')"></el-input>
          <div ref="defineFeeBuyallInRef" class="el-form-item__error" v-show="feeBuyallInCtrl">{{$t('fee.feeRange')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.rateBuyallIns')">
          <el-input v-model="defineData.feeBuyallDiscIn" @input="validateFeeAndRate($event, 'rate', 'defineRateBuyallInRef', 'rateBuyallIn')" :placeholder="$t('fee.ratePlaceholder')" suffix-icon="el-icon-erp-percent"></el-input>
          <div ref="defineRateBuyallInRef" class="el-form-item__error" v-show="rateBuyallInCtrl">{{$t('fee.rateRange')}}</div>
        </sFormItem2>
        <!--外买断-->
        <sFormItem2 required :label="$t('fee.feeBuyallOuts')">
          <el-input v-model="defineData.feeBuyallOut" maxLength="20" @input="validateFeeAndRate($event, 'fee', 'defineFeeBuyallOutRef', 'feeBuyallOut')"></el-input>
          <div ref="defineFeeBuyallOutRef" class="el-form-item__error" v-show="feeBuyallOutCtrl">{{$t('fee.feeRange')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.rateBuyallOuts')">
          <el-input v-model="defineData.feeBuyallDiscOut" @input="validateFeeAndRate($event, 'rate', 'defineRateBuyallOutRef', 'rateBuyallOut')" :placeholder="$t('fee.ratePlaceholder')" suffix-icon="el-icon-erp-percent"></el-input>
          <div ref="defineRateBuyallOutRef" class="el-form-item__error" v-show="rateBuyallOutCtrl">{{$t('fee.rateRange')}}</div>
        </sFormItem2>
        <!--内包月-->
        <sFormItem2 required :label="$t('fee.feeMonthlyIns')">
          <el-input v-model="defineData.feeMonthlyIn" maxLength="20" @input="validateFeeAndRate($event, 'fee', 'defineFeeMonthlyInRef', 'feeMonthlyIn')"></el-input>
          <div ref="defineFeeMonthlyInRef" class="el-form-item__error" v-show="feeMonthlyInCtrl">{{$t('fee.feeRange')}}</div>
        </sFormItem2>
        <sFormItem2 :required="true" :label="$t('fee.rateMonthlyIns')">
          <el-input v-model="defineData.feeMonthlyDiscIn" @input="validateFeeAndRate($event, 'rate', 'defineRateMonthlyInRef', 'rateMonthlyIn')" :placeholder="$t('fee.ratePlaceholder')" suffix-icon="el-icon-erp-percent"></el-input>
          <div ref="defineRateMonthlyInRef" class="el-form-item__error" v-show="rateMonthlyInCtrl">{{$t('fee.rateRange')}}</div>
        </sFormItem2>
        <!--外包月-->
        <sFormItem2 required :label="$t('fee.feeMonthlyOuts')">
          <el-input v-model="defineData.feeMonthlyOut" maxLength="20" @input="validateFeeAndRate($event, 'fee', 'defineFeeMonthlyOutRef', 'feeMonthlyOut')"></el-input>
          <div ref="defineFeeMonthlyOutRef" class="el-form-item__error" v-show="feeMonthlyOutCtrl">{{$t('fee.feeRange')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.rateMonthlyOuts')">
          <el-input v-model="defineData.feeMonthlyDiscOut" @input="validateFeeAndRate($event, 'rate', 'defineRateMonthlyOutRef', 'rateMonthlyOut')" :placeholder="$t('fee.ratePlaceholder')" suffix-icon="el-icon-erp-percent"></el-input>
          <div ref="defineRateMonthlyOutRef" class="el-form-item__error" v-show="rateMonthlyOutCtrl">{{$t('fee.rateRange')}}</div>
        </sFormItem2>
        <!--内单-->
        <sFormItem2 required :label="$t('fee.feeSingleIns')">
          <el-input v-model="defineData.feeSingleIn" maxLength="20" @input="validateFeeAndRate($event, 'fee', 'defineFeeSingleInRef', 'feeSingleIn')"></el-input>
          <div ref="defineFeeSingleInRef" class="el-form-item__error" v-show="feeSingleInCtrl">{{$t('fee.feeRange')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.rateSingleIns')">
          <el-input v-model="defineData.feeSingleDiscIn" @input="validateFeeAndRate($event, 'rate', 'defineRateSingleInRef', 'rateSingleIn')" :placeholder="$t('fee.ratePlaceholder')" suffix-icon="el-icon-erp-percent"></el-input>
          <div ref="defineRateSingleInRef" class="el-form-item__error" v-show="rateSingleInCtrl">{{$t('fee.rateRange')}}</div>
        </sFormItem2>
        <!--外单-->
        <sFormItem2 required :label="$t('fee.feeSingleOuts')">
          <el-input v-model="defineData.feeSingleOut" maxLength="20" @input="validateFeeAndRate($event, 'fee', 'defineFeeSingleOutRef', 'feeSingleOut')"></el-input>
          <div ref="defineFeeSingleOutRef" class="el-form-item__error" v-show="feeSingleOutCtrl">{{$t('fee.feeRange')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.rateSingleOuts')">
          <el-input v-model="defineData.feeSingleDiscOut" @input="validateFeeAndRate($event, 'rate', 'defineRateSingleOutRef', 'rateSingleOut')" :placeholder="$t('fee.ratePlaceholder')" suffix-icon="el-icon-erp-percent"></el-input>
          <div ref="defineRateSingleOutRef" class="el-form-item__error" v-show="rateSingleOutCtrl">{{$t('fee.rateRange')}}</div>
        </sFormItem2>
        <!--另外三个字段-->
        <sFormItem2 required :label="$t('fee.autoMonthlyCycle')">
          <el-radio style="margin-left: 10px;" v-model="defineData.autoMonthlyCycle" label="Y">{{$t('yes')}}</el-radio>
          <el-radio style="margin-left: 10px;" v-model="defineData.autoMonthlyCycle" label="N">{{$t('no')}}</el-radio>
          <div class="el-form-item__error" v-show="autoMonthlyCycleCtrl">{{$t('pleaseSelect')}}{{$t('fee.autoMonthlyCycle')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.autoContinueDisc')">
          <el-radio v-model="defineData.autoContinueDisc" label="Y">{{$t('yes')}}</el-radio>
          <el-radio v-model="defineData.autoContinueDisc" label="N" style="margin-left: 10px;">{{$t('no')}}</el-radio>
          <div class="el-form-item__error" v-show="autoContinueDiscCtrl">{{$t('pleaseSelect')}}{{$t('fee.autoContinueDisc')}}</div>
        </sFormItem2>
        <sFormItem2 required :label="$t('fee.effectiveDate')">
          <el-date-picker v-model="defineData.effectDate" :placeholder="$t('pleaseSelect')+$t('fee.effectiveDate')" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          <div class="el-form-item__error" v-show="effectiveDateCtrl">{{$t('pleaseSelect')}}{{$t('fee.effectiveDate')}}</div>
        </sFormItem2>
      </el-row>
      <el-row>
        <sFormItem2 align="right" col-span="24">
          <el-button v-show="operator!='view'" type="primary" @click="handleSubmit('editDefine')">{{$t('ok')}}</el-button>
          <el-button @click="handleCancel">{{$t('cancel')}}</el-button>
        </sFormItem2>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { valiEmpty, valiFeeId, valiFeeAndRate } from '../../../assets/js/validate.js'
  export default {
    name: "DefineView",
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
      defineData: {type: Object}
    },
    data() {
      return {
        initDefineData: {},
        sendInfo: [],
        respondInfo: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        radio1: '',
        radio2: '',
        feeIdCtrl: false,
        feeBuyallInCtrl: false,
        rateBuyallInCtrl: false,
        feeBuyallOutCtrl: false,
        rateBuyallOutCtrl: false,
        feeMonthlyInCtrl: false,
        rateMonthlyInCtrl: false,
        feeMonthlyOutCtrl: false,
        rateMonthlyOutCtrl: false,
        feeSingleInCtrl: false,
        rateSingleInCtrl: false,
        feeSingleOutCtrl: false,
        rateSingleOutCtrl: false,
        autoMonthlyCycleCtrl: false,
        autoContinueDiscCtrl: false,
        effectiveDateCtrl: false
      }
    },
    methods: {
      // 校验费用编号  费用编号只能输入数字或字母
      validateFeeId(evt, ref) {
        if (valiFeeId(evt, ref, this)) {
          this.feeIdCtrl = true;
        } else {
          this.feeIdCtrl = false;
        }
      },

      // 校验所有费用和费率
      validateFeeAndRate(evt, flag, ref, ctrl) {
        if (valiFeeAndRate(evt, flag, ref, this)) {
          this[ctrl + 'Ctrl'] = true;
        } else {
          this[ctrl + 'Ctrl'] = false;
        }
      },

      // 获取传递过来的数据
      getInitDefineData(data) {
        this.initDefineData = Object.assign({}, data);
      },

       // 取消功能
      handleCancel() {
        this.feeIdCtrl = false;
        this.feeBuyallInCtrl = false;
        this.rateBuyallInCtrl = false;
        this.feeBuyallOutCtrl = false;
        this.rateBuyallOutCtrl = false;
        this.feeMonthlyInCtrl = false;
        this.rateMonthlyInCtrl = false;
        this.feeMonthlyOutCtrl = false;
        this.rateMonthlyOutCtrl = false;
        this.feeSingleInCtrl = false;
        this.rateSingleInCtrl = false;
        this.feeSingleOutCtrl = false;
        this.rateSingleOutCtrl = false;
        this.autoMonthlyCycleCtrl = false;
        this.autoContinueDiscCtrl = false;
        this.effectiveDateCtrl = false;
        Object.assign(this.$options.propsData.defineData, this.initDefineData);
        this.$emit('closeDialog', false);
      },

      // 确认功能
      handleSubmit() {
        for(var key in this.defineData) {
          if (valiEmpty(this.defineData[key])) {
            this.$message({
              showClose: true,
              message: this.$t('mustRequired'),
              type: 'error'
            });
            return;
          }
        }
        if (!this.feeIdCtrl && !this.feeBuyallInCtrl && !this.rateBuyallInCtrl && !this.feeBuyallOutCtrl && !this.rateBuyallOutCtrl && !this.feeMonthlyInCtrl && !this.rateMonthlyInCtrl
          && !this.feeMonthlyOutCtrl && !this.rateMonthlyOutCtrl && !this.feeSingleInCtrl && !this.rateSingleInCtrl && !this.feeSingleOutCtrl && !this.rateSingleOutCtrl
          && !this.autoMonthlyCycleCtrl && !this.autoContinueDiscCtrl && !this.effectiveDateCtrl) {
          if (this.operator === "edit") {
            this.$service.put('/fee/feeInfoDefines', this.defineData)
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
          } else {
            this.$service.post('/fee/feeInfoDefines', this.defineData)
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
        } else {
          return;
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

  .el-input {
    width: 85% !important;
  }
</style>
