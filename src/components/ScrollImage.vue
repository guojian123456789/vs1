<template>
  <div class="box">
    <img ref="imageElement" class="image" :src="currentImage">
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg','image4.jpg','image5.jpg','image6.jpg',
        'image7.jpg', 'image8.jpg','image9.jpg','image10.jpg','image11.jpg','image12.jpg', 'image13.jpg',
        'image14.jpg','image15.jpg','image16.jpg','image17.jpg','image18.jpg','image19.jpg'], // 替换为你的图片路径
      currentIndex: 0,
      currentImage: ''
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.$refs.imageElement.src = this.images[this.currentIndex];
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.nextImage, 3000); // 每隔3秒切换一次图片
    },
  },
  mounted() {
    this.startAutoPlay();
    this.nextImage()
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  margin-top: 8%;
  max-width: 80%;
  max-height: 80%;
}
</style>
