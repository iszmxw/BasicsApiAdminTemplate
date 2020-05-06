<template>
  <div class="app-container">
    <el-badge :value="num" class="item">
      <el-button type="primary">留言反馈</el-button>
    </el-badge>

    <el-table :data="suggestList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="称呼" width="80">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号码">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="微信号">
        <template slot-scope="scope">{{ scope.row.wechat }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="电子邮箱">
        <template slot-scope="scope">{{ scope.row.eamil }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="IP地址">
        <template slot-scope="scope">{{ scope.row.ip }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="地址">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="留言信息">
        <template slot-scope="scope">{{ scope.row.message }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="留言时间">
        <template slot-scope="scope">{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success" disabled>已查阅</el-button>
          <el-button v-else type="danger" @click="handleLock(scope)">待处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getSuggestList"
    />
  </div>
</template>

<script>
import { getSuggestList, editSuggestStatus } from '@/api/message'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      num: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      suggestList: []
    }
  },
  created() {
    this.getSuggestList()
  },
  methods: {
    async getSuggestList() {
      const res = await getSuggestList(this.listQuery)
      if (res.code === 20000) {
        this.suggestList = res.data.list.data
        this.total = res.data.list.total
        this.num = res.data.num
      }
    },
    handleLock({ $index, row }) {
      this.$confirm('确定吗?', '温馨提示', {
        confirmButtonText: 'OK',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await editSuggestStatus({ id: row.id })
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getSuggestList()
          }
        })
        .catch(err => { console.error(err) })
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
