<script>

</script>
<template>
  <dv-full-screen-container>
    <div class="container">

      <div class="first-row">
        <div class="Ring-cell">
          <div class="Ring-cell-1">
          <dv-border-box-11 title="站点风光">
<!--            <Video></Video>-->
            <ScrollImage></ScrollImage>
          </dv-border-box-11>
          </div>
          <div class="Ring-cell-2">
          <dv-border-box-11 title="土壤湿度监测">
            <ImageViewer3></ImageViewer3>
          </dv-border-box-11>
          </div>
        </div>
        <div class="Map-cell">
            <div class="titlerow">
                <dv-border-box-10>
                    山东省一体化农情监测数据处理平台
                </dv-border-box-10>
            </div>
            <div class="map">
                <dv-border-box-11 title="山东省地图">
                    <SDmap></SDmap>
                </dv-border-box-11>
            </div>
        </div>
        <div class="Line-cell">
          <div class="Line-cell-1">
          <dv-border-box-11 title="作物长势监测">
            <BarChart></BarChart>
          </dv-border-box-11>
          </div>
          <div class="Line-cell-2">
          <dv-border-box-11 title="近五年玉米产量模拟">
            <ScatterChart></ScatterChart>
          </dv-border-box-11>
          </div>
        </div>
      </div>
      <div class="second-row">
        <div class="f-cell">
          <div class="yi-cell">
            <dv-border-box-11 title="GNSS-R作物生长信息监测">
              <ImageViewer2></ImageViewer2>
            </dv-border-box-11>
          </div>
          <!--<div class="er-cell">
            <dv-border-box-11 title="标题5">

            </dv-border-box-11>
          </div> -->
        </div>
        <div class="s-cell">
          <dv-border-box-11 title="威海市作物空间分布图">
            <!--<BarChart></BarChart> -->
<!--            <ScrollBoard></ScrollBoard>-->
              <ImageViewer></ImageViewer>
<!--              <PictureSelect></PictureSelect>-->
          </dv-border-box-11>
        </div>
        <div class="t-cell">
          <dv-border-box-11 title="气象站点数据">
            <LineChart1></LineChart1>
          </dv-border-box-11>
        </div>
      </div>
    </div>
  </dv-full-screen-container> <!-- 全屏容器 -->
</template>

<script>

import LineChart from "@/components/LineChart";
import SDmap from "@/components/SDmap";

import BarChart from "@/components/BarChart";
import TimeSelect from "@/components/TimeSelect";
import ScrollBoard from "@/components/ScrollBoard";
import PictureSelect from "@/components/PictureSelect";
import ScrollImage from "@/components/ScrollImage";
import LineChart1 from "@/components/LineChart1";
import ImageViewer from "@/components/ImageViewer";
import ScatterChart from "@/components/ScatterChart";
import ImageViewer2 from "@/components/ImageViewer2";
import ImageViewer3 from "@/components/ImageViewer3";



export default {
  data(){
    return{
      selectedTime:'',
    };
  },
  components:{
    ScrollBoard,
    BarChart,
    LineChart,

    SDmap,

    TimeSelect,
    PictureSelect,
    ScrollImage,
    LineChart1,
    ImageViewer,
      ScatterChart,
      ImageViewer2,
      ImageViewer3,


  }

}
</script>

<style lang="scss">
  body {
  background-image: url('@/assets/background.png'); /* ?这怎么能标红呢 */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.container{
  height: 100vh;
  display: flex;
  flex-direction: column;
    .titlerow{
        height: 10%;
        width: 100%;
    }
  .first-row{
    flex: 7;
    height: 65%;
    width: 100%;
    display: flex;
    color: white;
    .Ring-cell{
      height: 100%;
      width: 30%;
      .Ring-cell-1{
        height: 50%;
        width: 100%;
      }
      .Ring-cell-2{
        height: 50%;
        width: 100%;
      }

    }
    .Map-cell{
      height: 100%;
      width: 40%;
        .titlerow {
            padding-top: 1%;
            height: 10%;
            width: 100%;
            font-size: 370%; /* 更改字体大小 */
            font-weight: bold; /* 加粗文本 */
            color: #ffffff; /* 更改文本颜色 */
            text-align: center; /* 文本水平居中对齐 */
            display: flex;
            align-items: center; /* 文本垂直居中对齐 */
            justify-content: center; /* 文本水平居中对齐 */


        }
        .map{
            height: 90%;
            width: 100%;
        }
    }
    .Line-cell{
      height: 100%;
      width: 30%;
      .Line-cell-1{
        height: 50%;
        width: 100%;
      }
      .Line-cell-2{
        height: 50%;
        width: 100%;
      }
    }
  }
  .second-row{
    flex: 3;
    height: 35%;
    width: 100%;
    display: flex;
    color: white;
    .f-cell{
      height: 100%;
      width: 30%;
      .yi-cell{
        height: 100%;
        width: 100%;
      }
      .er-cell{
        height: 50%;
        width: 100%;
      }
    }
    .s-cell{
      height: 100%;
      width: 40%;
    }
    .t-cell{
      height: 100%;
      width: 30%;
      .time-select{
        z-index: 2;
      }
    }
  }
}


</style>
