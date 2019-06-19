<template>
  <div class="drop-box" @drop="drop"  @dragover.prevent >
    <div>
      <template v-for="item in blocks" draggable="true">
        <vue-draggable-resizable :grid="[1,1]"
                                 :w="item.position.w"
                                 :h="item.position.h"
                                 :x="item.position.x"
                                 :y="item.position.y"
                                 :parent="true"
                                 :resizable="true"
                                 @dragging="onDrag"
                                 @resizing="onResize"
                                 style="border: 1px solid">
          <div class="drag-content">
            <echarts ref="echarts"
                     :style="eStyle"
                     :options="echartsOptions"
                     v-if="echartsOptions"
            ></echarts>
          </div>
        </vue-draggable-resizable>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dragJoin",
    props: {
      reportId: {
        type: String
      }
    },
    data() {
      return {
        chartListData: [],       // 传给后台的charts表数据
        eStyle: {width: '100%', height: '100%', backgroundColor: 'red'},
        echartsOptions: {
          chartSize: 0,
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        chartSize: 0,
        blocks: [],
        dragComponent: '',
        data: [50, 43, 120, 87, 99, 167, 188, 123, 355],
        axis: {
          xLine: true,
          yLine: true,
          xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', '华为', '中兴', 'oppo']
        },
        barTitle: {
          left: 'right',
          text: '柱状统计图'
        },
        tip: {
          show: true,
          text: '今日用户'
        },
        barGraph: {
          width: 700,
          color: '#3398DB',
          animation: true
        }
      }
    },
    computed: {
      // dragComponent() {
      //
      // }
    },
    methods: {
      drop (event) {
        // 判断画布中是否有图,若无图则让第一张图宽度为画布宽，高度为画布高
        const chartBox = document.querySelectorAll('.drop-box svg');
        const dropBoxW = document.querySelectorAll('.drop-box')[0].clientWidth;
        const dropBoxH = document.querySelectorAll('.drop-box')[0].clientHeight;
        if (chartBox.length === 0) {
          const params = {position: {
              x: 0,
              y: 0,
              w: dropBoxW,
              h: dropBoxH,
            }
          };
          this.blocks.push(params);
        } else {
        const params = Object.assign(JSON.parse(event.dataTransfer.getData('text')), {position: {
            x: event.offsetX,
            y: event.offsetY,
            w: event.offsetX,
            h: event.offsetY
          }
        });
        this.dragComponent = params.name;
        this.blocks.push(params);
        event.dataTransfer.clearData();
        }
        this.$nextTick(() => {
          const draggable = document.querySelectorAll('div.draggable');
          const lastElement = draggable[0].parentNode.lastChild;
          if (lastElement) {
            this.chartListData.push({
              reportId: this.reportId,
              itemOrder: draggable.length,
              width: lastElement.offsetWidth,
              height: lastElement.offsetHeight,
              topPad: lastElement.offsetTop,
              leftPad: lastElement.offsetLeft,
              extAttributs: ''
            })
          }
        });
        // 将数据返回到父组件
        this.$emit('returnChartListData', this.chartListData);
      },
      onResize: function (x, y, width, height) {
        this.$refs.echarts[0].initialize()
        // this.$refs.echarts.addEventListener
        // this.barGraph.width = width
        // this.barGraph.width = width
        // this.echartsOptions.chartSize = width
        // this.eStyle = {'width': width, 'height': height}
        // console.log('onDrag', x, y,this.chartSize)

      },
      onDrag: function (x, y, width, height) {
        console.log('onDrag', x, y, width, height)
      },
      getdata (data) {
        console.log(data);
      }
    }
  }
</script>

<style scoped lang="scss">

  .drop-box {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    position: relative;
    border-radius: 5px;

    .drag-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .echarts {
      height: 100%;
      width: 100%;
    }

  }

</style>
