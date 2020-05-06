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
                    <span>商户结算列表</span>
                  </el-col>
                  <el-col :span="12">
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
            <el-table-column label="是否结算" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 0" type="warning">待审核</el-tag>
                <el-tag v-if="scope.row.status === 1" type="success">已审核</el-tag>
                <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status === 0"
                  type="success"
                  @click="toExamine(scope.row.id)"
                >审核</el-button>
                <el-button v-if="scope.row.status === 1" type="warning">已审核</el-button>
                <el-button v-if="scope.row.status === 2" type="danger">已拒绝</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="status === 2" label="原因" align="center">
              <template slot-scope="scope">
                <el-alert :title="scope.row.reason" type="error" />
              </template>
            </el-table-column>
            <el-table-column label="申请日期" align="center">
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
            @pagination="getCompanyApplyList"
          />

          <el-dialog title="结算审核确认" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" label-width="100px">
              <el-form-item label="合作商名称">
                <el-input v-model="form.company" disabled="disabled" />
              </el-form-item>
              <el-form-item label="提现方式">
                <el-tag v-if="form.type === 1" type="info">银行卡</el-tag>
                <el-tag v-if="form.type === 2" type="success">支付宝</el-tag>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name" disabled="disabled" />
              </el-form-item>
              <el-form-item label="银行名称">
                <el-input v-model="form.bankname" disabled="disabled" />
              </el-form-item>
              <el-form-item label="开户支行">
                <el-input v-model="form.remarks" disabled="disabled" />
              </el-form-item>
              <el-form-item label="银行卡号">
                <el-input v-model="form.number" disabled="disabled" />
              </el-form-item>
              <el-form-item label="提现金额">
                <el-tag type="danger">{{ form.price / 100 }} 元</el-tag>
              </el-form-item>
              <el-form-item label="手续费">
                <el-tag type="danger">{{ form.fee / 100 }} 元</el-tag>
              </el-form-item>
              <el-form-item label="实际到账金额">
                <el-tag type="success">{{ form.reality_price / 100 }} 元</el-tag>
              </el-form-item>
              <el-form-item v-if="form.status === 2" label="驳回原因">
                <el-input v-model="form.reason" type="textarea" />
              </el-form-item>
              <el-form-item label="审核">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleWithdraw">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { getCompanyApplyList, getCompanyWithdrawalInfo, CompanyCheckWithdraw } from '@/api/settlement'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
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
      },
      form: {
        company: '',
        type: '',
        remarks: '',
        number: '',
        price: '',
        fee: '',
        reality_price: '',
        status: ''
      },
      options: [{
        value: 0,
        label: '请切换审核'
      }, {
        value: 1,
        label: '审核通过'
      }, {
        value: 2,
        label: '驳回拒绝'
      }]
    }
  },
  created() {
    this.getCompanyApplyList()
  },
  methods: {
    onSubmit() {
      this.getCompanyApplyList()
    },
    tableRowClassName({ row }) {
      if (row.type === 1) {
        return 'warning-row'
      } else if (row.type === 2) {
        return 'success-row'
      }
      return ''
    },
    getCompanyApplyList() {
      this.listLoading = true
      getCompanyApplyList(this.listQuery).then(res => {
        this.total = res.data.list.total
        this.list = res.data.list.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    toExamine(id) {
      getCompanyWithdrawalInfo({ id: id }).then(res => {
        if (res.code === 20000) {
          this.form = res.withdraw_info
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
      this.dialogFormVisible = true
    },
    handleWithdraw() {
      CompanyCheckWithdraw(this.form).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible = false
          this.getCompanyApplyList()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
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
  background: #dadada;
}

.el-table .success-row {
  background: #e8f4ff;
}
</style>
