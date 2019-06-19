<template>
  <div>
    <!--列表功能-->
    <UserQuery :selectedIds="selectedIds" @add="handleAdd" @loadData="loadData"/>
    <!--列表主体-->
    <div>
      <el-row>
        <el-table ref="multipleTable" :data="userData.rows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" :label="$t('number')" width="80">
            <template slot-scope="scope">
              {{(scope.$index+1) + (offset-1) * limit}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('user.userCode')" prop="userCode"></el-table-column>
          <el-table-column :label="$t('user.userName')" prop="userName" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('user.orgCode')" prop="orgCode" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$t('user.status')" prop="status" show-overflow-tooltip>
            <template slot-scope="scope">
              <sText option="STATUS" v-model="scope.row.status"></sText>
            </template>
          </el-table-column>
          <el-table-column :label="$t('action')" width="250px">
            <template slot-scope="scope">
              <el-button type="text" v-permission="'view','查看'" @click="handleView(scope.row)">{{$t('view')}}</el-button>
              <el-button type="text" v-permission="'edit','编辑'" @click="handleEdit(scope.row)">{{$t('edit')}}</el-button>
              <el-button type="text" v-permission="'del','删除'" @click="handleDelete(scope.row.userId)">{{$t('delete')}}</el-button>
              <el-button type="text" v-permission="'userRole','授权'" @click="handleUserRole(scope.row)">{{$t('userRolePower')}}</el-button>
              <el-button type="text"  @click="handleResetPwd(scope.row)"> {{$t('resetPassword')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br>
      <el-row type="flex" justify="end" v-if="userData.totalCount">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="offset"
          :page-size="limit"
          :page-sizes='$defaultPageSizes'
          layout="total, sizes, prev, pager, next"
          :total="userData.totalCount">
        </el-pagination>
      </el-row>
    </div>
    <!--新增编辑-->
    <div>
      <el-row>
        <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="70%" align="left" :close-on-click-modal="false">
          <UserEdit v-model="dialogIsVisible" :operator="operator" :data="currentRow" @loadData="loadData"></UserEdit>
        </el-dialog>
      </el-row>
    </div>
    <!--授权-->
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsuserRole" width="43%" height="90%">
        <UserRole v-model="dialogIsuserRole" :operator="operator" :userData="currentRow" :data="currentRow"></UserRole>
      </el-dialog>
    </el-row>
    <!--重置密码-->
    <el-row>
      <el-dialog :title="$t('resetPassword')" :visible.sync="dialogPwdVisible" width="40%" height="90%">
        <ResetPwd v-model="dialogPwdVisible" :operator="operator" :dialogPwdVisible="dialogPwdVisible" :data="currentRow"></ResetPwd>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import UserQuery from './UserQuery'
  import UserEdit from './UserEdit'
  import UserRole from './UserRole'
  import ResetPwd from "./ResetPwd";

  export default {
    name: "UserList",
    components: {ResetPwd, UserQuery, UserEdit, UserRole},
    data() {
      return {
        lang: 'zh',
        limit: this.$pageSize,
        selectedIds: [],
        operator: 'view',
        offset: 0,
        dialogFormVisible: false,
        dialogIsVisible: false,
        dialogIsuserRole: false,
        dialogPwdVisible:false,
        userData: {},
        currentRow: {},
        params: {},
        formLabelWidth: '120px',
        dialogTitle: {
          "edit": this.$t('user.$title', [this.$t('edit')]),
          "add": this.$t('user.$title', [this.$t('add')]),
          "view": this.$t('user.$title', [this.$t('view')]),
          "userRole": this.$t('user.$title', [this.$t('userRolePower')])
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      // 用户授权方法
      handleUserRole: function (row) {
        this.operator = "userRole";
        this.dialogIsuserRole = true;
        this.currentRow = row;
      },

      // 查询
      loadData(shadow = {}) {
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
        }, shadow || this.params);
        this.$service.get('/system/users', {params: this.params})
          .then(r => {
            if (r.data.code === '000000') {
              this.userData = r.data.data;
            }
          })
          .catch(err => {
          })
      },

      // 选择
      handleSelectionChange(val) {
        this.selectedIds = [];
        val.map(item => {
          this.selectedIds.push(item.userId)
        });
      },


      handleSizeChange(val) {
        this.limit = val;
        this.loadData();
      },

      // 添加功能
      handleAdd(val) {
        this.operator = "add";
        this.dialogIsVisible = val;
        this.currentRow = {userSex: '1', status: '1'};
      },


      handleCurrentChange(val) {
        this.offset = val;
        this.loadData();
      },

      // 查看
      handleView(rowData) {
        this.operator = "view";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
      },

      // 编辑
      handleEdit(rowData) {
        this.operator = "edit";
        this.dialogIsVisible = true;
        this.currentRow = rowData;
      },

      // 重置密码
      handleResetPwd(rowData){
        this.operator = "reset";
        this.dialogPwdVisible = true;
        this.currentRow = rowData;
      },

      // 单条删除
      handleDelete(id) {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
            this.$service.delete('/system/users/' + id)
              .then(r => {
                if (r.data.code === '000000') {
                  this.loadData();
                  this.$message({
                    showClose: true,
                    message: this.$t('text.success'),
                    type: 'success'
                  })
                }
              }).catch(err => {
                this.$message({
                  showClose: true,
                  message: err,
                  type: 'error'
                })
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

<style scoped>

</style>
