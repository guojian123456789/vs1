<template>
<div class="box">
    <div class="picselecttoolbar">
      <input type="file" accept=".xlsx" @change="handleFileChange" />
      <select v-model="selectedTime">
      <option v-for="time in times" :key="time">{{time}}</option>
      </select>
    <button @click="clearSelection" class="cancelbutton">取消显示</button>
    </div>
    <div>
        <img v-if='selectedTime'  :src="selectedPicture" alt="Selected Picture" class="selectimage"/>
    </div>
</div>
</template>

<script>
import * as XLSX from "xlsx"; // 导入 XLSX 库的所有功能

export default {
  data() {
    return {
      selectedFile: null,
      times: [],
      selectedTime: null,
      pictureMap: {} // 用于存储 Time 和对应 Picture 路径的映射
    };
  },
  computed: {
    selectedPicture() {
      return this.pictureMap[this.selectedTime];
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.readFile();
      }
    },

    readFile() {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // 假定 Excel 中只有一个工作表

        const sheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

        // 解析 Excel 数据，假定有 "Time" 和 "Picture" 两列
        this.times = sheetData.map((row) => row.Time);
        this.pictureMap = sheetData.reduce((map, row) => {
          map[row.Time] = row.Picture;
          return map;
        }, {});
      };
      reader.readAsArrayBuffer(this.selectedFile);
    },
    clearSelection() {
      this.selectedTime = null;
    }
  }
};
</script>
<style lang="scss" scoped>
  .box{
    padding: 10px;

    .picselecttoolbar{
      margin-top:50px;
      margin-left:21px;


    }
    .selectimage{
      margin-top: 20px;
      margin-left:21px;
      height:270px;
      width: 500px;
    }
    .cancelbutton{
      margin-left: 10px;
    }
  }



</style>