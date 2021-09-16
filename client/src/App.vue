<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
        type="text"
        name="name"
        id="name"
        v-model="name"
        placeholder="Your name"
      />
      <input
        type="email"
        name="email"
        id="email"
        v-model="email"
        placeholder="Your email"
      />
      <input
        type="number"
        name="age"
        id="age"
        v-model="age"
        placeholder="Your age"
      />

      <button type="submit">Register User</button>
    </form>
    <div class="users">
      <div class="user" v-for="(user, index) in users" :key="index">
        <h3>{{ user.name }} - {{ user.age }}</h3>
        <small>{{ user.email }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      name: "",
      age: "",
      email: "",
      users: [],
    };
  },
  methods: {
    handleSubmit() {
      axios
        .post("https://3001-scarlet-wolverine-mgfpl62n.ws-us15.gitpod.io/set", {
          name: this.name,
          age: this.age,
          email: this.email,
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
  mounted() {
    axios
      .get("https://3001-scarlet-wolverine-mgfpl62n.ws-us15.gitpod.io/get")
      .then((res) => {
        console.log(res.data);
        this.users = res.data.users;
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
