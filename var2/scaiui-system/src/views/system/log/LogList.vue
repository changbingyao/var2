<template>
  <div>
    <!--条件及按钮-->
    <el-row style="margin: 0 0 20px;">
      <div class="cost-el-form-item" style="width: 26%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('actionLog.userName')}}</label>
        <el-input style="width: 65%;" v-model="userName" :placeholder="$t('placeholder.default',[$t('actionLog.userName')])" clearable></el-input>
      </div>
      <div class="cost-el-form-item" style="width: 29%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('actionLog.startDate')}}</label>
        <el-date-picker v-model="optStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" style="width: 65%;" :placeholder="$t('placeholder.select',[$t('log.startDate')])"></el-date-picker>
      </div>
      <div class="cost-el-form-item" style="width: 29%;">
        <label class="el-form-item__label" style="line-height: 30px;">{{$t('actionLog.endDate')}}</label>
        <el-date-picker v-model="optEndDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" style="width: 65%;" :placeholder="$t('placeholder.select',[$t('log.endDate')])"></el-date-picker>
      </div>
      <div class="cost-el-form-item" style="width:14%;text-align: right;">
        <el-button type="primary" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button type="danger" @click="reset">{{$t('reset')}}</el-button>
      </div>
    </el-row>
    <!--列表主体-->
    <el-row>
      <el-table ref="multipleTable" style="width: 100%" :data="data.rows">
        <el-table-column :label="$t('number')" type="index" width="110" align="center"></el-table-column>
        <el-table-column prop="userName" :label="$t('actionLog.userName')" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="action" :label="$t('actionLog.operationAction')" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="optDate" :label="$t('actionLog.operationTime')" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.optDate | timeFormat}}</template>
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
  </div>
</template>

<script>
  export default {
    name: "LogList",
    data() {
      return {
        userName: '',
        optStartDate: '',
        optEndDate: '',
        limit: this.$pageSize,
        offset: 0,
        data: {}
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
          this.userName = '';
          this.optStartDate = '';
          this.optEndDate = '';
        }
        const params = {
          limit: this.limit,
          offset: this.offset,
          userName: this.userName,
          optDate: this.optStartDate,
          optDateEnd: this.optEndDate
        };
        this.$service.get('system/logs', {params: params})
          .then(r => {
            if (r.data.code === this.$successCode) {
              this.data = r.data.data;
            } else {
              this.$Message({
                showClose: true,
                message: r.data.msg,
                type: 'error'
              });
            }
          })
          .catch(err => {
            this.$Message({
              showClose: true,
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          })
      },

      // 重置功能
      reset() {
        this.userName = '';
        this.optStartDate = '';
        this.optEndDate = '';
        this.loadData();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cost-el-form-item {
    display: inline-block;
  }
</style>
