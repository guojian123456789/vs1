<template>
  <div class="box">
    <img :src="imageSrc1" alt="显示的图片1" class="img1">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc1: 'GNSSR2.png', // 替换为你的图片路径


    };
  },
};
</script>
<style lang="scss" scoped>
    .box {
      .img1 {
        position: relative;
        width: 90%;
        margin-top: 8%;
        margin-left: 4%;
      }
    }

</style>