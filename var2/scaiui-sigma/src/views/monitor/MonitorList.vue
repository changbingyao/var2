<template>
  <div>
    <!--查询功能-->
    <el-row :gutter="5">
      <el-col :span="8">
        <div class="grid-content bg-purple" ref="chart" style="background: #F2F2F5;">
          <MonitorChart></MonitorChart>
        </div>
      </el-col>
      <el-col :span="16">
        <!--列表主体-->
        <el-row>
          <MonitorQuery @loadData="loadData"/>
          <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%">
            <el-table-column type="index" :label="$t('number')" width="100">
              <template slot-scope="scope">
                {{(scope.$index+1) + (offset-1) * limit}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('interface.interfaceName')" prop="interfaceName" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('interface.status')">
              <template slot-scope="scope">
                <div v-if="scope.row.interfaceStatus == 0" class="circle-normal"></div>
                <div v-if="scope.row.interfaceStatus == 1" class="circle-excep"></div>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MonitorChart from './MonitorChart'
  import MonitorQuery from './MonitorQuery'

  export default {
    name: "MonitorList",
    components: {MonitorChart, MonitorQuery},
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
      // 查询功能
      loadData(shadow = {}) {
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
        }, shadow || this.params);
        this.$service.get('/interface/monitors/', {params: this.params})
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
  .grid-content {
    width: 250px;
    height: 480px;
    background: #ccceda42;
  }

  .circle-normal{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    background-color: #22AC38;
    border: 1px solid #BCBCBC;
  }

  .circle-excep{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    background-color: #EC6941;
    border: 1px solid #BCBCBC;
  }
</style>
