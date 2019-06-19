<template>
  <div>
    <!--查询条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" style="width: 100%;">
        <sFormItem3 :label="$t('batch.taskId')">
          <el-input style="padding-left: 14px;" v-model="taskId" :placeholder="$t('placeholder.default',[$t('batch.taskId')])" clearable></el-input>
        </sFormItem3>
        <sFormItem3 :label="$t('batch.caller')">
          <sSelect style="padding-left: 14px;" v-model="caller" :option="callerOptions" :placeholder="$t('placeholder.select',[$t('batch.caller')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('batch.callType')">
          <sSelect v-model="callType" :option="callTypeOptions" :placeholder="$t('placeholder.select',[$t('batch.callType')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('batchQuery.productName')">
          <sSelect v-model="productName" :option="productNameOptions" :placeholder="$t('placeholder.select',[$t('batchQuery.productName')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('log.startDate')">
          <el-date-picker v-model="startTime" style="width: 93%;" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" :placeholder="$t('placeholder.select',[$t('log.startDate')])"></el-date-picker>
        </sFormItem3>
        <sFormItem3 :label="$t('log.endDate')">
          <el-date-picker v-model="endTime" style="width: 93%;" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :placeholder="$t('placeholder.select',[$t('log.endDate')])"></el-date-picker>
        </sFormItem3>
        <div style="width: 100%; margin-bottom: 18px; text-align: right;">
          <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset">{{$t('reset')}}</el-button>
        </div>
      </el-form>
    </el-row>
    <!--主体-->
    <el-row>
      <el-table style="width: 100%" border :data="data.rows" tooltip-effect="light">
        <el-table-column :label="$t('number')" type="index" width="50"></el-table-column>
        <el-table-column prop="id" :label="$t('batch.taskId')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="useService" :label="$t('batchQuery.productName')" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="userName" :label="$t('batch.caller')" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column prop="useType" :label="$t('batch.callType')" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column prop="startTime" :label="$t('batchQuery.queryTime')" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="endTime" :label="$t('batch.finishTime')" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="executeTime" :label="$t('batchQuery.totalTime')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="retNumber" :label="$t('batchQuery.queryNum')" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column prop="retSuccessNumber" :label="$t('batchQuery.successNum')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="repeatNumber" :label="$t('batchQuery.repeatNum')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="retSuccessResult" :label="$t('batchQuery.validNum')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="retSuccessNoResult" :label="$t('batchQuery.invalidNum')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="retFail" :label="$t('batchQuery.errorNum')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="reqTime" :label="$t('batchQuery.avgTotalTime')" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="reqDataTime" :label="$t('batchQuery.dataAvgTime')" show-overflow-tooltip width="150"></el-table-column>
      </el-table>
    </el-row>
    <br>
    <!--分页-->
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
  </div>
</template>

<script>
  export default {
    name: "QueryList",
    data() {
      return {
        taskId: '',
        caller: '',
        callType: '',
        productName: '',
        startTime: '',
        endTime: '',
        callerOptions: [],
        callTypeOptions: [
          {label: '产品开发测试', value: '产品开发测试'},
          {label: '产品销售测试', value: '产品销售测试'},
          {label: '客户正式调用', value: '客户正式调用'}
        ],
        productNameOptions: [],
        data: {},
        offset: 0,
        limit: this.$pageSize
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 分页查询
      loadData(index) {
        if (index !== 1) {
          this.taskId = '';
          this.caller = '';
          this.callType = '';
          this.startTime = '';
          this.endTime = '';
          this.productName = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          id: this.taskId,
          userName: this.caller,
          useType: this.callType,
          useServiceId: this.productName,
          startTime: this.startTime,
          endTime: this.endTime
        });
        this.$service.get('/fee/feeInfoDefines/selectListOne', {params: this.params})
          .then(r => {
            if (r.data.code === '000000') {
              this.data = r.data.data;
              if (index !== 1) {
                this.callerOptions = [];
                this.productNameOptions = [];
                if (r.data.data.rows.length > 0) {
                  r.data.data.rows.forEach(item => {
                    this.callerOptions.push({label: item.userName, value: item.userName});
                    this.productNameOptions.push({label: item.useService, value: item.useServiceId});
                  });
                  this.callerOptions = this.unique(this.callerOptions);
                  this.productNameOptions = this.unique(this.productNameOptions);
                }
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

      // 重置功能
      handleReset() {
        this.taskId = '';
        this.caller = '';
        this.callType = '';
        this.productName = '';
        this.startTime = '';
        this.endTime = '';
        this.offset = 1;
        this.loadData();
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData(1);
      },

      // 翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData(1);
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-form-item__label {
    width: 25%;
    text-align: right;
  }

  /deep/ .el-form-item__content {
    width: 70%;
  }

  /deep/ .el-form-item {
    width: 100%;
    margin-right: 0 !important;
  }

  /deep/ .el-dialog__body {
    padding: 30px 60px 30px 0 !important;
  }

  .download {
    padding-right: 10px;
    text-decoration: underline;
    color:rgba(0, 0, 238, 1);
    cursor: pointer;
  }
</style>
