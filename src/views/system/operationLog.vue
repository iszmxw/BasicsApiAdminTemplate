<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="el-card__header">
        <div class="clearfix">
          <router-link to="/dashboard">
            <el-button>登录日志</el-button>
          </router-link>
          <router-link to="/system/operationLog">
            <el-button type="primary">操作日志</el-button>
          </router-link>
        </div>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="scope" width="80px">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center" width="140px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.account_id === 1" type="info">{{ scope.row.role_name }}</el-tag>
          <el-tag v-else type="success">{{ scope.row.role_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.content }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { operationLog } from '@/api/dashboard'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      operationLog(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
