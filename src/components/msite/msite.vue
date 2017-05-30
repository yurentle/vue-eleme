<template>
    <div id="msite">
        <header>
            <div class="location"> 
                <i class="material-icons">place</i>
				<span class="locationName">{{ geoName.formatted_address }}</span>
            </div>
            <div class="searchBox">
                <input type="search" name="searchBox" placeholder="搜索商家 商品"> </div>
            <div class="hot">
                <ul>
                    <li v-for="item in hot">
                        <a href="#">{{ item.word }}</a>
                    </li>
                </ul>
            </div>
        </header>
        <main>
            <themes :themes="themes"></themes>
            <restaurants :restaurants="restaurants"></restaurants>
        </main>
        <div class="backTop">
            <a href="#"><i class="material-icons">publish</i></a>
        </div>
        <div v-if="!received">
            <loading></loading>
        </div>
        <mainfooter></mainfooter>
    </div>
</template>
<script>
/*eslint-disable */

import axios from 'axios'
import Geohash from 'latlon-geohash'
import loading from '../common/loading/loading'
import mainfooter from '../common/mainfooter/mainfooter.vue'
import themes from '../common/themes/themes.vue'
import restaurants from '../common/restaurants/restaurants.vue'
export default {
    data() {
        return {
            received: false,
            hot: [],
            GEO: {
                latitude: '',
                longitude: ''
            },
            geoName: {
            	'formatted_address': ''
            },
            ak: 'IY1EUbRdisrNv1gr79QBderTndkv0MaD',
            themes: [],
            geohash: '',
            restaurants: [],
            count: 0
        }
    },
    components: {
        mainfooter,
        Geohash,
        themes,
        restaurants,
        loading
    },
    mounted () {
        let _this = this
    	this.getLocation()
        setInterval(function(){
            _this.loadMore()
        },2000)
    },
    methods: {
        getLocation() {
            if (navigator.geolocation) {
                 let options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
                navigator.geolocation.getCurrentPosition(this.success, this.error, options)
            }else{
                alert('你的浏览器不支持获取地址功能')
            }
        },
        init(){
            let _this = this
            let url = '/geocoder/v2/?location=' + this.GEO.latitude + ',' + this.GEO.longitude + '&output=json&pois=1&ak=' + this.ak
            axios.get(url).then(function(response) {
            	_this.geoName = response.data.result
            })
            this.hotsearch()
            this.getThemes()
            this.getRestaurants()
            this.received = true
        },
        success(position) {
            console.log(789)
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            this.geohash = Geohash.encode(lat, lng) 
            this.GEO.latitude = lat
            this.GEO.longitude = lng
            this.init()
        },
        error() {
             this.GEO.latitude = 39.98537
             this.GEO.longitude = 116.316798
             this.geohash = Geohash.encode(this.GEO.latitude, this.GEO.longitude) 
             this.init()
             alert('获取地址失败，已显示默认地址')
        },
        hotsearch () {
        	let _this = this
        	let url = `/shopping/v3/hot_search_words?latitude=${this.GEO.latitude}&longitude=${this.GEO.longitude}`
        	axios.get(url).then(function(response){
        		_this.hot = response.data
        	})
        },
        getThemes () {
            let _this = this
            let themeUrl = `/v2/index_entry?geohash=${this.geohash}&group_type=1&flags[]=F`
            axios.get(themeUrl).then(function (response) {
                _this.themes = response.data
            })
            axios.get(`/v2/pois/${this.geohash}`).then(function (response) {
                // console.log(response)
            })
        },
        getRestaurants () {
            let _this = this
            let restaurantsUrl = `/shopping/restaurants?latitude=${this.GEO.latitude}&longitude=${this.GEO.longitude}&offset=${this.count*30}&limit=29&extras[]=activities&terminal=h5`
            axios.get(restaurantsUrl).then(function(response){
                _this.restaurants = _this.restaurants.concat(response.data)
            })
        },
        loadMore () {
            let differ = this.$el.offsetHeight - window.scrollY
            if (Math.abs(Math.floor(differ) - window.innerHeight) < 50) {
                console.log('aha')
                this.count++
                this.getRestaurants()
            }
        },
    }
}
</script>
<style scoped>
#msite {
    width: 100%;
}

header {
    background-color: #0096ff;
}

.location {
    padding: .8rem .5rem;
    justify-content: space-between;
}

.location>.material-icons {
  font-size: 1.2rem;
  color: #fff;
}

.locationName {
  font-size: 1.2rem;
  color: #fff;
  font-family: 'MicroSoft Yahei';
  max-width: 60%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.searchBox {
  margin: 0 auto;
  width: 90%;
  height: 2.4rem;
}

.searchBox>input[type="search"] {
  color: #222;
  width: 100%;
  font-size: .8rem;
  height: inherit;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  text-align: center;
  background: #fff;
}

input::-webkit-search-cancel-button {
  display: none;
}

.hot {
  width: 100%;
  overflow-x: scroll;
}

.hot>ul {
  width: 140%;
  padding: .5rem 0;
  overflow-x: scroll;
  justify-content: space-around;
  display: flex;
}

.hot>ul>li {
  color: #fff;
  list-style-type: none;
  padding: 5px;
}

.hot a {
  font-size: .7rem;
  text-decoration: none;
  color: #fff;
}

main {
  position: relative;
  width: 100%;
}

.backTop{
  position: fixed;
  right: 1rem;
  bottom: 4rem;
  width: 3rem;
  height: 3rem;
  line-height: 4rem;
  text-align: center;
  color: #999;
  border: 1px solid #999;
  border-radius: 50%;
  background: #fff;
  transition: opacity .3s;

}
.backTop>a{
    color: #999;
}
.backTop>i{
    font-size: 2rem;
}
</style>
