<template>
  <div style="{width: 500px; height:500px;}">
    <div class="drag-size">
      <template v-for="item in blocks">
        <vue-draggable-resizable :w="item.w"
                                 :h="item.h"
                                 :x="item.x"
                                 :y="item.y"
                                 :parent="true"
                                 v-on:dragging="onDrag"
                                 v-on:resizing="onResize"
                                 style="border: 1px solid">
          <p>X: {{ item.x }} / Y: {{ item.y }} - Width: {{ item.width }} / Height: {{ item.height }}</p>
        </vue-draggable-resizable>
      </template>
    </div>
  </div>
</template>

<script>
    export default {
      data: function () {
        return {
          blocks: [
            {
              x: 0,
              y: 0,
              w: 100,
              h: 30,
            },
            {
              x: 70,
              y: 30,
              w: 300,
              h: 90,
            },
            {
              x: 50,
              y: 69,
              w: 200,
              h: 300,
            },
          ]
        }
      },
      methods: {
        onResize: function (x, y, width, height) {
          this.x = x
          this.y = y
          this.width = width
          this.height = height
        },
        onDrag: function (x, y) {
          this.x = x
          this.y = y
        }
      }
    }
</script>

<style scoped lang="scss">
  .drag-size {
    height: 100%;
    width: 100%;
    background-color: #eee;
    position: relative;
  }
</style>
