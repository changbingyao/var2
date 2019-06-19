<template>
  <el-row :gutter="5">
    <el-col :span="6">
      <div class="grid-content bg-totalVendor">
        <div class="panelChart">
          <p class="titleChart">{{$t('queryStatistic.totalVendor')}}</p>
          <p class="numChart">{{this.data.vendorCount}}个</p>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-totalInterface">
        <div class="panelChart">
          <p class="titleChart">{{$t('queryStatistic.totalInterface')}}</p>
          <p class="numChart">{{this.data.interCount}}个</p>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-respondTime">
        <div class="panelChart">
          <p class="titleChart">{{$t('queryStatistic.responseTime')}}</p>
          <p class="numChart">{{this.data.timeAvg}}ms</p>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-interfaceError">
        <div class="panelChart">
          <p class="titleChart">{{$t('queryStatistic.interfaceErrorRate')}}</p>
          <p class="numChart">{{this.data.errRate}}%</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "CountChart",
    data() {
      return {
        data: {}
      }
    },
    mounted() {
      this.loadNum();
    },
    methods: {
      loadNum(){
        this.$service.get('/vendor/vendorInfo/vendorTotal')
          .then(r => {
            if (r.data.code === '000000') {
              this.data = r.data.data
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg-totalVendor {
    background: url("../../assets/img/totalVendor.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .bg-totalInterface {
    background: url("../../assets/img/totalInterface.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .bg-respondTime {
    background: url("../../assets/img/respondTime.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .bg-interfaceError {
    background: url("../../assets/img/interfaceError.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 148px;
    position: relative;
    overflow: hidden;
  }

  .panelChart{
    font-family: "Microsoft YaHei";
    color: #fff !important;
    margin-left: 100px;
    margin-top: 30px;
    padding-right: 20px ;
    text-align: right;
  }

  .titleChart{
    font-weight: 600;
    font-size: 12px;
  }

  .numChart{
    font-weight: 600;
    font-size: 23px;
    word-break: break-all;
  }

  </style>
