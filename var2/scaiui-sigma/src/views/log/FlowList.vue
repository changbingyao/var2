<template>
  <div>
    <!--条件及按钮-->
    <el-row style="margin: 0 0 20px;">
      <div class="cost-el-form-item" style="width: 26%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('log.flowNum')}}</label>
        <el-input style="width: 65%;" v-model="flowNumber" :placeholder="$t('placeholder.default',[$t('log.flowNum')])" clearable></el-input>
      </div>
      <div class="cost-el-form-item" style="width: 29%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('log.startDate')}}</label>
        <el-date-picker v-model="logStartDate" type="datetime" value-format="timestamp" default-time="00:00:00" style="width: 65%;" :placeholder="$t('placeholder.select',[$t('log.startDate')])"></el-date-picker>
      </div>
      <div class="cost-el-form-item" style="width: 29%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('log.endDate')}}</label>
        <el-date-picker v-model="logEndDate" type="datetime" value-format="timestamp" default-time="23:59:59" style="width: 65%;" :placeholder="$t('placeholder.select',[$t('log.endDate')])"></el-date-picker>
      </div>
      <div class="cost-el-form-item" style="width:14%;text-align: right;">
        <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="reset">{{$t('reset')}}</el-button>
      </div>
    </el-row>
    <!--列表主体-->
    <el-row>
      <el-table ref="multipleTable" style="width: 100%" tooltip-effect="light" :data="data.rows">
        <el-table-column :label="$t('number')" type="index" width="80" align="center"></el-table-column>
        <el-table-column prop="queryId" :label="$t('log.flowNum')" show-overflow-tooltip width="180" align="center"></el-table-column>
        <el-table-column prop="interfaceId" :label="$t('interface.interfaceId')" show-overflow-tooltip width="100" align="center"></el-table-column>
        <el-table-column prop="interfaceDesc" :label="$t('interface.interfaceName')" show-overflow-tooltip width="180" align="center"></el-table-column>
        <el-table-column prop="" :label="$t('log.stateCode')" show-overflow-tooltip width="90" align="center"></el-table-column>
        <el-table-column prop="" :label="$t('log.errorInfo')" show-overflow-tooltip width="150" align="center"></el-table-column>
        <el-table-column prop="reqDate" :label="$t('log.queryTime')" show-overflow-tooltip width="150" align="center">
          <template slot-scope="scope">{{scope.row.reqDate | timeFormat}}</template>
        </el-table-column>
        <el-table-column :label="$t('fee.operation')" show-overflow-tooltip min-width="80px" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row, scope.row.queryId)">{{$t('view')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br>
    <!--底部分页-->
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
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%" :close-on-click-modal="false">
        <FLowView v-model="dialogIsVisible" :operator="operator" :data="currentRow"></FLowView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import FLowView from "./FLowView";
  export default {
    name: "FlowList",
    components: { FLowView },
    data() {
      return {
        flowNumber: '',
        logStartDate: '',
        logEndDate: '',
        limit: this.$pageSize,
        offset: 0,
        data: {},
        operator: 'view',
        dialogIsVisible: false,
        currentRow: {},
        dialogTitle: {
          "view": this.$t('log.$title', [this.$t('view')])
        }
      }
    },
    mounted() {
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

      // 查询功能(含条件查询)
      loadData(index) {
        if (index !== 1) {
          this.flowNumber = '';
          this.logStartDate = '';
          this.logEndDate = '';
        }
        const params = {
          limit: this.limit,
          offset: this.offset,
          queryId: this.flowNumber,
          reqDate: this.logStartDate,
          reqDateEnd: this.logEndDate
        };
        this.$service.get('/interface/interfaceResponseHists', {params: params})
          .then(r => {
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

      // 重置功能
      reset() {
        this.flowNumber = '';
        this.logStartDate = '';
        this.logEndDate = '';
        this.loadData();
      },

      // 查看功能
      handleView(row, id) {
        this.operator = "view";
        this.$service.get('/interface/interfaceResponseHists/' + id)
          .then(r => {
            if (r.data.code === '000000') {
              this.currentRow = row;
              this.currentRow.requestInfo = r.data.data.request;
              this.currentRow.responseInfo = r.data.data.response;
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
        this.dialogIsVisible = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cost-el-form-item {
    display: inline-block;
  }
</style>
