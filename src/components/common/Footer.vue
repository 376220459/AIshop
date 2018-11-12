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
                    icon: 'iconfont icon-home',
                    name: '首页',
                    path: '/home',
                    style: 'color: #00BFFF;transform: scale(0.9)'
                },
                {
                    icon: 'iconfont icon-favor',
                    name: '关注',
                    path: '/follow',
                    style: ''
                },
                {
                    icon: 'iconfont icon-cart',
                    name: '购物车',
                    path: '/cart',
                    style: ''
                },
                {
                    icon: 'iconfont icon-my_light',
                    name: '我的',
                    path: '/person',
                    style: ''
                },
            ]
        }
    },
    methods: {
        navClick(index){
            this.navItems.forEach((item)=>{
                item.style = ''
            });
            this.navItems[index].style = 'color: #00BFFF;transform: scale(0.9)';
            this.$router.push({
                path: this.navItems[index].path
            });
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
                user-select: none;
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

