<template>
    <div class="footer-whole">
        <ul>
            <li @click="navClick(index)" v-for="(item, index) in navItems" :key="index" :style="item.style">
                <i :class="item.icon"></i>
                <p>{{ item.name }}</p>
            </li>
        </ul>
    </div>    
</template>

<script>
import store from '@/vuex/store'
export default {
    store,
    name: 'Footer',
    data(){
        return{
            navItems: [
                {
                    icon: 'iconfont icon-home',
                    name: '首页',
                    path: '/home',
                },
                {
                    icon: 'iconfont icon-favor',
                    name: '关注',
                    path: '/follow',
                },
                {
                    icon: 'iconfont icon-cart',
                    name: '购物车',
                    path: '/cart',
                },
                {
                    icon: 'iconfont icon-my_light',
                    name: '我的',
                    path: '/person',
                },
            ]
        }
    },
    methods: {
        navClick(index){
            if(index!=0 && !this.$store.state.id){
                this.$toast({
                    message: '您好像还没有登陆哦~',
                    duration: 2000
                });
                this.$router.push({path:'/login'});
            }else{
                this.$router.push({
                    path: this.navItems[index].path
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .footer-whole{
        height: 100%;
        ul{
            height: 100%;
            display: grid;
            grid-template: 1fr / 1fr 1fr 1fr 1fr;
            li{
                list-style: none;
                box-sizing: border-box;
                i{
                    font-size: 2em;
                }
                p{
                    font-size: 1.5em;
                    margin-top: 5px;
                }
            }
        }
    }
</style>

