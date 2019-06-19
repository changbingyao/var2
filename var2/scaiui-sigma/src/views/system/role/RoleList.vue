<template>
  <div>
    <!--列表功能-->
    <RoleQuery :selectedIds="selectedIds" @add="handleAdd" @loadData="loadData"/>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="data.rows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column :label="$t('number')" type="index" width="80">
            <template slot-scope="scope">
              {{(scope.$index+1) + (offset-1) * limit}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.roleCode')" prop="roleCode" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('role.roleName')" prop="roleName" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('role.roleLevel')" prop="roleLevel" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="ORG_GRADE" v-model="scope.row.roleLevel"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.crtOrgCode')" prop="crtOrgCode" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('action')"  width="200px">
            <template slot-scope="scope">
              <el-button type="text" v-permission="'view','查看'" size="small" @click="handleView(scope.row)">{{$t('view')}}</el-button>
              <el-button type="text" v-permission="'edit','编辑'" size="small" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
              <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.roleId)">{{$t('delete')}}</el-button>
              <el-button type="text" v-permission="'authorize','授权'" @click="handleAuthorize(scope.row)">{{$t('author')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br><br>
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
    <!--新增编辑查看-->
    <div>
      <el-row>
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%">
          <RoleEdit v-model="dialogIsVisible" :operator="operator" :data="currentRow" @loadData="loadData"></RoleEdit>
        </el-dialog>
      </el-row>
    </div>
    <!--授权-->
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsauthorize" width="70%" height="90%">
        <Authorize v-model="dialogIsauthorize" :operator="operator" :data="currentRow"></Authorize>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import RoleQuery from './RoleQuery'
  import RoleEdit from './RoleEdit'
  import Authorize from './Authorize'

  export default {
    name: "RoleList",
    components: {RoleQuery, RoleEdit, Authorize},
    data() {
      return {
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 1,
        dialogFormVisible: false,
        dialogIsVisible: false,
        dialogIsauthorize: false,
        data: {},
        params: {},
        currentRow: {},
        dialogTitle: {
          "edit": this.$t('role.$title', [this.$t('edit')]),
          "add": this.$t('role.$title', [this.$t('add')]),
          "view": this.$t('role.$title', [this.$t('view')]),
          "authorize": this.$t('role.$title', [this.$t('author')]),
        },
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      // 查询
      loadData(shadow = {}) {
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
        }, shadow || this.params);
        this.$service.get('/system/roles', {params: this.params})
          .then(r => {
            if (r.data.code === '000000') {
              this.data = r.data.data;
            }
          })
          .catch(err => {
            console.error('err', err)
          })
      },

      // 选择行数据
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.map(item => {
          this.selectedIds.push(item.roleId)
        });
      },

      // 每页显示条数变化
      handleSizeChange(val) {
        this.limit = val;
        this.loadData();
      },

      // 添加功能
      handleAdd(val) {
        this.operator = "add";
        this.dialogIsVisible = val;
        this.currentRow = {status:'1',roleLevel:'0'};
      },

      // 点击翻页时处理
      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      },

      // 查看功能
      handleView(rowData) {
        this.operator = "view";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
      },

      // 编辑功能
      handleEdit(rowData) {
        this.operator = "edit";
        this.currentRow = rowData;
        this.dialogIsVisible = true;
      },

      // 单条删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.submitDelete(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      },

      // 提交删除
      submitDelete(id) {
        this.$service.delete('/system/roles/' + id)
          .then(r => {
            if (r.data.code === '000000') {
              this.loadData();
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {})
      },

      // 授权功能
      handleAuthorize: function (row) {
        this.operator = "authorize";
        this.dialogIsauthorize = true;
        this.currentRow = row;
      }
    }
  }
</script>

<style scoped>

</style>
