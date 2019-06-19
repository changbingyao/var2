<template>
  <div class="drag-box"
       @drop="drop"
       @dragover.prevent>
    <span v-if="label" :style="labelStyle" class="label">{{label}}</span>
    <div :style="scrollStyle">
      <div class="drag-field"
           :style="fieldStyle">
        <div class="item"
             draggable="true"
             v-for="(item, index) in value"
             :key="index"
             @dragstart="dragstart($event, item, index)"
             @dragend="dragend($event, item)">
          <DrageLabel :labelStyle="difBg ? Object.assign(itemStyle, {backgroundColor: item.type === 'int'|| item.type === 'bigint' ? '#0a185c': item.type === 'date' ? 'rgb(243, 152, 0)' : '#0a9b4d'}) : itemStyle"
                      :label="item"
                      :showItemIcon="showItemIcon"/>
        </div>
      </div>
    </div>


    <span v-if="boxScrollX" style="display: inline-block; position: absolute;right:10px;cursor: pointer">
      <i class="el-icon-arrow-right" @click="scrollX"></i>
    </span>
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
      labelStyle: {
        type: Object,
        default: function() {
          return {
            fontSize: '14px',
            color: '#666'
          }
        }
      },
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
            flexDirection: 'row'
          }
        }
      },
      delItem: {
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
            borderRadius: '3px'
          }
        }
      },
      value: {
        type: Array,
        requied: true
      },
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
        scrollStyle: {}
        // drageIndex: 0
      }
    },
    methods: {
      drop (event, drageIndex) {
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
      dragstart (event, item, index) {
        event.dataTransfer.setData('text', JSON.stringify(item));
        event.dataTransfer.effectAllowed = "move";
        this.inDraged = item
        let startA = this.value
        if(this.delItem)startA.splice(index, 1)
        this.$emit('change', startA)
        this.$emit('handleDragStart',item)
      },
      dragend (event, item) {
        if(event.dataTransfer.dropEffect === 'none') {
          let newA = this.value.concat([item])
          this.$emit('change', newA)
          event.dataTransfer.clearData()
        } else {
          this.$emit('handleDragEnd')
          event.dataTransfer.clearData()
        }
      },
      scrollX() {
        this.scrollStyle = {'transform': 'translateX(-100px)'}
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
      display: flex;
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


  }

</style>
