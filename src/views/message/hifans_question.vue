<template>
  <div class="app-container">
    <el-button type="primary">客户反馈</el-button>

    <el-table :data="questionList" style="width: 100%;margin-top:30px;">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="工单标题" width="80">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="客户手机号码">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" size="mini" disabled>已查阅</el-button>
          <el-button v-else type="warning" size="mini" disabled>待处理</el-button>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="创建时间">
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" @click="handleLock(scope.row.id)">查看详情</el-button>
          <el-button v-else type="danger" @click="handleLock(scope.row.id)">查看处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getHifansQuestion"
    />

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="95%">
      <p>{{ content }}</p>
      <img v-for="(item,index) in thumb" :key="index" :src="item.thumb">
      <el-form>
        <el-form-item label="回复">
          <el-input v-if="status == 1" v-model="reply" type="textarea" disabled />
          <el-input v-else v-model="reply" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="status == 1" @click="dialogFormVisible = false">关闭</el-button>
        <el-button v-else type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getHifansQuestion, getQuestionDetail, editHifansQuestionStatus } from '@/api/message'
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
      dialogFormVisible: false,
      id: null,
      title: '',
      content: '',
      thumb: '',
      reply: '',
      status: '',
      questionList: []
    }
  },
  created() {
    this.getHifansQuestion()
  },
  methods: {
    async getHifansQuestion() {
      const res = await getHifansQuestion(this.listQuery)
      this.questionList = res.data.data
      this.total = res.data.total
    },
    handleLock(id) {
      this.dialogFormVisible = true
      getQuestionDetail({
        id: id
      }).then(res => {
        if (res.code === 20000) {
          this.id = res.detail.id
          this.title = res.detail.title
          this.content = res.detail.content
          this.thumb = res.detail.thumb
          this.reply = res.detail.reply
          this.status = res.detail.status
        }
      })
    },
    handleEdit() {
      editHifansQuestionStatus({
        id: this.id,
        reply: this.reply
      }).then(res => {
        if (res.code === 20000) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getHifansQuestion()
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
