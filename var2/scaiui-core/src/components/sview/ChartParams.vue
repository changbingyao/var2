<template>
  <div class="data_managment">
    <el-row>
      <el-form ref="form" :model="form" size="mini">
        <el-row>
          <h4>基本设置：</h4>
        </el-row>
        <el-form-item label="画布大小：" label-width="84px">
          <el-col :span="10">
            <el-form-item label="宽度" label-width="50px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="高度" label-width="50px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="边距大小：" label-width="84px">
          <el-col :span="6">
            <el-form-item label="上" label-width="50px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下" label-width="50px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="左" label-width="50px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="右" label-width="50px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <el-row>
        <h4>高级设置：</h4>
      </el-row>
      <el-row>
        <el-tabs type="border-card">
          <el-tab-pane label="坐标轴">
            <el-form ef="form" :model="form" size="mini" label-position="left" >
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴名称：" label-width="80px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴名称：" label-width="80px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴名称颜色：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴名称颜色：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴名称位置（上下）：" label-width="165px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴名称位置（上下）：" label-width="165px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴名称位置（左右）：" label-width="165px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴名称位置（左右）：" label-width="165px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴颜色：" label-width="80px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴颜色：" label-width="80px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴刻度颜色：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴刻度颜色：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴标签颜色：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴标签颜色：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>


            </el-form>
          </el-tab-pane>
          <el-tab-pane label="字体设置">
            <el-form ef="form" :model="form" size="mini" label-position="left" >
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴字体大小：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴字体大小：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="X轴标签字体大小：" label-width="135px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Y轴标签字体大小：" label-width="135px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="折线名称大小：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row><br><br><br><br><br><br><br><br><br><br>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="文本设置">
            <el-form ef="form" :model="form" size="mini" label-position="left" >
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="折线名称字体：" label-width="110px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="图表名称：" label-width="90px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <br><br><br><br><br><br><br><br><br><br>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="颜色及透明度">

            <el-form ef="form" :model="form" size="mini" label-position="left" >
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="横向网格线颜色：" label-width="130px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="纵向网格线颜色：" label-width="130px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="横向网格线透明度：" label-width="140px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="纵向网格线透明度：" label-width="140px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <br><br><br><br><br><br><br><br><br><br>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="其他">
            <el-form ef="form" :model="form" size="mini" label-position="left" >
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="初始动画时间：" label-width="120px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="折线名称位置：" label-width="120px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="折线宽度：" label-width="130px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否为圆滑曲线：" label-width="130px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <br><br><br><br><br><br><br><br><br><br>
            </el-form>
          </el-tab-pane>
        </el-tabs>


      </el-row>



      </el-form>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'paramSet',
    components: {

    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped type="text/scss">
  @import '../../assets/scss/variables.scss';

  .data_managment {
    height: 100%;
    width: 100%;
  }
</style>
