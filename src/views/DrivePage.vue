<template>
  <div class="infopage">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content" style="font: 20px 微软雅黑">我的设备</div></el-col
      >
    </el-row>
    <el-table :data="tableData" border style="width: 80%">
      <!-- style="width: 80%" height="100%" -->
      <el-table-column prop="dev_id" label="设备id">
      </el-table-column>
      <el-table-column prop="user_id" label="用户id">
      </el-table-column>
      <el-table-column prop="insert_time" label="添加时间" width="180">
      </el-table-column>
      <el-table-column prop="dev_state" label="设备状态" >
      </el-table-column>
      <el-table-column
        prop="isdelete"
        label="逻辑删除"
      ></el-table-column>

      <!-- <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div style="height:100px"></div>
  </div>
</template>

<script>
import store from '../store/index'
var selfs =this;
export default {
  name: "DrivePage",
  data() {
    return {
      tableData: [
        {
          dev_id: "dev1",
          user_id: "test1",
          insert_time: "2021-05-01 19:20:30",
          dev_state: "0",
          isdelete: 0,
        },
      ],
      dev:store.getters.getUser.dev,
      userid:store.getters.getUser.name,
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("进入设备管理界面");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("离开设备管理界面");
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
      this.axios.get("mapwebapp/getDevInfo", {
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
                  tempitem = {'user_id':item.user_id,'dev_id':item.dev_id,'insert_time':item.insert_time,'dev_state':item.dev_state,"isdelete":item.isDelete};
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
.infopage {
  height: 100%;
}
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
