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
export default {
    name: 'Footer',
    data(){
        return{
            navItems: [
                {
                    icon: 'iconfont icon-shouye1',
                    name: '首页',
                    path: '/home',
                },
                {
                    icon: 'iconfont icon-Collection',
                    name: '关注',
                    path: '/follow',
                },
                {
                    icon: 'iconfont icon-gouwuche',
                    name: '购物车',
                    path: '/cart',
                },
                {
                    icon: 'iconfont icon-wode',
                    name: '我的',
                    path: '/person',
                },
            ]
        }
    },
    methods: {
        navClick(index){
            if(window.localStorage){
                var storage = window.localStorage;
            }
            // console.log(storage.getItem('id'));
            if(index!=0 && !storage.id){
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
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            box-sizing: border-box;
            border-top: 1px solid white;
            li{
                box-sizing: border-box;
                color: #999;
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

