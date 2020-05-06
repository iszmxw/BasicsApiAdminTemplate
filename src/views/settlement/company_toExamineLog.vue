<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <div class="chart-wrapper">
        <div class="app-container">
          <div class="filter-container">
            <div class="el-card__header">
              <div class="clearfix">
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <span>合作商户提现审核记录</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form>
                        <el-form-item label>
                          <el-col :span="11">
                            <el-date-picker
                              v-model="listQuery.date1"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="date"
                              placeholder="开始时间"
                              style="width: 100%;"
                            />
                          </el-col>
                          <el-col :span="11">
                            <el-date-picker
                              v-model="listQuery.date2"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="date"
                              placeholder="结束时间"
                              style="width: 100%;"
                            />
                          </el-col>
                          <el-col class="line" :span="2">
                            <el-button type="primary" @click="onSubmit">搜索</el-button>
                          </el-col>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            :row-class-name="tableRowClassName"
            style="width: 100%;"
          >
            <el-table-column label="ID" align="center" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="合作商名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.company }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提现金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.price / 100 }} 元</span>
              </template>
            </el-table-column>
            <el-table-column label="手续费" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.fee / 100 }} 元</span>
              </template>
            </el-table-column>
            <el-table-column label="实际到账金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.reality_price / 100 }} 元</span>
              </template>
            </el-table-column>
            <el-table-column label="提现方式" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.type === 1" type="info">银行卡</el-tag>
                <el-tag v-if="scope.row.type === 2" type="success">支付宝</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="银行卡号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.number }}</span>
              </template>
            </el-table-column>
            <el-table-column label="银行名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.bankname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开户支行" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.remarks }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提现状态" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 1" type="primary">已审核</el-tag>
                <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
                <el-tag v-if="scope.row.status === 3" type="success">已完成</el-tag>
                <el-alert v-if="scope.row.status === 2" :title="scope.row.reason" type="error" />
              </template>
            </el-table-column>
            <el-table-column label="申请日期" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status === 1"
                  type="success"
                  @click="toExamine(scope.row)"
                >转账</el-button>
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
      </div>
    </el-row>
  </div>
</template>

<script>
import { getCompanyApplyListLog, company_apply_check } from '@/api/settlement'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: {
    Pagination
  },
  data() {
    return {
      type: '',
      status: '',
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        date1: undefined,
        date2: undefined,
        type: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    tableRowClassName({ row }) {
      if (row.type === 1) {
        return 'success-row'
      } else if (row.type === 2) {
        return 'warning-row'
      }
    },
    getList() {
      this.listLoading = true
      getCompanyApplyListLog(this.listQuery).then(res => {
        this.total = res.data.list.total
        this.list = res.data.list.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    toExamine(data) {
      this.$confirm('您确定已转账', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          company_apply_check(data).then(res => {
            if (res.code === 20000) {
              this.$notify({
                title: '成功',
                message: res.message,
                type: 'success'
              })
              this.getList()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              })
            }
          })
        })
    }
  }
}
</script>

<style>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-table .warning-row {
  background: #e8f4ff;
}

.el-table .success-row {
  background: #dbece3;
}
</style>
