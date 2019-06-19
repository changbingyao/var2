<template>
  <div id="charts" style="width: 250px;height:330px;"></div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: 'MonitorChart',
    data () {
      return {
        data:{},
        chartOption:{
          title : {
            text: '接口预警',
            x:'left',
            textStyle: {
              fontWeight: 'normal'
            }
          },
          tooltip : {
            trigger: 'item',
            position: 'right',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['正常接口','超时接口'],
            top: 40
          },
          series : [
            {
              name: '接口预警',
              type: 'pie',
              radius : '55%',
              center: ['50%', '70%'],
              data:[],
              label: {
                normal: {
                  formatter: '{c}个',
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: ['#22AC38','#EC6941']
        },
        myChart: null

      }
    },
    mounted() {
      this.loadChartData();
    },
    methods: {
      loadChartData() {
        this.$service.get('/interface/monitors/interfaceNum')
          .then(r => {
            this.data = r.data;
            if (r.data.code === '000000') {
              this.chartOption.series[0].data = [
                {value:r.data.data.SUC_NUM.value, name:'正常接口'},
                {value:r.data.data.FAIL_NUM.value, name:'超时接口'}
              ];
              this.myChart = echarts.init(document.getElementById('charts'));
              this.myChart.setOption(this.chartOption)
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
    },
  }
</script>

<style scoped>

</style>
