<template>
  <el-main>
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>门店设置</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        class="form"
      >
        <el-form-item label="门店名称*">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="门店类型*">
          <el-select
            v-model="form.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in scenes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="归属用户*">
          <el-select
            v-model="form.user_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in scenes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="门店图片">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="店主电话">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="省市区">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="一键导航">
          <el-input v-model="form.icp" />
        </el-form-item>
        <el-form-item label="门店描述">
          <el-input
            v-model="form.footer_info"
            type="textarea"
            rows="10"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >保存更改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
import { get_scene, get_store_info, save_store_info } from '@/api/store'

export default {
  data() {
    return {
      scenes: [],
      form: {}
    }
  },
  mounted() {
    this.getScene()
    if (this.$route.query.id > 0) {
      this.getData()
    }
  },
  methods: {
    getScene() {
      get_scene().then(res => {
        if (res.code === 20000) {
          this.scenes = res.data
        }
      })
    },
    getData() {
      get_store_info(this.$route.query).then(res => {
        if (res.code === 20000) {
          if (res.data) {
            this.form = res.data
          }
        }
      })
    },
    onSubmit() {
      save_store_info(this.form).then(res => {
        if (res.code === 20000) {
          // this.$notify({
          //   title: '提示',
          //   message: res.message,
          //   type: 'success'
          // })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 32px;
  position: relative;
}
.form {
  background: #fff;
  padding: 32px;
}
</style>
