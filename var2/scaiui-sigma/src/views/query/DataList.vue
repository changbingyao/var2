<template>
  <div>
    <!--查询条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" style="width: 100%;">
        <sFormItem3 :label="$t('dataQuery.provider')">
          <el-input style="width: 88%;" v-model="provider" :placeholder="$t('placeholder.default',[$t('dataQuery.provider')])" clearable></el-input>
        </sFormItem3>
        <sFormItem3 :label="$t('dataQuery.dataProductName')">
          <el-input style="width: 88%;" v-model="productName" :placeholder="$t('placeholder.default',[$t('dataQuery.dataProductName')])" clearable></el-input>
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
        <el-table-column prop="vendorName" :label="$t('dataQuery.provider')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="interfaceDesc" :label="$t('dataQuery.dataProductName')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="numCount" :label="$t('batchQuery.queryNum')" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column prop="successCount" :label="$t('batchQuery.successNum')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="fromCached" :label="$t('batchQuery.repeatNum')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="successResult" :label="$t('batchQuery.validNum')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="successNoResult" :label="$t('batchQuery.invalidNum')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="failCount" :label="$t('batchQuery.errorNum')" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="dataAverageTime" :label="$t('batchQuery.dataAvgTime')" show-overflow-tooltip width="150"></el-table-column>
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
    name: "DataList",
    data() {
      return {
        provider: '',
        productName: '',
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
          this.provider = '';
          this.productName = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          vendorName: this.provider,
          interfaceDesc: this.productName
        });
        this.$service.get('/fee/feeInfoDefines/selectListTwo', {params: this.params})
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
          });
      },

      // 重置功能
      handleReset() {
        this.provider = '';
        this.productName = '';
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
