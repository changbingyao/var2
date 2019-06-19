<template>
  <div>
    <Select :value='value' :multiple='multiple' :disabled='disabled' :clearable='clearable' :filterable='filterable'
            :remote='remote' :remote-method='remoteMethod' :loading='loading' :loading-text='loadingText'
            :label='label' :size='size' :placeholder='placeholder' :not-found-text='notFoundText'
            :label-in-value='labelInValue' :placement='placement' :transfer='transfer' :element-id='elementId'
            @on-change="handChange" @on-query-change="handQueryChange" @on-clear="handClear"
            @on-open-change="handOpenChange">
      <template v-for="item in listData">
        <OptionGroup v-if="item.children" :label="item.label">
          <iOption v-for="item2 in item.children" :value="item2.value" :key="item2.key" :label="item2.label"></iOption>
        </OptionGroup>
        <Option v-else :value="item.value" :key="item.key" :label="item.label"></Option>
      </template>
    </Select>
  </div>
</template>

<script>
  import {Select, OptionGroup, Option} from 'iview'

  export default {
    name: "sSelect2",
    data() {
      return {
        queryData: []
      };
    },
    components: {
      Select, OptionGroup, Option
    },
    props: {
      option: {type: [String, Array]},
      remoteMethod: {
        type: Function
      },
      loadingText: {
        type: String
      },
      notFoundText: {
        type: String
      },
      labelInValue:
        {
          type: Boolean,
          default:
            false
        },
      elementId: {
        type: String
      }
    },
    extends:
      {
        mixins: [Select]
      },
    computed: {
      listData: function () {
        //console.log("select2 ========computed")
        if (this.option && typeof this.option === 'string') {
          return this.queryData;
        } else {
           //console.log("select--option--->", this.option)
           return this.option;
         }
      }
    }
    ,
    mounted: function () {
      //console.log("select2 ========mounted", this.option, this.$i18n.locale)
      if (this.option && typeof this.option === 'string') {
        let list = window.sessionStorage.getItem('_DICT_' + this.$i18n.locale + "_" + this.option);
        if (list) {
          //console.log("select2 ====222====mounted", list)
          this.queryData = JSON.parse(list);
        } else {
          this.$service.get(`/plist/${this.option}`, {params: {locale: this.$i18n.locale}}).then(r => {
            this.queryData = r.data.data;
            window.sessionStorage.setItem('_DICT_' + this.$i18n.locale + "_" + this.option, JSON.stringify(r.data.data));
            //console.log("------->", JSON.stringify(this.listData));
          }).catch(error => {
            console.log(error);
          });
        }
      } else {
        this.queryData = this.option;
      }
    }
    ,
    methods: {
      handChange(value) {
        console.log("select2=====>",value)
        this.$emit('input', value);
        this.$emit('on-change', value);
        //配合element form 使用校验问题
        this.dispatch('ElFormItem', 'el.form.change', value);
        this.$emit('change', value);
      }
      ,
      handQueryChange(query) {
        this.$emit('on-query-change', query);
      }
      ,
      handClear(event) {
        this.$emit('on-clear', event);
        this.$emit('clear', event);
      }
      ,
      handOpenChange(event) {
        this.$emit('on-open-change', event);
        this.$emit('visible-change', event);
      }
    }
  }
  ;
</script>

<style scoped>

</style>
