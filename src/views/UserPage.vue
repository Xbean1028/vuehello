<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">用户信息</div
      ></el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 80%" height="350">
      <el-table-column prop="user_name" label="用户名"> </el-table-column>
      <el-table-column prop="user_id" label="用户id" > </el-table-column>
      <el-table-column prop="user_email" label="Email" > </el-table-column>
      <el-table-column prop="user_tel" label="电话" > </el-table-column>
      <el-table-column prop="isdelete" label="逻辑删除" ></el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="height:300px"></div>
  </div>
</template>

<script>
import store from '../store/index'
var selfs =this;
export default {
  name: "UserPage",
  data() {
    return {
      tableData: [
        {
          user_name: "王小虎",
          user_id: "test1",
          user_email: "test1@163.com",
          user_tel: "12306",
          isdelete: 0,
        },
      ],
      dev:store.getters.getUser.dev,
      userid:store.getters.getUser.name,
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入用户信息界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开用户信息界面");
    next();
  },
  created () {
    this.onSearchdev();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    onSearchdev(){
      console.log(this.valuedev);
      this.axios.get("http://127.0.0.1:8000/mapwebapp/getUserInfo", {
              params: {
                name: this.userid
              },
            })
            .then((response) => {
              console.log("/a", response.data);
              if (response.data.code == "OK") {
                var tempdata = []
                var tempitem =null
                var item = null
                this.tableData.splice(0,this.tableData.length)
                for (item of response.data.datas){
                  tempitem = {'user_id':item.user_id,'user_name':item.user_name,'user_email':item.user_email,'user_tel':item.user_tel,"isdelete":item.isDelete};
                  this.tableData.push(tempitem);
                }
              }
            })
            .catch(error => console.log(error))
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.el-table {
  margin: auto;
}
</style>
