<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float:left">编辑文档</span>
          <span style="float:right">
            <router-link to="/hifans/help/help_list">
              <el-button type="primary">返回列表</el-button>
            </router-link>
          </span>
        </div>
        <div style="margin-bottom:50px;">
          <div class="createPost-container">
            <el-form ref="postForm" :model="postForm" class="form-container">
              <el-form-item prop="content" style="margin-bottom: 30px;">
                <el-input v-model="postForm.title" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item prop="content" style="margin-bottom: 30px;">
                <Tinymce ref="editor" v-model="postForm.content" :height="400" />
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button type="warning" @click="handleEdit(0)">保存草稿</el-button>
                <el-button type="primary" @click="handleEdit(1)">立即发布</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { fetchData, article_edit } from '@/api/hifans'

export default {
  components: { Tinymce },
  data() {
    return {
      postForm: {
        id: '',
        title: '',
        content: '',
        status: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData({ id: id })
  },
  methods: {
    fetchData(data) {
      fetchData(data).then(res => {
        if (res.code === 20000) {
          this.postForm.id = res.data.id
          this.postForm.title = res.data.title
          this.postForm.content = res.data.content
          this.postForm.status = res.data.status
        } else {
          this.$message(res.message)
        }
      })
    },
    handleEdit(status) {
      let tips
      this.postForm.status = status
      if (status === 1) {
        tips = '确定要发布该文档吗?'
      } else {
        tips = '确定保存为草稿吗?'
      }
      this.$confirm(tips, '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await article_edit(this.postForm)
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.$router.push('/hifans/help/help_list')
          }
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item {
  min-height: 100px;
}
.header_image {
  display: block;
  width: 40px;
  height: 40px;
}

.createPost-container {
  position: relative;
}
</style>
