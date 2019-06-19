<template>
  <div class="drag-box"
       @drop="drop"
       @dragover.prevent>
    <div v-if="label" :style="labelStyle" class="label">{{label}}</div>
    <div v-if="boxScrollX" style="width: 22px; display: inline-block;">
      <i class="el-icon-arrow-left"
         v-if="value.length > 0"
         :style="{'cursor': scrollDis >= 0 ? 'no-drop' : 'pointer','verticalAlign': 'middle'}"
         @click="scrollX('left')"></i>
    </div>
    <div v-if="!boxScrollX"
         :style="fieldStyle">
      <div class="item"
           draggable="true"
           v-for="(item, index) in value"
           :key="index"
           @dragover.prevent
           @dragstart="dragstart($event, item, index)"
           @dragend="dragend($event, item)">
        <DrageLabel :labelStyle="difBg ? Object.assign(itemStyle, {backgroundColor: item.type === 'int'|| item.type === 'bigint' ? '#0a185c': item.type === 'date' ? 'rgb(243, 152, 0)' : '#0a9b4d'}) : itemStyle"
                    :label="item"
                    :title="title"
                    :strOverNum="strOverNum"
                    :showItemIcon="showItemIcon"/>
      </div>
    </div>
     <div v-if="boxScrollX" class="scroll-box">
        <div :style="scrollStyle" class="drag-box">
          <div class="item"
               draggable="true"
               v-for="(item, index) in value"
               :key="index"
               @dragover.prevent
               @dragstart="dragstart($event, item, index)"
               @dragend="dragend($event, item)">
            <DrageLabel :labelStyle="difBg ? Object.assign(itemStyle, {backgroundColor: item.type === 'int'|| item.type === 'bigint' ? '#0a185c': item.type === 'date' ? 'rgb(243, 152, 0)' : '#0a9b4d'}) : itemStyle"
                        :label="item"
                        :showItemIcon="showItemIcon"/>
          </div>
      </div>
    </div>
    <div v-if="boxScrollX" style="width: 20px;display: inline-block;cursor: pointer">
      <i class="el-icon-arrow-right"
         v-if="value.length > 0"
         :style="{'cursor': value.length > 0 ?  'pointer' : 'no-drop','verticalAlign': 'middle'}"
         @click="scrollX('right')"></i>
    </div>
  </div>
</template>

<script>
  import DrageLabel from "./dragLabel"
  export default {
    name: "TrageBox",
    components: {DrageLabel},
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      strOverNum: Number,
      labelStyle: {
        type: Object,
        default: function() {
          return {
            fontSize: '14px',
            color: '#666'
          }
        }
      },
      title: String,
      difBg: Boolean,
      boxScrollX: Boolean,
      addNumber: {
        type: Boolean,
        default: false
      },
      showItemIcon: Boolean,
      preventDrop: Boolean,
      label: {
        type: String,
        default: function() {
          return null
        }
      },
      limit: {
        type: Number,
      },
      fieldStyle: {
        type: Object,
        default: function () {
          return {
            flexDirection: 'row',
          }
        }
      },
      delItem: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      dragendDel: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      itemStyle: {
        type: Object,
        default: function () {
          return {
            'font-size': '12px',
            'background-color': '#ccc',
            color: '#666',
            padding: '1px 10px',
            borderRadius: '3px',
            'text-align': 'left'
          }
        }
      },
      value: Array,
      handleDragEnd: {
        type: Function
      },
      handleDragStart: Function,
      handleDrop: {
        type: Function
      },
      drageIndex: Number
    },
    data() {
      return {
        droppedItem: [],
        inDraged: null,
        scrollStyle: {},
        scrollDis: 0,
      }
    },
    methods: {
      drop (event, drageIndex) {
        console.log('drop', event, drageIndex)
        if(this.preventDrop) {
          const result = this.addNumber
            ? Object.assign(JSON.parse(event.dataTransfer.getData('text')),{drageIndex: this.drageIndex})
            : JSON.parse(event.dataTransfer.getData('text'))
          let newA = this.value.concat([result])
          console.log('result', result)
          if(this.limit) {
            newA.splice(0, newA.length - this.limit)
          }

          this.$emit('change', newA)
          event.dataTransfer.clearData()
          this.$emit('handleDrop', {val: result})
        }
      },
      dragover(e) {
        console.log('dragover', e)
        e.returnValue = false
      },
      dragstart (event, item, index) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData('text', JSON.stringify(item));
        this.inDraged = item
        let startA = this.value
        if(this.delItem)startA.splice(index, 1)
        this.$emit('change', startA)
        this.$emit('handleDragStart',item)
      },
      dragend (event, item) {
        if(this.dragendDel){
          if(event.dataTransfer.dropEffect === 'none') {
            let newA = this.value.concat([item])
            this.$emit('change', newA)
          } else {
            this.$emit('handleDragEnd', item)
          }
        }
        event.dataTransfer.clearData()
      },
      scrollX(dir) {
        if(dir === 'left') {
          this.scrollDis = this.scrollDis >= 0 ? 0 : this.scrollDis+10
          this.scrollStyle = {'transform': 'translateX('+ this.scrollDis+ '%)', 'transition': 'transform 1s ease 0s'}
        } else {
          this.scrollDis = this.value.length > 0 ? this.scrollDis-10 : 0
          this.scrollStyle = {'transform': 'translateX('+ this.scrollDis+ '%)', 'transition': 'transform 1s ease 0s'}
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import 'assets/scss/mixins.scss';
  @import 'assets/scss/variables.scss';
  .drag-box{
    height: 100%;
    width: 100%;
    display: flex;
    background-color: transparent;

    .label{
      white-space: nowrap;
      line-height: 2;
      display: flex;
      z-index: 999;
    }

    .drag-field {
      height: 100%;
      width: 100%;
      background-color: transparent;
      /*flex-direction: column;*/
      display: flex;
      align-items: center;
      color: #eee;
      position: relative;



      .item{
        min-width: $base-length * 3;
        text-align: center;
        vertical-align: middle;
        font-size: $base-font;
        margin: $base-length * .6 $base-length*.3;
        white-space: nowrap;
      }
      .item:hover{
        cursor: pointer;
      }
    }

    .scroll-box {
      width: 100%;
      overflow: hidden;


      .drag-box {
        height: 100%;
        width: 100%;
        background-color: transparent;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #eee;
      }
    }
  }

</style>
