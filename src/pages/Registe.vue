<template>
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col">
      <q-page-container>
        <q-form @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="username" label="Your username *" hint="Name and surname" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]" />

          <q-input filled type="password" v-model="password" label="Your password *" lazy-rules :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
            ]" />

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="注册" @click="registe" color="primary" />
            <q-btn label="登录" @click="login" color="primary" style="margin-left:100px" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-page-container>
    </div>
    <div class="col"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      accept: false,
    };
  },
  setup() { },
  methods: {
    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    login() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        Bmob.User.login(`${this.username}`, `${this.password}`)
          .then((res) => {
            console.log(res);
            if (res.sessionToken != '') {
              sessionStorage.username = this.username;
              this.$router.push('/todo')
            } else {

            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    registe() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        let params = {
          username: this.username,
          password: this.password,
          email: "bmob2021@bmob.cn",
          phone: "1371116656",
        };
        Bmob.User.register(params)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    },
  },
};
</script>
