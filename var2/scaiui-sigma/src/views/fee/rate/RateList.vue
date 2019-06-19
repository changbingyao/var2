<template>
  <div>
    <!--头部-->
    <el-row style="margin: -4px 0 25px;">
      <div class="cost-el-form-item" style="width: 33%;">
        <label class="el-form-item__label">{{$t('fee.vendorName')}}</label>
        <sSelect style="display: inline-block;" v-model="vendorName" :option="vendorNameList" :placeholder="$t('placeholder.select',[$t('fee.vendorName')])" class="el-form-item__content"></sSelect>
      </div>
      <div class="cost-el-form-item" style="width: 33%;">
        <label class="el-form-item__label">{{$t('vendor.INTERFACE_NAME')}}</label>
        <sSelect style="display: inline-block;" v-model="interfaceName" :option="interfaceNameList" :placeholder="$t('placeholder.select',[$t('vendor.INTERFACE_NAME')])" class="el-form-item__content"></sSelect>
      </div>
      <div class="cost-el-form-item" style="width:33%;text-align: right;">
        <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="reset">{{$t('reset')}}</el-button>
      </div>
    </el-row>
    <!--主体-->
    <el-row>
      <el-table ref="multipleTable" style="width: 100%" tooltip-effect="light" :data="data.rows">
        <el-table-column :label="$t('number')" type="index" width="110"></el-table-column>
        <el-table-column prop="vendorName" :label="$t('fee.vendorName')" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="interfaceName" :label="$t('interface.interfaceName')" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeBuyall" :label="$t('interface.feeBuyall')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeMonthly" :label="$t('interface.feeMonthly')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('interface.feeSingle')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.feeBuyall === 'Y' && scope.row.feeMonthly === 'Y'">Y</span>
            <span v-else>N</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('fee.operation')" prop="name" show-overflow-tooltip min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br>
    <el-row type="flex" justify="end">
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
    <!--模态框-->
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="60%" :close-on-click-modal="false">
        <RateView v-model="dialogIsVisible" :operator="operator" ref="rateViewRef" @click="loadData"></RateView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import RateView from './RateView'
  export default {
    name: "RateList",
    components: {
      RateView
    },
    data() {
      return {
        vendorName: '',         // 厂商名称
        interfaceName: '',      // 接口名称
        vendorNameList: [],     // 厂商名称列表
        interfaceNameList: [],  // 接口名称列表
        data: {},
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogFormVisible: false,
        dialogIsVisible: false,         // 模态框控制器
        currentRow: {},
        dialogTitle: {
          "view": this.$t('fee.rateSet', [this.$t('view')]),
          "edit": this.$t('fee.rateSet', [this.$t('edit')])
        }
      }
    },
    mounted() {
      this.queryVendorList();
      this.queryInterfaceList();
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

      // 查询厂商列表
      queryVendorList() {
        this.$service.get('/vendor/vendorInfo', {params: {offset: 1, limit: 1000000}})
          .then(r => {
            if (r.data.code === '000000') {
              this.vendorNameList = [];
              r.data.data.rows.forEach((item) => {
                this.vendorNameList.push({label: item.vendorName, value: item.vendorName, key: item.vendorId});
              });
              this.vendorNameList = this.unique(this.vendorNameList);
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

      // 查询接口列表
      queryInterfaceList() {
        this.$service.get('/interface/interfaceInfo', {params: {offset: 1, limit: 1000000}})
          .then(r => {
            if (r.data.code === '000000') {
              this.interfaceNameList = [];
              r.data.data.rows.forEach((item) => {
                this.interfaceNameList.push({label: item.interfaceName, value: item.interfaceName, key: item.interfaceId});
              });
              this.interfaceNameList = this.unique(this.interfaceNameList);
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

      // 分页查询列表数据功能
      loadData(index) {
        if (index !== 1) {
          this.vendorName = '';
          this.interfaceName = '';
        }
        const params = {
          limit: this.limit,
          offset: this.offset,
          vendorName: this.vendorName,
          interfaceName: this.interfaceName
        };
        this.$service.get('/interface/interfaceInfo/pageFeeList', {params: params})
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
      reset() {
        this.vendorName = '';
        this.interfaceName = '';
        this.offset = 1;
        this.loadData();
      },

      // 编辑功能
      handleEdit(rowData) {
        this.dialogIsVisible = true;
        this.operator = "edit";
        this.$nextTick(() => {
          this.$refs.rateViewRef.getPackageList();
          this.$refs.rateViewRef.getCurrentRowData(rowData);
        });
      }
    }
  }
</script>

<style scoped>
  .cost-el-form-item {
    display: inline-block;
  }
</style>
