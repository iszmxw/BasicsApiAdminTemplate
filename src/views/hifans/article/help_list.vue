<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="float:left">帮助文档</span>
          <span style="float:right">
            <router-link to="/hifans/help/help_add">
              <el-button type="primary">添加文档</el-button>
            </router-link>
          </span>
        </div>
        <div style="margin-bottom:50px;">
          <el-table :data="articleList" border>
            <el-table-column align="center" label="文章ID" width="80">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="标题">
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column align="header-center" label="状态">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status == 0" type="warning" disabled>待发布</el-button>
                <el-button v-if="scope.row.status == 1" type="success" disabled>已发布</el-button>
              </template>
            </el-table-column>
            <el-table-column align="header-center" label="创建时间">
              <template
                slot-scope="scope"
              >{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">重新编辑</el-button>
                <el-button
                  v-if="scope.row.status == 1"
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.row.id)"
                >删除文档</el-button>
                <el-button
                  v-if="scope.row.status == 0"
                  type="success"
                  size="small"
                  @click="handlePublish(scope.row.id)"
                >立即发布</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="article_list"
          />
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { article_list, article_delete, article_status } from '@/api/hifans'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      articleList: []
    }
  },
  created() {
    this.article_list()
  },
  methods: {
    async article_list() {
      const res = await article_list(this.listQuery)
      this.articleList = res.data.data
      this.total = res.data.total
    },
    handleDelete(id) {
      this.$confirm('确定要删除该文档吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await article_delete({ id: id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.article_list()
          }
        })
        .catch(err => { console.error(err) })
    },
    handlePublish(id) {
      this.$confirm('确定要发布该文档吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await article_status({ id: id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.article_list()
          }
        })
        .catch(err => { console.error(err) })
    },
    handleEdit(id) {
      this.$router.push('/hifans/help/help_edit/' + id)
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
</style>
