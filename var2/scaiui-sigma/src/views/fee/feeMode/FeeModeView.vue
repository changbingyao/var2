<template>
  <div>
    <el-form :model="currentRow" :rules="rules" ref="feeModeView" label-width="120px">
      <!--基本信息-->
      <el-row class="leftLine">
        <i></i>{{$t('basicinfo')}}
      </el-row>
      <el-row>
        <sFormItem2 :label="$t('interface.feeCode')" prop="costCode">
          <el-input v-model="currentRow.costCode" :placeholder="$t('placeholder.default',[$t('interface.feeCode')])" :disabled="operator=='view' || operator=='edit'"></el-input>
        </sFormItem2>
        <sFormItem2 style="width: 50%;" :label="$t('interface.feeType')" prop="costTypeRange">
          <sSelect v-model="currentRow.costTypeRange" style="width: 100%;" option="COST_TYPE" :placeholder="$t('placeholder.select',[$t('interface.feeType')])" :disabled="operator=='view'"></sSelect>
        </sFormItem2>
        <sFormItem2 style="width: 100%;margin-bottom: -15px;" :label="$t('feeMode.feeDesc')">
          <textarea v-model="currentRow.costDescribe" name="1" id="1" cols="10" rows="2" :disabled="operator=='view'" class="textArea"></textarea>
        </sFormItem2>
      </el-row>
      <!--单笔计费-->
      <div v-if="currentRow.costTypeRange == '1'">
        <el-row class="leftLine">
          <i></i>{{$t('feeMode.singleInfo')}}
        </el-row>
        <el-row>
          <sFormItem2 :label="$t('feeMode.price')" prop="singleCostPrice">
            <el-input v-model="currentRow.singleCostPrice" :placeholder="$t('placeholder.default',[$t('feeMode.price')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 :label="$t('feeMode.discount')" prop="singleDiscount">
            <el-input v-model="currentRow.singleDiscount" :placeholder="$t('placeholder.default',[$t('feeMode.discount')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
        </el-row>
      </div>
      <!--包月-->
      <div v-if="currentRow.costTypeRange == '2'">
        <el-row class="leftLine">
          <i></i>{{$t('feeMode.monthInfo')}}
        </el-row>
        <el-row>
          <sFormItem2 :label="$t('feeMode.price')" prop="monthCostPrice">
            <el-input v-model="currentRow.monthCostPrice" :placeholder="$t('placeholder.default',[$t('feeMode.price')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 :label="$t('feeMode.discount')" prop="monthDiscount">
            <el-input v-model="currentRow.monthDiscount" :placeholder="$t('placeholder.default',[$t('feeMode.discount')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 :label="$t('feeMode.upperLimit')" prop="monthCostOver">
            <el-input v-model="currentRow.monthCostOver" :placeholder="$t('placeholder.default',[$t('feeMode.upperLimit')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 style="width: 50%;" :label="$t('feeMode.exceed')" prop="monthCostOverType">
            <sSelect v-model="currentRow.monthCostOverType" style="width: 100%;" :option="feeCodeList" :placeholder="$t('placeholder.select',[$t('feeMode.exceed')])" :disabled="operator=='view'"></sSelect>
          </sFormItem2>
        </el-row>
      </div>
      <!--包年-->
      <div v-if="currentRow.costTypeRange == '3'">
        <el-row class="leftLine">
          <i></i>{{$t('feeMode.yearInfo')}}
        </el-row>
        <el-row>
          <sFormItem2 :label="$t('feeMode.price')" prop="yearCostPrice">
            <el-input v-model="currentRow.yearCostPrice" :placeholder="$t('placeholder.default',[$t('feeMode.price')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 :label="$t('feeMode.discount')" prop="yearDiscount">
            <el-input v-model="currentRow.yearDiscount" :placeholder="$t('placeholder.default',[$t('feeMode.discount')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 :label="$t('feeMode.upperLimit')" prop="yearCostOver">
            <el-input v-model="currentRow.yearCostOver" :placeholder="$t('placeholder.default',[$t('feeMode.upperLimit')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
          <sFormItem2 style="width: 50%;" :label="$t('feeMode.exceed')" prop="yearCostOverType">
            <sSelect v-model="currentRow.yearCostOverType" style="width: 100%;" :option="feeCodeList" :placeholder="$t('placeholder.select',[$t('feeMode.exceed')])" :disabled="operator=='view'"></sSelect>
          </sFormItem2>
        </el-row>
      </div>
      <!--区间-->
      <div v-if="currentRow.costTypeRange == '4'">
        <el-row class="leftLine">
          <i></i>{{$t('feeMode.sectionInfo')}}
        </el-row>
        <el-row class="interval">
          <el-table :data="currentRow.intervalList" style="width: 94%;margin-left: 6%;" tooltip-effect="light">
            <el-table-column :label="$t('number')" type="index" align="center" width="100"></el-table-column>
            <el-table-column :label="$t('feeMode.lowerLimit')" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'intervalList.' + scope.$index + '.dictCode'" :rules="rules.dictCode">
                  <sSelect v-model="scope.row.dictCode" option="INTERVAL_DETAIL" :placeholder="$t('placeholder.select',[$t('feeMode.lowerLimit')])"></sSelect>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('feeMode.discount')" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'intervalList.' + scope.$index + '.intervalDiscount'" :rules="rules.intervalDiscount">
                  <el-input v-model="scope.row.intervalDiscount" :placeholder="$t('placeholder.default',[$t('feeMode.discount')])"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fee.operation')" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <i class="el-icon-circle-plus" @click="addRow(scope.$index)" style="color: #0086FF; margin-right: 15px;"></i>
                <i class="el-icon-remove" @click="deleteRow(scope.$index)" v-show="currentRow.intervalList.length > 1"style="color: #0086FF;"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-top: 18px;">
          <sFormItem2 :label="$t('feeMode.floatRatio')" prop="floatUpRate">
            <el-input v-model="currentRow.floatUpRate" :placeholder="$t('placeholder.default',[$t('feeMode.floatRatio')])" :disabled="operator=='view'"></el-input>
          </sFormItem2>
        </el-row>
      </div>
      <el-row style="margin-top: 20px;text-align: right;">
        <el-button class="baseGray" @click="handleCancel">{{$t('cancel')}}</el-button>
        <el-button v-show="operator!='view'" class="baseBlue" @click="handleSubmit('feeModeView')">{{$t('ok')}}</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "FeeModeView",
    model: {
      prop: 'dialogIsVisible',
      event: 'closeDialog'
    },
    props: {
      feeCodeList: {
        type: Array
      },
      dialogIsVisible: {
        required: true
      },
      operator: {
        type: String,
        required: true
      },
      currentRow: {}
    },
    data() {
      return {
        rules: {
          costCode: [{required: true, message: this.$t('placeholder.default', [this.$t('interface.feeCode')]), trigger: 'blur'}],
          costTypeRange: [{required: true, message: this.$t('placeholder.select', [this.$t('interface.feeType')]), trigger: 'change'}],
          singleCostPrice: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.price')]), trigger: 'blur'}],
          singleDiscount: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.discount')]), trigger: 'blur'}],
          monthCostPrice: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.price')]), trigger: 'blur'}],
          monthDiscount: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.discount')]), trigger: 'blur'}],
          monthCostOver: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.upperLimit')]), trigger: 'blur'}],
          monthCostOverType: [{required: true, message: this.$t('placeholder.select', [this.$t('feeMode.exceed')]), trigger: 'change'}],
          yearCostPrice: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.price')]), trigger: 'blur'}],
          yearDiscount: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.discount')]), trigger: 'blur'}],
          yearCostOver: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.upperLimit')]), trigger: 'blur'}],
          yearCostOverType: [{required: true, message: this.$t('placeholder.select', [this.$t('feeMode.exceed')]), trigger: 'change'}],
          dictCode: [{required: true, message: this.$t('placeholder.select', [this.$t('feeMode.lowerLimit')]), trigger: 'change'}],
          intervalDiscount: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.discount')]), trigger: 'blur'}],
          floatUpRate: [{required: true, message: this.$t('placeholder.default', [this.$t('feeMode.floatRatio')]), trigger: 'blur'}]
        }
      }
    },
    methods: {
      // 添加一行
      addRow(i) {
        this.currentRow.intervalList.splice(i+1, 0, {
          dictCode: '',
          discount: ''
        });
      },

      // 删除一行
      deleteRow(i) {
        this.currentRow.intervalList.splice(i, 1);
      },

      // 提交功能
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator == "edit") {
              this.feeModeEdit();
            } else {
              this.feeModeAdd();
            }
          }
        });
      },

      // 添加功能
      feeModeAdd() {
        this.$service.post('/fee/feeQueryDefines/insertFeeQuery', this.currentRow)
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
      feeModeEdit() {
        this.$service.put('/fee/feeQueryDefines/feeUpdateManage', this.currentRow)
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
        this.$refs.feeModeView.clearValidate();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .textArea {
    width: 100%;
    padding: 5px 15px;
    border-radius: 4px;
    border-color: #e4e7ed;
    color: #606266;
  }

  /deep/ .interval > .el-table tr td > div > div {
    margin-bottom: 15px !important;
  }

  /deep/ .interval > .el-table tr td > div > div > div{
    margin-left: 16px !important;
  }

  /deep/ .interval > .el-table tr td:last-child > div {
    height: 40px;
  }
</style>
