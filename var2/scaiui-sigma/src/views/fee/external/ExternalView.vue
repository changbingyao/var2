<template>
  <div>
    <!--头部-->
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <div class="fee-bg fee-total">
          <div class="fee-title">{{data.vendorName}}{{$t('interface.feeAmt')}}(元)</div>
          <div class="fee-price">
            ￥ {{detailExtFeeList.totalAmt}}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="fee-bg fee-month">
          <div class="fee-title">{{$t('interface.monthFeeAmt')}}(元)</div>
          <div class="fee-price">
            ￥ {{detailExtFeeList.monAmt}}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="fee-bg fee-day">
          <div class="fee-title">{{$t('interface.dayFeeAmt')}}(元)</div>
          <div class="fee-price">
            ￥ {{detailExtFeeList.dayAmt}}
          </div>
        </div>
      </el-col>
    </el-row>
    <!--条件及按钮-->
    <el-row style="margin: 40px 0 20px;">
      <div class="cost-el-form-item" style="width: 20%;">
        <el-input :disabled="operator=='view'" :value="data.vendorName"></el-input>
      </div>
      <div class="cost-el-form-item" style="width: 20%;">
        <sSelect v-model="extInterfaceId" :option="extInterfaceNameList" :placeholder="$t('placeholder.select',[$t('interface.interfaceName')])"></sSelect>
      </div>
      <div class="cost-el-form-item" style="width: 20%;">
        <el-date-picker v-model="extStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" placeholder="起始日期"></el-date-picker>
      </div>
      <div class="cost-el-form-item" style="width: 20%;">
        <el-date-picker v-model="extEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" placeholder="截止日期"></el-date-picker>
      </div>
      <div class="cost-el-form-item" style="width:15%;text-align: right;">
        <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="reset">{{$t('reset')}}</el-button>
      </div>
    </el-row>
    <!--列表主体-->
    <el-row>
      <el-table ref="multipleTable" style="width: 100%" tooltip-effect="light" :data="detailExtData.rows">
        <el-table-column :label="$t('number')" type="index" width="100"></el-table-column>
        <el-table-column prop="interfaceName" :label="$t('interface.interfaceName')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeAmt" :label="$t('fee.fees')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="endDate" :label="$t('fee.feeDate')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="chargeType" :label="$t('interface.feeType')" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-row>
    <!--分页-->
    <el-row type="flex" justify="end" v-if="detailExtData.totalCount">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="offset"
        :page-size="limit"
        :page-sizes="$defaultPageSizes"
        layout="total, sizes, prev, pager, next"
        :total="detailExtData.totalCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "ExternalView",
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
      data: {}
    },
    data() {
      return {
        limit: this.$pageSize,
        offset: 0,
        detailExtFeeList: {},    // 详情页面对外总费用列表
        detailExtData: {},
        extInterfaceNameList: [],  // 接口名称列表
        extInterfaceId: '',
        extStartDate: '',
        extEndDate: ''
      }
    },
    mounted() {
      this.getExtFeeList();
      this.loadData();
    },
    methods: {
      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData();
      },

      // 点击翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      },

      // 详情页面—外部计费最外层上面三大块
      getExtFeeList() {
        this.$service.get('/fee/feeInfoDefines/pageFeeList', {params: {flag: 'A', vendorName: this.data.vendorName}})
          .then(r => {
            if (r.data.code === '000000') {
              this.detailExtFeeList = r.data.data;
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

      // 根据厂商名称查询接口名称下拉框值
      getExtInterListByVendor() {
        this.$service.get('/interface/inter/vendorInterCol', {params: {vendorName: this.data.vendorName, interfaceTpe: 'A'}})
          .then(r => {
            if (r.data.code === '000000') {
              this.extInterfaceNameList = [];
              r.data.data.forEach((item) => {
                this.extInterfaceNameList.push({label: item.interfaceName, value: item.interfaceId});
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
      },

      // 分页查询列表数据功能
      loadData(index) {
        if (index !== 1) {
          this.extInterfaceId = '';
          this.extStartDate = '';
          this.extEndDate = '';
        }
        const params = {
          limit: this.limit,
          offset: this.offset,
          interfaceType: 'A',
          vendorName: this.data.vendorName,
          interfaceId: this.extInterfaceId,
          startDate: this.extStartDate,
          endDate: this.extEndDate
        };
        this.$service.get('/fee/feeInfoDefines/feeDetail', {params: params})
          .then( r=> {
            if (r.data.code === '000000') {
              this.detailExtData = r.data.data;
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

      // 重置功能
      reset() {
        this.extInterfaceId = '';
        this.extStartDate = '';
        this.extEndDate = '';
        this.loadData();
      },

      // 取消功能
      handleCancel() {
        this.$emit('closeDialog', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fee-bg {
    position: relative;
    min-height: 165px;
  }
  .fee-total {
    background: url("../../../assets/img/fee-total.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .fee-month {
    background: url("../../../assets/img/fee-month.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .fee-day {
    background: url("../../../assets/img/fee-day.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .fee-title, .fee-price {
    color: #fff;
  }

  .fee-title {
    position: absolute;
    top: 10px;
    left: 30px;
  }
  .fee-price {
    width: 90%;
    position: absolute;
    top: 55px;
    font-size: 32px;
    font-weight: bold;
    transform: scale(1,1.3);
    -ms-transform: scale(1,1.3);
    -webkit-transform: scale(1,1.3);
    -moz-transform: scale(1,1.3);
    -o-transform: scale(1,1.3);
    text-align: center;
  }

  .cost-el-form-item {
    display: inline-block;
  }
</style>
