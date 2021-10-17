<template style="height:1000px;">
  <div
    :style="bg"
    class="row content"
    id="mainBox"
    style="margin-top: 10px; height: 1000px"
  >
    <div class="col-md-10" id="colMd10" style="height: 1000px">
      <div class="row">
        <div
          color="white"
          class="col content"
          v-for="day in days"
          v-bind:key="day"
          style="
            height: 35px;
            margin: 1px;
            text-align: center;
            padding-top: 7px;
            font-weight: bold;
          "
        >
          {{ day }}
        </div>
      </div>

      <div class="row" v-for="i in 24 / timeSegment" v-bind:key="i" style="">
        <tempate v-for="j of 8" v-bind:key="j" class="col">
          <div class="row" v-if="j == 1" style="">
            <div class="col">
              <div
                class="col content"
                style="
                  height: 35px;
                  margin: 1px;
                  text-align: center;
                  padding-top: 7px;
                  letter-spacing: 1px;
                  font-weight: bold;
                "
              >
                {{
                  ((i - 1) * timeSegment) % 1 == 0
                    ? (i - 1) * timeSegment
                    : (i - 1) * timeSegment - 0.5
                }}:{{ ((i - 1) * timeSegment) % 1 == 0 ? "00" : "30" }}—{{
                  (i * timeSegment) % 1 == 0
                    ? i * timeSegment
                    : i * timeSegment - 0.5
                }}:{{ (i * timeSegment) % 1 == 0 ? "00" : "30" }}
              </div>
            </div>
          </div>
          <!-- style="border: 1px solid white;" -->
          <div v-if="j != 1" class="row">
            <div class="col outContent" style="margin: 1px; border-radius: 5px">
              <div
                class="col content item"
                :class="`item${28 * (i - 1) + (j - 2) * 4 + 1}`"
                :id="`${i}_${j}1`"
                @click="isUrgency(`${i}_${j}1`, $event)"
                data-value=""
                data-color=""
                style="height: 35px"
              ></div>
            </div>
            <div class="col outContent" style="margin: 1px; border-radius: 5px">
              <div
                class="col content item"
                :class="[
                  `item${28 * (i - 1) + (j - 2) * 4 + 2}`,
                  { content: true },
                ]"
                :id="`${i}_${j}2`"
                @click="isFinished(`${i}_${j}2`, $event)"
                data-value=""
                data-color=""
                style="height: 35px"
              ></div>
            </div>
            <div class="col outContent" style="margin: 1px; border-radius: 5px">
              <div
                class="col content item"
                :class="`item${28 * (i - 1) + (j - 2) * 4 + 3}`"
                :id="`${i}_${j}3`"
                @click="selectItem(`${i}_${j}3`, $event)"
                data-value=""
                data-color=""
                style="height: 35px"
              ></div>
            </div>
            <div class="col outContent" style="margin: 1px; border-radius: 5px">
              <div
                class="content item"
                :class="`item${28 * (i - 1) + (j - 2) * 4 + 4}`"
                :id="`${i}_${j}4`"
                @click="selectItem(`${i}_${j}4`, $event)"
                data-value=""
                data-color=""
                style="height: 35px"
              ></div>
            </div>
          </div>
        </tempate>
      </div>
    </div>
    <div class="col-md-2">
      <div class="row">
        <div class="col">
          <div>
            <q-card square flat bordered class="">
              <q-card-section class="content">
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">事件列表</div>
                  </div>

                  <div class="col-auto">
                    <q-btn
                      color="white"
                      round
                      flat
                      dense
                      :icon="
                        expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                      "
                      @click="expanded = !expanded"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-slide-transition class="content">
                <div v-show="expanded">
                  <q-separator />
                  <q-card-section class="text-subitle2">
                    <q-input
                      square
                      outlined
                      v-model="itemLabel"
                      label="Please input item"
                    />

                    <q-input
                      filled
                      v-model="itemColor"
                      class="my-input"
                      style="margin-top: 5px"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-color v-model="itemColor" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:after>
                        <q-btn round dense flat icon="send" @click="addItem" />
                      </template>
                    </q-input>
                  </q-card-section>
                </div>
              </q-slide-transition>
              <q-separator />

              <q-card-actions vertical align="center" style="" class="content">
                <div
                  v-for="item in itemsArr"
                  v-bind:key="item"
                  class="lsy"
                  style="width: 100%"
                >
                  <div
                    class="content"
                    :style="`background:${item.color1};`"
                    style="
                      width: 100%;
                      color: black;
                      text-align: center;
                      padding: 8px;
                      box-shadow: 0px 1px 2px 1px rgb(162, 155, 131);
                      margin-top: 10px;
                    "
                    flat
                  >
                    {{ item.label }}
                  </div>
                  <q-separator />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div>
            <q-card square flat bordered class="">
              <q-card-section class="content">
                <div class="text-h6">说明</div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right" class="content">
                <div
                  class="row"
                  style="
                    width: 100%;
                    box-shadow: 0px 1px 2px 1px rgb(162, 155, 131);
                  "
                >
                  <div
                    v-for="explain in explains"
                    v-bind:key="explain"
                    class="col"
                    style="
                      height: 40px;
                      font-size: 10px;
                      text-align: center;
                      padding-top: 12px;
                      font-weight: bold;
                    "
                  >
                    {{ explain }}
                  </div>
                </div>

                <div class="row" style="width: 100%; margin-top: 10px">
                  <div class="col-md-4">
                    <div style="width: 100%">
                      <div
                        class=""
                        style="
                          height: 40px;
                          font-size: 10px;
                          text-align: center;
                          height: 35px;
                          padding-top: 9px;
                          font-weight: bold;
                        "
                      >
                        urgency?
                      </div>
                      <div
                        class=""
                        style="
                          height: 40px;
                          font-size: 10px;
                          text-align: center;
                          height: 35px;
                          padding-top: 9px;
                          font-weight: bold;
                          margin-top: 10px;
                        "
                      >
                        finished?
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div
                      class="row"
                      style="
                        box-shadow: 0px 1px 2px 1px rgb(162, 155, 131);
                        margin-bottom: 10px;
                      "
                    >
                      <div
                        class="col content"
                        style="
                          font-size: 10px;
                          text-align: center;
                          height: 35px;
                          padding-top: 9px;
                          font-weight: bold;
                          background: #ffff00;
                        "
                      >
                        Yes
                      </div>
                      <div
                        class="col content"
                        style="
                          font-size: 10px;
                          text-align: center;
                          height: 35px;
                          padding-top: 9px;
                          font-weight: bold;
                        "
                      >
                        No
                      </div>
                    </div>
                    <div
                      class="row"
                      style="box-shadow: 0px 1px 2px 1px rgb(162, 155, 131)"
                    >
                      <div
                        class="col content"
                        style="
                          font-size: 10px;
                          text-align: center;
                          height: 35px;
                          padding-top: 9px;
                          font-weight: bold;
                          background: rgb(0, 245, 123);
                        "
                      >
                        Yes
                      </div>
                      <div
                        class="col content"
                        style="
                          font-size: 10px;
                          text-align: center;
                          height: 35px;
                          padding-top: 9px;
                          font-weight: bold;
                        "
                      >
                        No
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div>
            <q-card square flat bordered>
              <q-card-section
                class="content"
                style="border-top: 1px solid white"
              >
                <div class="text-h6">操作</div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right" class="content">
                <div class="row" style="width: 100%">
                  <div
                    class="col-md-4"
                    style="
                      height: 40px;
                      text-align: left;
                      padding: 10px 0 0 10px;
                    "
                  >
                    时间段
                  </div>
                  <q-select
                    style="box-shadow: 0px 1px 2px 1px rgb(162, 155, 131)"
                    class="col-md-8"
                    dense
                    square
                    outlined
                    v-model="timeSegment"
                    :options="timeSegmentOptions"
                  />
                </div>
                <div class="row" style="width: 100%; margin-top: 10px">
                  <q-btn icon="fas fa-chevron-left" class="col-md-3"/>
                  <q-btn :label="currentWeek"  class="col-md-6"/>
                  <q-btn icon="fas fa-chevron-right" class="col-md-3"/>
                </div>
                <div class="row" style="width: 100%; margin-top: 10px">
                  
                  <q-btn :label="currentWeekDate" class="col-md-12"/>
                  
                </div>
                <div class="row" style="width: 100%; margin-top: 10px">
                  <q-btn style="width: 100%" @click="saveDate"> save </q-btn>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div>
            <q-card square flat bordered>
              <q-card-section
                class="content"
                style="border-top: 1px solid white"
              >
                <div class="text-h6">外观</div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right" class="content">
                <div class="row" style="width: 100%">
                  <q-input
                    style="width: 100%"
                    outlined
                    label="背景图片"
                    readonly
                    dense
                  >
                    <template v-slot:append>
                      <q-btn
                        round
                        dense
                        flat
                        icon="add"
                        @click="clickChangeBgBtn"
                      />
                    </template>
                  </q-input>
                  <input
                    type="file"
                    style="display: none"
                    id="bgInput"
                    @change="changeBg(this)"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();
    //$q.dark.set(true);
    return {};
  },
  data() {
    return {
      currentWeek: "",
      currentWeekDate: "",
      days: [
        "时间/日期",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
      itemsArr: [
        {
          label: "吃饭",
          value: "#ff66ff-吃饭",
          color1: "#ff66ff",
        },
        { label: "睡觉", value: "#9999ff-睡觉", color1: "#9999ff" },
        { label: "玩游戏", value: "#ff9933-玩游戏", color1: "#ff9933" },
      ],
      expanded: false,
      itemLabel: "",
      itemColor: "#FF00FF",
      loading2: false,
      percentage2: 0,
      finished: false,
      urgency: false,
      timeSegment: 1,
      timeSegmentOptions: ["0.5", "1", "1.5", "2", "3", "4", "6", "12"],
      explains: ["urgency?", "finished?", "remark", "item"],
      bg: {
        backgroundImage: "url(" + require("../assets/image/bg.jpg") + ")",
        // background: 'linear-gradient(to bottom, #5583EE 0%,#41D8DD 100%)',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      },
      bg1: {
        background: "rgba(255,255,255,0.5)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      },
      today: "",
      oldDate: "",
      otherDay: "",
      currentDate: ref({ from: "2020/07/08", to: "2020/07/17" }),
      currentDateRange: "",
      currentObjectId: "",
      itemList: [],
    };
  },
  created() {
    this.getWeek();
    if (sessionStorage.itemsArr == "" || sessionStorage.itemsArr == null) {
    } else {
      this.itemsArr = JSON.parse(sessionStorage.getItem("itemsArr"));
      console.log(this.itemsArr);
    }
    this.initItem("");
    // document.getElementById('mainBox').style.height = '1000px';
  },
  watch: {
    currentDate(val, oldVal) {
      //普通的watch监听
      this.changeCurrentDate(val, oldVal);
    },
    timeSegment(val, oldVal) {
      this.changeTimeSegment(val, oldVal);
    },
  },
  methods: {
    getWeek() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      // Days in a month
      let days = new Date(y, m + 1, 0).getDate();
      let weekday = date.getDay();
      if (weekday == 0) {
        weekday = 6;
      } else {
        weekday -= 1;
      }
      let lastday = (d + (6 - weekday)) % days;
      let firstDay = d - weekday;
      this.currentWeekDate = `${y}-${m+1}-${firstDay}\xa0\xa0\xa0<->\xa0\xa0\xa0${y}-${m+1}-${lastday}`
      console.warn("Monday of current week:%d年%d月%d日", y, m+1, firstDay);
      console.warn("Sunday of current week:%d年%d月%d日", y, m+1, lastday);
      let day1 = new Date(y, m, d);
      let day2 = new Date(y, 0, 1);
      let result = Math.round((day1.valueOf() - day2.valueOf()) / 86400000);
      result =Math.floor(result / 7);
      this.currentWeek = `第${result}周`
      // console.error(result);
    },

    clickChangeBgBtn() {
      document.getElementById("bgInput").click();
    },

    changeBg(e) {
      var files = document.getElementById("bgInput").files;

      // var bmobFile = Bmob.File(files[0].name, files[0]);
      // console.log(bmobFile.save().then());
      // console.log(files[0].name);
      // console.log(files[0]);
      // bmobFile.save().then(res => {
      //   console.log(res.length);
      //   console.log(res);
      // })

      // console.log(files);
      this.fileReader(files[0], function (res) {
        var bgImg = files[0];
        // var contents = document.getElementsByClassName('content');
        // console.log(res.currentTarget.result);
        // for (var i =0 ;i<contents.length;i++){
        //   console.log(contents[i]);
        //   contents[i].style.backgroundImage = `url(${res.currentTarget.result})`;
        // }

        // var bgImgData =
        // {	//基本数据
        //   name: bgImg.name,
        //   size: bgImg.size,
        //   type: bgImg.type,
        //   base64: res.currentTarget.result
        // };
        // console.log(bgImgData);
        // const query = Bmob.Query('item');

        // query.get(sessionStorage.getItem('currentObjectId')).then(res => {
        //   console.log(res)
        //   res.set('bgImg',img)
        //   res.save()
        // }).catch(err => {
        //   console.log(err)
        // })
      });
    },

    fileReader(file, cb) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (res) {
          cb && cb(res);
        };
      }
    },

    changeTimeSegment() {
      if (this.currentDate == this.oldDate) {
        var items = document.getElementsByClassName("item");
        for (var i = 0; i < items.length; i++) {
          items[i].setAttribute("data-color", "");
          items[i].setAttribute("data-value", "");
          items[i].style.background = "";
        }
      }
    },
    changeCurrentDate(date, oldDate) {
      this.initItem(date);
      this.oldDate = oldDate;
      this.currentDate = date;
    },
    initItem(date) {
      // .style.height = document.body.clientHeight;
      // if (date == '') {

      var weekOfday = this.$moment().format("E");
      var last_monday = this.$moment()
        .subtract(weekOfday, "days")
        .add(1, "days")
        .format("YYYY/MM/DD"); //周一日期
      var last_sunday = this.$moment()
        .add(7 - weekOfday, "days")
        .format("YYYY/MM/DD"); //周日日期
      this.currentDateRange = ref({ from: last_monday, to: last_sunday });
      this.currentDate = this.$moment().format("YYYY/MM/DD");
      this.oldDate = this.$moment().format("YYYY/MM/DD");
      // }
      var flag = false;
      const query = Bmob.Query("item");
      query.order("-updatedAt");
      query.equalTo("username", "==", this.username);
      query.equalTo("save_date", "==", { from: last_monday, to: last_sunday });
      query.find().then((res) => {
        console.log(res);
        var data = res[0];
        if (res.length == 0) {
          this.timeSegment = "1";
          var items = document.getElementsByClassName("item");
          for (var i = 0; i < items.length; i++) {
            items[i].setAttribute("data-color", "");
            items[i].setAttribute("data-value", "");
            items[i].style.background = "";
          }
          this.itemsArr = [
            {
              label: "吃饭",
              value: "#ff66ff-吃饭",
              color1: "#ff66ff",
            },
            { label: "睡觉", value: "#9999ff-睡觉", color1: "#9999ff" },
            { label: "玩游戏", value: "#ff9933-玩游戏", color1: "#ff9933" },
          ];
        } else {
          var itemList = data.item_list.replace("\\", " ").split("},");

          for (var j = 0; j < itemList.length; j++) {
            if (j != itemList.length - 1) {
              itemList[j] = itemList[j] + "}";
            }
            itemList[j] = JSON.parse(itemList[j]);
          }
          console.log("aaaa");
          console.log(itemList);
          console.log(itemList.length);
          this.timeSegment = data.time_segment;
          this.itemsArr = data.activities;
          this.itemList = itemList;
          this.currentObjectId = data.objectId;
          sessionStorage.currentObjectId = data.objectId;
          this.$nextTick(() => {
            document.getElementById("colMd10");
            for (var i = 0; i < itemList.length; i++) {
              document
                .getElementsByClassName(`item${i + 1}`)[0]
                .setAttribute("data-value", itemList[i].value);
              document
                .getElementsByClassName(`item${i + 1}`)[0]
                .setAttribute("data-color", itemList[i].color);
              document.getElementsByClassName(
                `item${i + 1}`
              )[0].style.background = itemList[i].color;
              flag = true;
            }
          });

          console.log(itemList);
        }

        //map() is a better choise

        // var obj = {
        //   itemList: itemList,
        //   username: data.username,
        //   timeSegment: data.time_segment,
        //   saveDate: data.save_date,
        //   objectId: data.objectId
        // }
      });
    },
    saveDate() {
      var arr = [];
      for (var i = 1; i <= (28 * 24) / this.timeSegment; i++) {
        var color = document.getElementsByClassName(`item${i}`)[0].attributes[
          "data-color"
        ].nodeValue;
        var value = document.getElementsByClassName(`item${i}`)[0].attributes[
          "data-value"
        ].nodeValue;
        var obj = {
          color: color,
          value: value,
        };
        arr.push(JSON.stringify(obj));
      }
      // if (this.currentObjectId != '' && this.currentDate==this.oldDate) {
      //   const delQuery = Bmob.Query('item');
      //   delQuery.destroy(this.currentObjectId).then(res => {
      //     console.log(res)
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // }
      const query = Bmob.Query("item");
      query.set("item_list", arr.toString());
      query.set("activities", this.itemsArr);
      query.set("save_date", this.currentDateRange);
      query.set("time_segment", this.timeSegment.toString());
      query.set("username", sessionStorage.getItem("username"));
      query
        .save()
        .then((res) => {
          console.log(res);
          this.$q.notify(`保存成功`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isUrgency(position, e) {
      this.urgency = !this.urgency;
      if (this.urgency) {
        document.getElementById(position).style.background = "#ffff00";
        document.getElementById(position).setAttribute("data-value", "Y");
        document.getElementById(position).setAttribute("data-color", "#ffff00");
      } else {
        document.getElementById(position).style.background = "white";
        document.getElementById(position).setAttribute("data-value", "N");
        document.getElementById(position).setAttribute("data-color", "white");
      }
    },
    isFinished(position, e) {
      this.urgency = !this.urgency;
      if (this.urgency) {
        document.getElementById(position).style.background = "#00f57b";
        document.getElementById(position).setAttribute("data-value", "Y");
        document.getElementById(position).setAttribute("data-color", "#00f57b");
      } else {
        document.getElementById(position).style.background = "white";
        document.getElementById(position).setAttribute("data-value", "N");
        document.getElementById(position).setAttribute("data-color", "white");
      }
    },
    addItem() {
      if (this.itemLabel == "") {
        this.$q.notify("请输入事件描述");
      }
      if (this.itemColor == "") {
        this.$q.notify("请选择颜色");
      }
      if (this.itemLabel != "" && this.itemColor != "") {
        // this.$q.notify(`${this.itemLabel}-${this.itemColor}`);
        var newItem = {
          label: this.itemLabel,
          value: `${this.itemColor}-${this.itemLabel}`,
          color1: this.itemColor,
        };
        this.itemsArr.push(newItem);
        this.itemLabel = "";
        this.itemColor = "";
        sessionStorage.itemsArr = JSON.stringify(this.itemsArr);
      }
    },
    selectItem(position, e) {
      this.$q
        .dialog({
          title: "Options",
          message: "Choose an option:",
          options: {
            type: "radio",
            model: "opt1",
            // inline: true
            items: this.itemsArr,
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          var color = data.split("-")[0];
          var value = data.split("-")[1];
          document.getElementById(position).style.background = color;
          document.getElementById(position).setAttribute("data-value", value);
          document.getElementById(position).setAttribute("data-color", color);
          // console.log('>>>> OK, received', data)
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    customBtn() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to turn on the wifi?",
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: "negative",
          },
          persistent: true,
        })
        .onOk(() => {
          // console.log('>>>> OK')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    positioned() {
      this.$q.dialog({
        title: "Positioned",
        message: "This dialog appears from bottom.",
        position: "bottom",
      });
    },

    stacked() {
      this.$q.dialog({
        title: "Stacked Buttons",
        stackButtons: true,
        cancel: true,
      });
    },

    autoClose() {
      let seconds = 3;

      const dialog = this.$q
        .dialog({
          title: "Alert",
          message: `Autoclosing in ${seconds} seconds.`,
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          clearTimeout(timer);
          // console.log('I am triggered on both OK and Cancel')
        });

      const timer = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          dialog.update({
            message: `Autoclosing in ${seconds} second${
              seconds > 1 ? "s" : ""
            }.`,
          });
        } else {
          clearInterval(timer);
          dialog.hide();
        }
      }, 1000);
    },
  },
};
</script>
<style>
.content {
  z-index: 1;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.content:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.content::after {
  background-image: url(../assets/image/bg.jpg) !important;
  /* background: linear-gradient(to bottom, #5583EE 0%,#41D8DD 100%); */
  background-position: center top !important;
  background-size: 100% 100% !important;
  background-attachment: fixed !important;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
  transform: scale(2);
  z-index: -1;
}

.outContent {
  height: 35px;
  overflow: hidden;
}
</style>
