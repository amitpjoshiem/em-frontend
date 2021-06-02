<template>
  <aside class="bg-primary min-h-screen flex flex-col">
    <img src="../assets/img/logo.png" />
    <div class="flex flex-col justify-center items-center flex-grow">
      <div class="item active flex justify-center items-center cursor-pointer">
        <img src="../assets/img/dashboard.png" />
      </div>
      <div class="item flex justify-center items-center cursor-pointer">
        <img src="../assets/img/list.png" />
      </div>
      <div class="item flex justify-center items-center cursor-pointer">
        <img src="../assets/img/activity.png" />
      </div>
      <div class="item flex justify-center items-center cursor-pointer">
        <img src="../assets/img/statistics.png" />
      </div>
    </div>
  </aside>
</template>

<style lang="css" scoped>
aside {
  width: 68px;
}
.item {
  height: 56px;
  width: 100%;
}
.active {
  background-color: rgba(103, 116, 148, 0.1);
}
</style>
