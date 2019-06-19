<template>
  <div>
    <!--查询条件-->
    <el-row type="flex" justify="left">
      <el-form label-position="right" :inline="true" style="width: 100%;">
        <sFormItem3 :label="$t('batch.access')">
          <sSelect v-model="access" :option="accessOptions" :placeholder="$t('placeholder.select',[$t('batch.access')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('log.startDate')">
          <el-date-picker v-model="startTime" style="width: 93%;" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" :placeholder="$t('placeholder.select',[$t('log.startDate')])"></el-date-picker>
        </sFormItem3>
        <sFormItem3 :label="$t('log.endDate')">
          <el-date-picker v-model="endTime" style="width: 93%;" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :placeholder="$t('placeholder.select',[$t('log.endDate')])"></el-date-picker>
        </sFormItem3>
        <sFormItem3 :label="$t('batch.caller')">
          <sSelect v-model="caller" :option="callerOptions" :placeholder="$t('placeholder.select',[$t('batch.caller')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('batch.callInterface')">
          <sSelect v-model="callInterface" :option="callInterOptions" :placeholder="$t('placeholder.select',[$t('batch.callInterface')])" clearable></sSelect>
        </sFormItem3>
        <sFormItem3 :label="$t('batch.callType')">
          <sSelect v-model="callType" :option="callTypeOptions" :placeholder="$t('placeholder.select',[$t('batch.callType')])" clearable></sSelect>
        </sFormItem3>
        <div style="width: 100%; margin-bottom: 18px; text-align: right;">
          <el-button class="baseBlue" @click="loadData(1)">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset">{{$t('reset')}}</el-button>
          <el-button class="baseGreen" v-permission="'call','发起调用'" @click="handleCall">{{$t('call')}}</el-button>
        </div>
      </el-form>
    </el-row>
    <!--主体-->
    <el-row>
      <el-table style="width: 100%" border :data="data.rows" tooltip-effect="light">
        <el-table-column :label="$t('number')" type="index" width="50"></el-table-column>
        <el-table-column prop="id" :label="$t('batch.taskId')" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="requestName" :label="$t('batch.access')" show-overflow-tooltip width="80"></el-table-column>
        <el-table-column prop="userName" :label="$t('batch.caller')" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column prop="useService" :label="$t('batch.callInterface')" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="useType" :label="$t('batch.callType')" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column :label="$t('batch.callTime')" show-overflow-tooltip width="140">
          <template slot-scope="scope">
            {{scope.row.startTime | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('batch.finishTime')" show-overflow-tooltip width="140">
          <template slot-scope="scope">
            {{scope.row.endTime | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('batch.pendingFile')" show-overflow-tooltip width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.batchFile && scope.row.batchFile.indexOf('\\') != -1" class="download" @click="handleDownload(scope.row.batchFile)">{{scope.row.batchFile.substring(scope.row.batchFile.lastIndexOf('\\')+1)}}</span>
            <span v-else-if="scope.row.batchFile && scope.row.batchFile.indexOf('/') != -1" class="download" @click="handleDownload(scope.row.batchFile)">{{scope.row.batchFile.substring(scope.row.batchFile.lastIndexOf('/')+1)}}</span>
            <span v-else-if="scope.row.batchFile" class="download" @click="handleDownload(scope.row.batchFile)">{{scope.row.batchFile}}</span>
            <span v-else class="download" >{{scope.row.batchFile}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="schedule" :label="$t('batch.progress')" show-overflow-tooltip width="60"></el-table-column>
        <el-table-column prop="state" :label="$t('batch.status')" show-overflow-tooltip width="80"></el-table-column>
        <el-table-column :label="$t('batch.result')" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.batchResultFile && scope.row.batchResultFile.indexOf('\\') != -1" class="download" @click="handleDownload(scope.row.batchResultFile)">{{scope.row.batchResultFile.substring(scope.row.batchResultFile.lastIndexOf('\\')+1)}}</span>
            <span v-else-if="scope.row.batchResultFile && scope.row.batchResultFile.indexOf('/') != -1" class="download" @click="handleDownload(scope.row.batchResultFile)">{{scope.row.batchResultFile.substring(scope.row.batchResultFile.lastIndexOf('/')+1)}}</span>
            <span v-else-if="scope.row.batchResultFile" class="download" @click="handleDownload(scope.row.batchResultFile)">{{scope.row.batchResultFile}}</span>
            <span v-else class="download">{{scope.row.batchResultFile}}</span>
          </template>
        </el-table-column>
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
    <el-row>
      <el-dialog :title="dialogTitle[operator]" :visible.sync="dialogIsVisible" width="65%" :close-on-click-modal="false" @opened="openModal" @close="closeModal">
        <BatchView ref="batchViewRef" v-model="dialogIsVisible" :operator="operator" @loadData="loadData" @closeModal="closeModal"></BatchView>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import BatchView from './BatchView'
  export default {
    name: "BatchList",
    components: {
      BatchView
    },
    data() {
      return {
        access: '',
        startTime: '',
        endTime: '',
        caller: '',
        callInterface: '',
        callType: '',
        accessOptions: [],
        callerOptions: [],
        callInterOptions: [],
        callTypeOptions: [
          {label: '产品开发测试', value: '产品开发测试'},
          {label: '产品销售测试', value: '产品销售测试'},
          {label: '客户正式调用', value: '客户正式调用'}
        ],
        data: {},
        offset: 0,
        limit: this.$pageSize,
        dialogIsVisible: false,
        operator: 'call',
        dialogTitle: {
          "call": this.$t('batch.$title', [this.$t('call')])
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 打开模态框
      openModal() {
        this.$refs.batchViewRef.getAccessOptions();
        this.$refs.batchViewRef.getTemplateOptions();
      },

      // 关闭模态框
      closeModal() {
        this.$refs.batchViewRef.handleClose();
        this.dialogIsVisible = false;
      },

      // 分页查询
      loadData(index) {
        if (index !== 1) {
          this.access = '';
          this.startTime = '';
          this.endTime = '';
          this.caller = '';
          this.callInterface = '';
          this.callType = '';
        }
        this.params = Object.assign({
          limit: this.limit,
          offset: this.offset,
          requestName: this.access,
          startTime: this.startTime,
          endTime: this.endTime,
          userName: this.caller,
          useService: this.callInterface,
          useType: this.callType
        });
        this.$service.get('/batch/select', {params: this.params})
          .then(r => {
            if (r.data.code === '000000') {
              this.data = r.data.data;
              if (index !== 1) {
                this.accessOptions = [];
                this.callerOptions = [];
                this.callInterOptions = [];
                if (r.data.data.rows.length > 0) {
                  r.data.data.rows.forEach(item => {
                    this.accessOptions.push({label: item.requestName, value: item.requestId});
                    this.callerOptions.push({label: item.userName, value: item.userName});
                    this.callInterOptions.push({label: item.useService, value: item.useServiceId});
                  });
                  this.accessOptions = this.unique(this.accessOptions);
                  this.callerOptions = this.unique(this.callerOptions);
                  this.callInterOptions = this.unique(this.callInterOptions);
                }
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
      handleReset() {
        this.access = '';
        this.startTime = '';
        this.endTime = '';
        this.caller = '';
        this.callInterface = '';
        this.callType = '';
        this.offset = 1;
        this.loadData();
      },

      // 下载
      handleDownload(name){
        const API_ROOT = (process.env.NODE_ENV === 'production') ? '' : 'http://192.168.145.181:8080';
        window.location = API_ROOT + '/batch/download/?downloadType=batchFile&filePath=' + name;
      },

      // 发起调用
      handleCall() {
        this.operator = 'call';
        this.dialogIsVisible = true;
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
