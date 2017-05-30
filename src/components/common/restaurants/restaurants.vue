<template>
  <div class="restaurants">
    <h5 class="recommend">推荐商家</h5>
    <router-link 
    v-for="restaurant in restaurants" 
    class="restaurant"
    tag="div"
    :to="routerTo(restaurant.name, restaurant.id)"
    :key="restaurant.id">
      <div v-show="restaurant.is_new"
            class="res-is-new">
        <span class="is-new-band">新店</span>
      </div>
      <img :src="computedResImage(restaurant.image_path)"
            :alt="restaurant.name" />
      <div class="res-details ">
        <h6 v-cloak
            class="res-title ellipsis">{{ restaurant.name }}</h6>
        <div class="rating">
          <el-rate
          disabled
          show-text
          text-color="#ff6600"
          text-template="{value}"
          v-model="restaurant.rating">
          </el-rate>
        </div>
        <p class="ellipsis">
          <span v-cloak
                class="deal">月售 {{ restaurant.recent_order_num }} 单</span>
        </p>
        <p class="ellipsis">
          <span v-cloak
                class="deal">￥{{ restaurant.float_minimum_order_amount }}起送</span>
          <span v-cloak
                class="deal">配送费¥{{ restaurant.float_delivery_fee }}</span>
          <span v-cloak
                class="deal">{{ restaurant.average_cost }}</span>
        </p>
      </div>
      <div class="express">
        <p class="ellipsis">
          <span v-cloak
                class="support"
                v-show="restaurant.supports"
                v-for="support in restaurant.supports">{{ support.icon_name }}</span>
        </p>
        <p class="ellipsis">
          <span v-if="restaurant.delivery_mode"
                class="delivery_mode_solid">准时达</span>
          <span v-cloak
                v-if="restaurant.delivery_mode"
                class="delivery_mode">{{ restaurant.delivery_mode.text }}</span>
        </p>
        <p class="exp-dis-time">
          <span v-cloak
                class="exp-dis">{{ getDistance(restaurant.distance) }} / </span>
          <span v-cloak
                class="exp-time">{{ restaurant.order_lead_time }}分钟</span>
        </p>
      </div>
    </router-link> 
  </div>
</template>
<script>

/*eslint-disable */
export default {
  data: function () {
    return {
      Tool: ''
    }
  },
  props: {
    restaurants: {
      default: function () {
        return []
      }
    },
    // 默认存储地理位置
    currentGeoObj: {
      default: function () {
        return {
          latitude: '31.23037',
          longitude: '121.473701'
        }
      }
    }
  },
  methods: {
    getCurrentId: function (str) {
      console.log(str)
    },
    routerTo: function (name, id) {
      return '/shop/#id=' + id
    },
    getDistance: function (num) {
      return num < 1000 ? num + 'm' : (num / 1000).toFixed(2) + 'Km'
    },
    computedResImage: function (string, tail) {
        if (!string) { return }
        let length = string.length
        let char = string[length - 2]
        let temp
        switch (char) {
            case 'n':
                temp = '.png'
                break
            case 'e':
                temp = '.jpeg'
                break
            case 'i':
                temp = '.gif'
                break
            default:
                return
        }
        if (tail === 'foods') {
            return 'https://fuss10.elemecdn.com/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp
        }
            return 'https://fuss10.elemecdn.com/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp + '?imageMogr/format/webp/'
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.restaurants {
  position: relative;
  width: 100%;
  background-color: #fff;
}

.recommend{
  font-weight: 600;
  font-size: 1rem;
  padding-left: .5rem;
  color: #333;
}

.restaurant {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: inherit;
}

.res-is-new {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0;
  left: 0;
  background-image: linear-gradient(135deg, #26ce61, #26ce61 50%, transparent 0);
}

.is-new-band {
  display: block;
  font-size: .5rem;
  font-weight: 500;
  color: #fff;
  transform: rotate(-45deg);
}

.restaurant>img {
  width: 4rem;
  height: 4rem;
  margin: .5rem;
}

.res-details {
  width: 45%;
  text-align: left;
  padding-top: .5rem;
}

.res-title {
  font-weight: 600;
  font-size: 1rem;
  color: #444;
  text-overflow: ellipsis;
  overflow: hidden;
}

.rating-num {
  color: #ff6600;
  font-size: .7rem;
}

.deal {
  color: #444;
  font-size: .7rem;
}

.express {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 35%;
  padding: .5rem;
  text-align: right;
}

.ellipsis {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.support {
  display: inline-block;
  color: #666;
  margin: 0 2px;
  padding: 0 2px;
  font-weight: 100;
  font-size: .5rem;
  border: 1px solid #999;
}

.delivery_mode,
.delivery_mode_solid {
  display: inline-block;
  font-weight: 100;
  font-size: .5rem;
  padding: .1rem;
  border-radius: .1rem;
}

.delivery_mode {
  color: #fff;
  background-color: #2395ff;
}

.delivery_mode_solid {
  color: #2395ff;
  border: 1px solid #2395ff;
  background-color: #fff;
}

.exp-dis {
  color: #666;
  font-size: .7rem;
}

.exp-time {
  color: #2395FF;
  font-size: .8rem;
}

</style>
