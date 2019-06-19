<template>
  <div>
    <CountChart></CountChart>
    <!--列表功能-->
    <CountQuery @loadData="loadData"/>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%">
          <el-table-column type="index" :label="$t('number')" width="90">
            <template slot-scope="scope">
              {{(scope.$index+1) + (offset-1) * limit}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('vendor.VENDOR_NAME')" prop="vendorName" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('vendor.INTERFACE_NAME')" prop="interfaceName" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('vendor.TIME_AVG')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="isEmpty(scope.row.timeAvg)">-</span>
              <span v-else>{{scope.row.timeAvg}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('vendor.ERR_RATE')" prop="errRate" show-overflow-tooltip></el-table-column>
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
    </div>
  </div>
</template>

<script>
  import CountChart from './CountChart'
  import CountQuery from './CountQuery'

  export default {
    name: "CountList",
    components: {CountChart,CountQuery},
    data() {
      return {
        limit: this.$pageSize,
        offset: 0,
        data: {},
        params: {}
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 分页查询列表数据
      loadData(shadow = {}) {
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
        }, shadow || this.params);
        this.$service.get('/vendor/vendorInfo/interFaceDetail', {params: this.params})
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

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData();
      },

      // 点击翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      }
    }
  }
</script>

<style scoped>

</style>
