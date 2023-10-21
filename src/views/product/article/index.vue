<!-- 文章管理 -->
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
      </el-table-column>
      <el-table-column label="文章标题" width="180">
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章内容" width="180">
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.detail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.author }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.author }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 嵌套表单的 Dialog 按钮 -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="修改文章" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editArticle">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ReditArticle,ReqDelArticle } from "@/api/article"
import { Message } from 'element-ui'
export default {

  name: 'Article',
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        content: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'

    }
  },
  computed: {
    ...mapState({
      // 这里定义你要映射的状态属性
      articleData: state => state.article.getArticle // 示例，假设你要映射名为articleData的状态
    })
  },
  mounted() {
    this.$store.dispatch('article/getArticle')
    this.tableData = this.articleData
  },
  methods: {
    async handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.form.title = row.title
      this.form.content = row.detail
      this.form.id = row.id
    },
    async handleDelete(index, row) {
      console.log(index, row.id)
      let result = await ReqDelArticle(row.id)
      Message({
        message: "删除成功",
        type: "error",
        duration: 5 * 1000
      })
      this.$store.dispatch('article/getArticle')
    },
    async editArticle() {
      const data = {
        id: this.form.id,
        title: this.form.title,
        detail: this.form.content
      }
      let result = await ReditArticle(data)
      console.log(result)
      this.$store.dispatch('article/getArticle')
      this.dialogFormVisible = false
      Message({
        message: "修改成功",
        type: "success",
        duration: 5 * 1000
      })
    }
  },

  watch: {
    articleData: {
      handler(newVal, oldVal) {
        this.tableData = this.articleData
      }
    }
  }


}
</script>
<style scoped></style>
