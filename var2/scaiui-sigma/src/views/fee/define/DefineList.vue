<template>
  <div>
    <!--头部-->
    <el-row style="margin: -4px 0 25px;">
      <div class="cost-el-form-item" style="width: 30%;">
        <label class="el-form-item__label">{{$t('fee.feeId')}}</label>
        <sSelect style="display: inline-block;" ref="feeIdSelectRef" v-model="defineFeeId" :option="feeIdList" :placeholder="$t('placeholder.select',[$t('fee.feeId')])" class="el-form-item__content"></sSelect>
      </div>
      <div class="cost-el-form-item" style="width:69%;text-align: right;">
        <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="reset">{{$t('reset')}}</el-button>
        <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
        <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDeleteMutil">{{$t('delete')}}</el-button>
      </div>
    </el-row>
    <!--主体-->
    <el-row>
      <el-table ref="multipleTable" style="width: 100%" :data="data.rows" tooltip-effect="light" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column :label="$t('number')" type="index" width="70"></el-table-column>
        <el-table-column prop="feeId" :label="$t('fee.feeId')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeSingleIn" :label="$t('fee.singleIn')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeMonthlyIn" :label="$t('fee.monthIn')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeSingleOut" :label="$t('fee.singleOut')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeMonthlyOut" :label="$t('fee.monthOut')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeBuyallIn" :label="$t('fee.buyAllIn')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="feeBuyallOut" :label="$t('fee.buyAllOut')" show-overflow-tooltip></el-table-column>
        <el-table-column :label="$t('fee.operation')" prop="name" show-overflow-tooltip min-width="90px">
          <template slot-scope="scope">
            <el-button type="text" v-permission="'edit','编辑'" @click="handleView(scope.row)">{{$t('edit')}}</el-button>
            <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.feeId)">{{$t('delete')}}</el-button>
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
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%" :close-on-click-modal="false">
        <DefineView ref="defineViewRef" v-model="dialogIsVisible" :operator="operator" :defineData="currentRow" @loadData="loadData"></DefineView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import DefineView from './DefineView'
  export default {
    name: "DefineList",
    components: {
      DefineView
    },
    data() {
      return {
        defineFeeId: '',          // 费用编号
        feeIdList: [],           // 费用编号列表
        data: {},
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogIsVisible: false,   // 模态框控制器
        currentRow: {},
        dialogTitle: {
          "edit": this.$t('rate.$title', [this.$t('edit')]),
          "add": this.$t('rate.$title', [this.$t('add')]),
          "view": this.$t('rate.$title', [this.$t('view')]),
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

      // 翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      },

      // 分页查询列表数据功能
      loadData(index) {
        if (index !== 1) {
          this.defineFeeId = '';
        }
        this.$service.get('/fee/feeInfoDefines', {params: {limit: this.limit, offset: this.offset, feeId: this.defineFeeId}})
          .then( r=> {
            if (r.data.code === '000000') {
              this.data = r.data.data;
              if (index !== 1) {
                this.feeIdList = [];
                this.data.rows.forEach((item) => {
                  this.feeIdList.push({label: item.feeId, value: item.feeId});
                })
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
          })
      },

      // 重置功能
      reset() {
        this.defineFeeId = '';
        this.$refs.feeIdSelectRef.customValue = '';
        this.loadData();
      },

      // 添加功能
      handleAdd() {
        this.operator = "add";
        this.currentRow = {
          feeId: '',
          feeBuyallIn: '',
          feeBuyallDiscIn: '',
          feeBuyallOut: '',
          feeBuyallDiscOut: '',
          feeMonthlyIn: '',
          feeMonthlyDiscIn: '',
          feeMonthlyOut: '',
          feeMonthlyDiscOut: '',
          feeSingleIn: '',
          feeSingleDiscIn: '',
          feeSingleOut: '',
          feeSingleDiscOut: ''
        };
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.defineViewRef.getInitDefineData(this.currentRow);
        });
      },

      // 编辑功能
      handleView(rowData) {
        this.operator = "edit";
        this.currentRow = rowData;
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.defineViewRef.getInitDefineData(rowData);
        });
      },

      // 将选中的id存到ids中
      handleSelectionChange(val){
        this.selectedIds = [];
        val.forEach((item) => {
          this.selectedIds.push(item.feeId);
        });
      },

      // 多条删除
      handleDeleteMutil() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/fee/feeInfoDefines', {data: this.selectedIds})
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
                this.$message({
                  showClose: true,
                  message: this.$t('text.success'),
                  type: 'success'
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      // 单条删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete',
        }).then(() => {
          this.$service.delete('/fee/feeInfoDefines/' + id)
            .then(r => {
              if (r.data.code === '000000') {
                this.loadData();
                this.$message({
                  showClose: true,
                  message: this.$t('text.success'),
                  type: 'success'
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cost-el-form-item {
    display: inline-block;
  }
</style>
