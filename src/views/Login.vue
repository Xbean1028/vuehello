<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          aria-placeholder="请输入用户名"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          aria-placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      re_dev:null,
    };
  },
  methods: {
    onsubmit() {
      this.$router.push("/index");
    },
    // eslint-disable-next-line no-unused-vars
    submitForm(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .get("http://127.0.0.1:8000/mapwebapp/checklogin", {
              params: {
                name: form.name,
                pass: form.password,
              },
            })
            .then((response) => {
              console.log("/a", response.data);
              if (response.data.code == "OK") {
                this.re_dev = response.data.dev;
                sessionStorage.setItem("isLogin", "true");
                this.$store.dispatch("asyncUpdateUser", {
                  name: this.form.name,
                  dev:this.re_dev
                });
                this.$router.push("/index");
              } else {
                this.$message({
                  message: "用户名或密码错误",
                  type: "warning",
                });
              }
            });
        } else {
          this.$message({
            message: "用户名或密码错误",
            type: "warning",
          });
          return false;
        }
      });

      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     sessionStorage.setItem("isLogin", "true");
      //     this.$store.dispatch('asyncUpdateUser', { name: this.form.name });
      //     this.$router.push("/index");
      //   } else {
      //     this.$message({
      //       message: "用户名或密码错误",
      //       type: "warning"
      //     });
      //     return false;
      //   }
      // });
    },
  },
};
</script>

<style scoped>
.login-box {
  width: 350px;
  margin: 150px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
}

.login-title {
  text-align: center;
}
</style>
