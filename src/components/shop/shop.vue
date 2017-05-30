<template>
  <div id="restaurantdetails" ref="page">
    <header ref="paintHeader">
      <p class="to-resdetails" @click="$router.go(-1)"></p>
      <div class="header-main">
        <img :src="Tool.computedResImage(shopInfo.image_path)">
        <div class="food-about">
          <h6 class="food-title">{{ shopInfo.name }}</h6>
          <p class="note">
            <span v-if="shopInfo.delivery_mode">
                  {{ shopInfo.delivery_mode.text }}/</span>
            <span>{{ shopInfo.order_lead_time }}分钟送达/</span>
            <span v-if="shopInfo.piecewise_agent_fee">
                  {{ shopInfo.piecewise_agent_fee.description }}</span>
          </p>
          <p class="comment">{{shopInfo.promotion_info}}</p>
          <span class="toright"></span>
        </div>
      </div>
      <p v-if="shopInfo.activities" class="is-new">
        <span class="new" 
              v-if="shopInfo.activities[0]">
              {{ shopInfo.activities[0].icon_name }}</span>
        <span class="newdeal">{{ shopInfo.activities[0].description }}</span>
        <span class="acti">{{ shopInfo.activities.length }}个活动</span>
      </p> 
    </header>
    <main>
      <div class="main-header">
        <h5 @click="isOnshop(true)"
            :class="{goodsjudgelight:onshop}"
            class="goods"><span>商品</span></h5>
        <h5 @click="isOnshop(false)"
            :class="{goodsjudgelight:!onshop}"
            class="judge"><span>评价</span></h5>
      </div>
      <div v-if="onshop" class="main-body-if">
        <div class="main-side"
             ref="mainSide">
          <div @click="selectMenu(foods, index, $event)"
               v-for="(foods,index) in menu"
               :class="{maintitlelight:active === index}"
               class="main-title">
            <dot v-if="foods.click_count"
                 :count="foods.click_count">
            </dot>
            <img v-show="foods.icon_url"
              :src="Tool.computedResImage(foods.icon_url, 'foods')"></img>
            <h4>{{ foods.name }}</h4>
          </div>
        </div>
        <div class="main-food"
             ref="mainFood">
          <div ref="foodList"
               v-for="(foods,parentIndex) in menu"
               class="main-food-template">
            <h4 class="main-food-band">{{ foods.name }}</h4>
            <div v-for="(food,childIndex) in foods.foods"
                 class="main-food-container">
              <img :src="Tool.computedResImage(food.image_path,'tumbnails')">
              <div class="innerfood">
                <h4 class="main-food-title ellipsis">{{food.name}}</h4>
                <span class="main-describe ellipsis">{{ food.description }}</span>
                <br>
                <span class="main-judges ellipsis">{{ food.tips }}</span>
                <div class="money-about">
                  <span class="single-price">
                    <span class="rmb">￥</span>{{ food.specfoods[0].price }}</span>
                  <cartbuttons
                      ref="targetBall">
                  </cartbuttons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
      <shoppingcart
          :count="menu.click_count">
      </shoppingcart>
  </div>
</template>
<script>
import axios from 'axios'
import dot from './dot'
import cartbuttons from './cartbuttons'
import Tool from './js/Tool'
import shoppingcart from './shopping-cart'
export default {
  data: function () {
    return {
      shopInfo: {},
      menu: {},
      // 是否位于商店页面
      onshop: true,
      // 菜单详细列表的累加高度表
      initHeight: [],
      // 引入工具包
      Tool: Tool,
      // 选项卡片
      active: 0,
      // 默认id
      defaultId: 610592
    }
  },
  components: {
    dot,
    cartbuttons,
    Tool,
    shoppingcart
  },
  mounted: function () {
    this.getId(window.location.hash)
    this.init()
    this.getTitle()
  },
  methods: {
    getTitle: function () {
      let that = this
      setTimeout(function () {
        document.title = that.shopInfo.name || '饿了哟网上订餐'
      }, 1000)
    },
    getId: function (hash) {
      this.defaultId = hash.match(/\d/gi).join('')
    },
    // 该函数记录初始滚动事件时所需要的参数
    // 对菜单详细列表里面的每一个系列求出高度 等待左侧滚动时触发
    _initScroll: function () {
      let foodList = this.$refs.foodList
      let length = this.menu.length
      let tempHeight = 0
      this.initHeight.push(0)
      for (let i = 1; i < length; i++) {
        tempHeight += foodList[i - 1].clientHeight
        this.initHeight.push(tempHeight)
      }
      this.initHeight.push(foodList)
    },
    // 对于每个商家的商品左侧列表点击之后右侧会跳转到当前所点击的title
    selectMenu: function (foods, index, event) {
      this.active = index
      // 防止重复执行 _initScroll
      if (!this.initHeight.length) {
        this._initScroll()
      }
      let mainFood = this.$refs.mainFood
      let that = this
      mainFood.scrollTop = that.initHeight[index]
    },
    // 在商品和评价之间切换
    isOnshop: function (bool) {
      this.onshop = bool
    },
    init: function () {
      let that = this
      // 店铺的主要信息
      let headUrl = '/shopping/restaurant/' + this.defaultId + '?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=40.0876854&longitude=116.3369247'
      axios.get(headUrl).then(function (response) {
        that.shopInfo = response.data
      })
      // 该店面下的具体食物品类
      let foodUrl = '/shopping/v2/menu?restaurant_id=' + this.defaultId
      axios.get(foodUrl).then(function (response) {
        that.menu = response.data
      })
    }
  }
}
</script>
<style lang="css" scoped>
@media all and (max-width: 768px) {
  html {
    font-size: 12px;
  }
}

@media all and (min-width: 769px) {
  html {
    font-size: 16px;
  }
}

#restaurantdetails {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  min-height: 600px;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: .2rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #a6a0a4;
}

.to-resdetails {
  display: block;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-position: left;
  background-size: 1.5rem;
  background-image: url('./images/arrow.svg');
}

.header-main {
  display: flex;
  padding: .5rem;
  justify-content: space-between;
}

.header-main>img {
  width: 4rem;
  height: 4rem;
  border-radius: .2rem;
}

.food-about {
  flex: 1;
  position: relative;
  padding-left: .5rem;
  color: #fff;
}

.food-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.note,
.comment {
  width: 15rem;
  font-size: .6rem;
  padding: .2rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.toright {
  display: block;
  right: 0;
  top: 50%;
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: right;
  background-image: url('./images/arrow-right.svg');
}

.is-new {
  display: flex;
  justify-content: space-between;
  padding-left: .5rem;
  color: #fff;
  font-size: 1rem;
}

.newdeal {
  font-size: .4rem;
  flex: 1;
}

.acti {
  font-size: .4rem;
  padding-right: .5rem;
}

.new {
  border: 1px solid #70BC46;
  font-size: .4rem;
  background-color: #70BC46;
  margin-right: 0.2rem;
}

main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-header {
  background-color: #fff;
  display: flex;
}

.goods,
.judge {
  flex: 1;
  text-align: center;
  color: #999;
  font-size: 1rem;
  font-weight: 500;
  padding: .5rem 0;
}
.goodsjudgelight{
  color: #3190e8;
}
.goodsjudgelight>span{
  border-bottom: 1px solid #3190e8;
}

.main-body-if {
  position: relative;
  display: flex;
  width: inherit;
  flex: 1;
}

.main-side {
  position: relative;
  flex: 2;
  max-width: 10rem;
  overflow-y: scroll;
  border-left: 1px solid #ede9e9;
  border-bottom: 1px solid #f0e7e7;
}

.main-title {
  position: relative;
  border-left: 3px solid transparent;
  background-color: #f8f8f8;
}
.main-title > img{
  margin-left: .2rem;
  width: .8rem;
  height: .8rem;
  display: inline-block;
}
.main-title > h4 {
  display: inline-block;
  text-align: left;
  color: #333;
  padding: 1rem 0 1rem .2rem;
  font-weight: 300;
  font-size: .6rem;
}

.maintitlelight {
  border-left: 3px solid #3190e8;
  background-color: #fff;
  transition: all 1s;
}

.maintitlelight>h4 {
  font-weight: 700;
}


.main-food {
  flex: 7;
  overflow-y: scroll;
  background-color: #f1f1f1;
}

.main-food-template {
  transition: all 1s;
}

.main-food-band {
  color: #777;
  font-weight: 800;
  font-size: .9rem;
  padding: .3rem;
}

.main-food-container {
  display: flex;
  padding: .2rem;
  padding-bottom: 1rem;
  margin-bottom: 1px;
  background-color: #fff;
}

.main-food-container>img {
  width: 3rem;
  height: 3rem;
  border-radius: .2rem;
}

.innerfood {
  width: 80%;
  padding-left: 1rem;
}

.ellipsis {
  display: block;
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.main-food-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 800;
  color: #333;
  font-size: 1rem;
}
.main-describe{
  color: #999;
  font-size: .5rem;
}
.main-judges{
  color: #666;
  font-size: .6rem;
}
.money-about {
  display: flex;
  position: relative;
  justify-content: space-between;
}

.single-price {
  color: #f60;
  font-weight: 600;
  font-size: 1rem;
}
.rmb{
  font-size: .5rem;
}
footer {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: #464648;
}

.caculatelight {
  background: #55da6b;
}

.main-body-else {
  position: relative;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
}

.judge-numb {
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  background-color: #fff;
}

.numb-left {
  display: flex;
  padding: 1rem .5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 4;
}

.overall_score {
  font-size: 1.5rem;
  color: #f60;
}
.numb-right {
  flex: 7;
  color: #666;
  font-size: .8rem;
  padding: 1.2rem .5rem;
}

time,
.compare_rating {
  color: #888;
  font-size: .5rem;
}

.judge-details {
  width: 100%;
  background-color: #fff;
}

.tags {
  width: 90%;
  padding-bottom: .5rem;
  margin-bottom: 1rem;
}

.tag {
  margin-top: .5rem;
  margin-left: .5rem;
  padding: .3rem;
  font-size: .8rem;
  color: #666;
  display: inline-block;
  background-color: #ebf5ff;
  border-radius: .5rem;
}
.tagclicked{
  background-color: #3190e8;
  color: #fff;
}
.untag{
  background-color: #f5f5f5;
}

.ratings {
  width: 100%;
}

.rating {
  display: flex;
  margin-bottom: 1px;
  padding: .5rem;
  width: 100%;
  background-color: #fff;
}

.avatar {
  display: flex;
}

.anonymous {
  flex: 4;
  padding-left: .5rem;
}

.anonymous>p {
  color: #666;
  font-size: .8rem;
}

.ratingtime {
  color: #666;
  font-size: .5rem;
  text-align: right;
  flex: 2;
}
/*点击购物车出现的mask*/
.shoppingmask{
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #333;
  opacity: .5;
  transition: all .3s ease;
}
.shoppinglist{
  position: absolute;
  background-color: #fff;
  left: 0;
  bottom: -20rem;
  width: 100%;
  max-height: 20rem;
  transition: all .6s ease;
}
.shoppinglistappear{
  bottom: 3rem;
  transition: all .2s ease;
}
</style>
