<template>
  <footer  @click="shoppingcalculate()"
  :class="{shoppingcartloaded:count,shoppingcartmove:shoppingcartmove}">
    <dot v-if="count" :count='count'></dot>
    <div class="shoppingcart"></div>
    <div class="totalMoney">
        <span>￥</span>
    </div>
    <div class="caculate">
        <p>去结算</p>
    </div>
  </footer>
</template>
<script>
import dot from './dot'
export default {
  props: {
    count: {
      default: 0
    },
    shoppingcartmove: {
      default: 0
    },
    // 默认不出现在点击之后被触发
    shoppingmask: {
      default: false
    }
  },
  components: {
    dot
  }
}
</script>
<style lang="css" scoped>
.totalMoney {
  width: 40%;
  font-size: 1rem;
  color: #fff;
}
.caculate {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  width: 8rem;
  color: #fff;
  background: #666;
}
.shoppingcart {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  left: 1rem;
  bottom: 1rem;
  border-radius: 50%;
  border: .3rem solid #4d4d4d;
  background-size: 2rem;
  background-color: #464646;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('./images/shopping.svg');
}

.shoppingcartloaded {
  background-color: #3b95e9;
  background-image: url('./images/shoppinglight.svg');
}

.shoppingcartmove {
  animation: shoppingcartmove 1s;
}

@keyframes shoppingcartmove {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}
</style>
