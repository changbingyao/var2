<template>
  <div>
    <!--头部-->
    <el-row type="flex" justify="space-between">
      <el-col :span="7">
        <div class="fee-bg fee-total">
          <div class="fee-title">{{$t('fee.internalInTotal')}}(元)</div>
          <div class="fee-price">
            ￥ {{internalFeeList.totalAmt}}
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="fee-bg fee-month">
          <div class="fee-title">{{$t('interface.monthFeeAmt')}}(元)</div>
          <div class="fee-price">
            ￥ {{internalFeeList.monAmt}}
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="fee-bg fee-day">
          <div class="fee-title">{{$t('interface.dayFeeAmt')}}(元)</div>
          <div class="fee-price">
            ￥ {{internalFeeList.dayAmt}}
          </div>
        </div>
      </el-col>
    </el-row>
    <!--条件及按钮-->
    <el-row style="margin: 25px 0 20px;">
      <div class="cost-el-form-item" style="width: 40%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('fee.vendorName')}}</label>
        <sSelect style="display:inline-block; width: 51%;" v-model="intVendorName" :option="intVendorNameOptions" :placeholder="$t('placeholder.select',[$t('fee.vendorName')])"></sSelect>
      </div>
      <div class="cost-el-form-item" style="width:59%;text-align: right;">
        <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="reset">{{$t('reset')}}</el-button>
      </div>
    </el-row>
    <!--列表主体-->
    <el-row>
      <el-table ref="multipleTable" style="width: 100%" tooltip-effect="light" :data="data.rows">
        <el-table-column :label="$t('number')" type="index" width="110"></el-table-column>
        <el-table-column prop="vendorName" :label="$t('fee.vendorName')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeAmt" :label="$t('fee.totalFee')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="monthFeeAmt" :label="$t('fee.monthFee')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="endDate" :label="$t('fee.feeDate')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('fee.operation')" prop="name" show-overflow-tooltip min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br>
    <el-row type="flex" justify="end" v-if="data.totalCount">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="offset"
        :page-size="limit"
        :page-sizes="$defaultPageSizes"
        layout="total, sizes, prev, pager, next"
        :total="data.totalCount">
      </el-pagination>
    </el-row>
    <!--查看详情模态框-->
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="80%" :close-on-click-modal="false">
        <InternalView ref="internalViewRef" v-model="dialogIsVisible" :operator="operator"
                      :data="currentRow"
                      @loadData="loadData"></InternalView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import InternalView from './InternalView'
  export default {
    name: "InternalList",
    components: {
      InternalView
    },
    data() {
      return {
        internalFeeList: {},    // 对内总费用列表
        intVendorName: '',        // 厂商名称
        intVendorNameList: [],    // 未去重厂商名称列表
        intVendorNameOptions: [],    // 去重厂商名称列表
        data: {},
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogIsVisible: false,         // 模态框控制器
        currentRow: {},
        dialogTitle: {
          "view": this.$t('fee.feeDetail', [this.$t('view')])
        }
      }
    },
    mounted() {
      this.getInFeeList();
      this.loadData();
      this.getIntVendorNameOptions();
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

      // 外部计费最外层上面三大块
      getInFeeList() {
        this.$service.get('/fee/feeInfoDefines/pageAllFeeList', {params: {flag: 'B'}})
          .then(r => {
            if (r.data.code === '000000') {
              this.internalFeeList = r.data.data;
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
          this.intVendorName = '';
        }
        const params = {
          limit: this.limit,
          offset: this.offset,
          interfaceType: 'B',
          vendorName: this.intVendorName
        };
        this.$service.get('/fee/feeInfoDefines/feeList', {params: params})
          .then( r=> {
            if (r.data.code === '000000') {
              this.data = r.data.data;
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

      // 查询内部所有厂商项
      getIntVendorNameOptions() {
        this.$service.get('/vendor/vendorInfo', {params: {limit: '', offset: 1, serType: 'I'}})
          .then(r => {
            if (r.data.code === '000000') {
              this.intVendorNameList = [];
              this.intVendorNameOptions = [];
              r.data.data.map((item) => {
                this.intVendorNameList.push({label: item.vendorName, value: item.vendorId});
                this.intVendorNameOptions.push({label: item.vendorName, value: item.vendorName});
              });
              this.intVendorNameOptions = this.unique(this.intVendorNameOptions);
            } else {
              this.$message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              });
            }
          })
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

      // 重置功能
      reset() {
        this.intVendorName = '';
        this.loadData();
      },

      // 查看详情功能
      handleView(rowData) {
        this.operator = "view";
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.internalViewRef.getIntFeeList();
          this.$refs.internalViewRef.getIntInterListByVendor();
          this.$refs.internalViewRef.loadData();
        });
        this.currentRow = rowData;
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
    width: 100%;
    position: absolute;
    top: 60px;
    font-size: 38px;
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

  /deep/ .el-card__body {
    padding: 0 !important;
  }
</style>
