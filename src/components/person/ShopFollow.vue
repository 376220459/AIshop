<template>
    <div class="shop-follow-whole" :style="{right:wholeRight+'%'}">
        <header>
            <i class="iconfont icon-fanhui1" @click="goBack"></i>
            <p>我的关注({{ allFollowCount }})</p>
        </header>
        <div class="follow-content">
            <ul>
                <li v-for="(item, index) in follow" :key="index" @click="goShop">
                    <div class="shop-inf">
                        <img :src="item.img" alt="shop" width="20%" height="100%">
                        <p class="name">{{ item.name }}</p>
                        <span class="label">{{ item.label }}</span>
                    </div>
                    <p class="follow-inf">
                        <span>{{ item.followCount }}</span>
                        <span>关注</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'ShopFollow',
    data(){
        return{
            wholeRight: 0,
            follow: [
                {
                    name: '特步官方旗舰店',
                    img: 'static/person/shop/shop1.jpg',
                    label: '天猫',
                    followCount: 132041
                },
                {
                    name: 'adidas官方旗舰店',
                    img: 'static/person/shop/shop2.png',
                    label: '天猫',
                    followCount: 214000
                },
                {
                    name: '361°官方旗舰店',
                    img: 'static/person/shop/shop3.jpg',
                    label: '天猫',
                    followCount: 180000
                },
            ]
        }
    },
    computed: {
        allFollowCount(){
            return this.follow.length;
        }
    },
    methods: {
        leftMove(){
            this.wholeRight += 10;
            setTimeout(() => {
                this.leftMove();
            },10);
        },
        rightMove(){
            this.wholeRight -= 10;
            setTimeout(() => {
                this.rightMove();
            },10);
        },
        goBack(){
            this.rightMove();
            setTimeout(() => {
                history.back(); 
            }, 200);
        },
        goShop(){
            this.leftMove();
            setTimeout(() => {
                this.$router.push({path: '/shop'})
            }, 200);
        }
    }
}
</script>

<style lang="scss" scoped>
    .shop-follow-whole{
        height: 100%;
        background: #F0F0F0;
        position: relative;
        header{
            height: 10%;
            background: #FF9966;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            i{
                font-size: 30px;
                position: absolute;
                left: 15px;
                color: gray;
            }
        }
        .follow-content{
            height: 90%;
            overflow: auto;
            padding: 5px;
            ul{
                background: white;
                border-radius: 15px;
                padding: 5px;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 35px 0;
                    .shop-inf{
                        width: 80%;
                        display: flex;
                        align-items: center;
                        img{
                            border-radius: 50%;
                        }
                        .name{
                            margin: 0 5px;
                            font-size: 15px;
                        }
                        .label{
                            border: 1px solid red;
                            border-radius: 5px;
                            color: red;
                            font-size: 8px;
                            font-weight: bold;
                            padding: 1px 2px;
                        }
                    }
                    .follow-inf{
                        width: 20%;
                        display: flex;
                        flex-direction: column;
                        // align-items: flex-end;
                        color: #999;
                    }
                }
            }
        }
    }
</style>

