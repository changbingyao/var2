<template>
  <div>
    <!--列表功能-->
    <VendorQuery :selectedIds="selectedIds" @add="handleAdd" @loadData="loadData"/>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="data.rows" tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" :label="$t('number')" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              {{(scope.$index+1) + (offset-1) * limit}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('vendor.VENDOR_ID')" prop="vendorId" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('vendor.VENDOR_NAME')" prop="vendorName" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('vendor.CONTRACT_INFO')" prop="contractInfo" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('vendor.REQ_TYPE')" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.reqType.toUpperCase()}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('action')" min-width="90px">
            <template slot-scope="scope">
              <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
              <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
              <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.serId)">{{$t('delete')}}</el-button>
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
      <el-row>
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%" :close-on-click-modal="false">
          <VendorEdit ref="vendorEditRef" v-model="dialogIsVisible" :operator="operator" :data="currentRow" @loadData="loadData"></VendorEdit>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
  import VendorQuery from './VendorQuery'
  import VendorEdit from './VendorEdit'
  export default {
    name: "VendorList",
    components: {VendorQuery, VendorEdit},
    data() {
      return {
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogFormVisible: false,
        dialogIsVisible: false,
        data: {},
        transferRes: [],
        transferListData: [],
        params: {},
        currentRow: {},
        folderList: [],
        dialogTitle: {
          "edit": this.$t('vendor.$title', [this.$t('edit')]),
          "add": this.$t('vendor.$title', [this.$t('add')]),
          "view": this.$t('vendor.$title', [this.$t('view')]),
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 查询功能
      loadData(data) {
        if (data == '' || data == null || data == undefined) {
          this.params = Object.assign({
            limit: this.limit,
            offset: this.offset,
          });
        } else {
          this.params = {
            limit: this.limit,
            offset: 0,
            vendorName: data.vendorName,
            reqType: data.reqType
          }
        }
        this.$service.get('/vendor/vendorInfo', {params: this.params})
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

      // 选择Ids
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.map(item => {
          this.selectedIds.push(item.serId)
        });
      },

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

      // 添加功能
      handleAdd() {
        this.operator = "add";
        this.dialogIsVisible = true;
        this.$nextTick(() => {
          this.$refs.vendorEditRef.handleClear();
        });
        this.currentRow = {};
      },

      // 查看功能
      handleView(rowData) {
        this.operator = "view";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
        this.$nextTick(() => {
          this.$refs.vendorEditRef.handleClear();
          this.$refs.vendorEditRef.getCurrentRowData(rowData);
        });
      },

      // 编辑功能
      handleEdit(rowData) {
        this.operator = "edit";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
        this.$nextTick(() => {
          this.$refs.vendorEditRef.handleClear();
          this.$refs.vendorEditRef.getCurrentRowData(rowData);
        });
      },

      // 删除功能
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/vendor/vendorInfo/' + id)
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
  /deep/ .el-form-item {
    margin-right: 0 !important;
  }
</style>
