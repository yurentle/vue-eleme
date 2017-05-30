<template>
  <div class="finaltheme">
    <div class="theme-title">
      <router-link to="/" tag="h3"><span class="return"><i class="material-icons">&#xE314;</i></span>{{ title }}</router-link>
    </div>
    <restaurants :restaurants="restaurants">
    </restaurants>
  </div>
</template>
<script>
import axios from 'axios'
import restaurants from '../restaurants/restaurants'
export default {
  data: function () {
    return {
      restaurants: '',
      title: ''
    }
  },
  components: {
    restaurants
  },
  mounted () {
    this.getTitle()
    this.init()
  },
  methods: {
    getTitle: function () {
      let titleOri = window.location.hash.match(/\[.+\]/gi)[0]
      this.title = titleOri.replace(/(\[|\])/gi, '')
    },
    init: function () {
      let that = this
      let resUrl = `/shopping/restaurants?latitude=31.23037&longitude=121.473701&keyword=&offset=0&limit=20&extras[]=activities&restaurant_category_ids[]=207`
      axios.get(resUrl).then(function (res) {
        that.restaurants = res.data
      })
      let themeSortUrl = `/shopping/v2/restaurant/category?latitude=31.23037&longitude=121.473701`
      axios.get(themeSortUrl).then(function (res) {
        that.itemSort = res.data
      })
    }
  }
}
</script>
<style lang="css" scoped>
.theme-title {
  background-position: left;
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-color: #0096ff;
}

.theme-title>h3 {
  color: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 1.4rem;
  padding: .5rem 0;
}

.return{
  position: absolute;
  left: 0;
}
</style>
