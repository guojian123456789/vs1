<template>
  <div class="box">
    <div class="img-container">
      <img :src="imageSrc1" alt="显示的图片1" class="img1">
      <div class="text1">威海市冬小麦空间分布图</div>
    </div>
    <div class="img-container">
      <img :src="imageSrc2" alt="显示的图片2" class="img2">
      <div class="text2">威海市玉米空间分布图</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc1: 'xiaomai.png', // 替换为你的图片路径
        imageSrc2: 'yumi.png',

    };
  },
};
</script>
<style lang="scss" scoped>
    .box{
      display: flex;
      .img-container{
        position: relative;
        width: 100%;
        height:100%;
        margin-top: -2%;
        .img1{
            position: relative;
            width: 95%;
            margin-top: 15%;
            margin-left: 3%;
        }
        .img2{
            position: relative;
            width: 95%;
            margin-top: 15%;
            margin-left: -2%;
        }
        .text1{
          position: relative;
          width: 100%;
          margin-left: 25%;
          margin-top: -2%;
          font-size:115%;
        }
        .text2{
          position: relative;
          width: 100%;
          margin-left: 25%;
          margin-top: -2%;
          font-size:120%;
        }
      }

    }

</style>