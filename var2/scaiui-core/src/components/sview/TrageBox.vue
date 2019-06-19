<template>
  <div class="drag-field" @drop="drop" @dragover.prevent>
    <div class="item"
         draggable="true"
         :style="itemStyle"
         v-for="(item, index) in value"
         :key="index"
         @dragstart="dragstart($event, item, index)"
         @dragend="dragend($event, item)">
        {{ item.label }}
    </div>
  </div>
</template>

<script>
    export default {
        name: "TrageBox",
        model: {
          prop: 'value',
          event: 'change'
        },
        props: {
          itemStyle: {
            type: Object,
            default: function () {
              return {
                'font-size': '12px',
                'background-color': 'royalblue',
                color: '#eee',
                padding: '5px 10px'
              }
            }
          },
          value: {
            type: Array,
            requied: true
          }
        },
      data() {
        return {
          droppedItem: [],
          inDraged: null
        }
      },
      methods: {
        drop (event) {
          let newA = this.value.concat([JSON.parse(event.dataTransfer.getData('text'))])
          this.$emit('change', newA)
          event.dataTransfer.clearData()
        },
        dragstart (event, item, index) {
          event.dataTransfer.setData('text', JSON.stringify(item));
          event.dataTransfer.effectAllowed = "move";
          this.inDraged = item
          let startA = this.value
          startA.splice(index, 1)
          this.$emit('change', startA)
        },
        dragend (event, item) {
          if(event.dataTransfer.dropEffect === 'none') {
            let newA = this.value.concat([item])
            this.$emit('change', newA)
            event.dataTransfer.clearData()
          } else {
            event.dataTransfer.clearData()
          }
        }
      },
    }

</script>

<style scoped lang="scss">
  @import '../../assets/scss/mixins.scss';
  @import '../../assets/scss/variables.scss';

  .drag-field {
    height: 100%;
    width: 100%;
    background-color: transparent;
    /*background-color: transparent;*/
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item{
      min-width: $base-length * 3;
      padding: $base-length;
      height: $base-length * 1.8;
      text-align: center;
      line-height: $base-length * 2;
      font-size: $base-font;
      background-color: royalblue;
      color: #eee;
    }
    .item:hover{
      cursor: pointer;
    }


  }
</style>
