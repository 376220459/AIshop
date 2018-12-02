<template>
    <div class="follow-whole">
        <div class="follow-content">
            <header>
                <h2>店铺动态</h2>
            </header>

            <div class="content">
                <div class="dynamic" v-for="(item, index) in storage" :key="index">
                    <div class="title">
                        <img width="15%" height="100%" :src="item.img" alt="shop">
                        <div>
                            <p>
                                <span>{{ item.name }}</span>
                                <span class="label">{{ item.label }}</span>
                            </p>
                            <span class="fans">{{ changeCount(item.fans) }}粉丝</span>
                        </div>
                    </div>

                    <p class="text"><span>{{ item.title }}</span>{{ item.content }}</p>

                    <div class="img">
                        <img v-for="(item2, index2) in item.goods" width="32%" height="100%;" :key="index2" :src="item2" alt="goods">
                    </div>
                    
                    <div class="footer">
                        <span class="read">{{ changeCount(item.read) }}人阅读</span>
                        <span class="praise" :style="{color:praiseColor(index)}" @click="changePraise(index)">
                            <i class="iconfont icon-buoumaotubiao18"></i>
                            <span>{{ changeCount(item.praise) }}</span>
                        </span>
                    </div>
                </div>

                <div @click="loadMore" class="loading">点击加载更多...</div>
            </div>
        </div>
        <Footer class="footer"></Footer>
    </div>
</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Follow',
    components: {
        Footer: Footer
    },
    data(){
        return{
            storage: [],
            list: [
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                },
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                },
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                },
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                },
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                },
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                },
                {
                    img: 'static/follow/shop1.jpg',
                    name: '特步官方旗舰店',
                    label: '品牌官方店',
                    fans: 11220000,
                    title: '#11月超级上新日#',
                    content: '11月重磅潮鞋来袭，除了万众期待的AJ11康扣提前上架预售，还有多款精品让人看了就想买！',
                    read: 42000,
                    praise: 99,
                    ispraise: true,
                    goods:['static/follow/goods1.jpg','static/follow/goods2.jpg','static/follow/goods3.jpg','static/follow/goods4.jpg','static/follow/goods5.jpg','static/follow/goods6.jpg','static/follow/goods7.jpg','static/follow/goods8.jpg','static/follow/goods9.jpg']
                }
            ]
        }
    },
    methods: {
        praiseColor(index){
            return this.list[index].ispraise ? '#FF6600' : '#999';
        },
        changePraise(index){
            if(this.list[index].ispraise){
                this.list[index].ispraise = false;
                this.list[index].praise--;
                this.$toast({
                    message: '点赞取消',
                    duration: 1000
                });
            }else{
                this.list[index].ispraise = true;
                this.list[index].praise++;
                this.$toast({
                    message: '点赞成功',
                    duration: 1000
                });
            }
        },
        loadMore(){
            this.$loading.open({
                text: '正在加载',
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                let last = this.storage.length-1;
                this.$loading.close();
                if(this.storage.length == this.list.length){
                    this.$toast({
                        message: '到底啦，等会再来吧~',
                        duration: 1000
                    })
                }else if(this.list.length-this.storage.length>=3){
                    for (let i = 1; i <= 3; i++) {
                        this.storage.push(this.list[i+last]);
                    }
                }else{
                    for (let i = this.storage.length; i <= this.list.length-1; i++) {
                        this.storage.push(this.list[i]);
                    }
                }
            }, 500);
        },
        changeCount(count){
            if(count >= 10000){
                return (count/10000).toFixed(1) + 'w';
            }else{
                return count;
            }
        }
    },
    created(){
        for (let i = 0;i < 3;i++){
            this.storage.push(this.list[i]);
        }
    }
}
</script>

<style lang="scss">
    .follow-whole{
        height: 100%;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        background: #F0F0F0;
        .footer{
            ul{
                li:nth-child(2){
                    color: #FF6600;
                    transform: scale(0.9)
                }
            }
        }
        .follow-content{
            overflow: auto;
            header{
                height: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                background: #FF9966;
                h2{
                    color: white;
                }
            }
            .content{
                height: 90%;
                overflow: auto;
                padding: 10px;
                .dynamic{
                    background: white;
                    border-radius: 10px;
                    padding: 5px;
                    margin-bottom: 10px;
                    .title{
                        display: flex;
                        justify-content: flex-start;
                        margin-bottom: 10px;
                        img{
                            border-radius: 50%;
                            margin-right: 5px;
                        }
                        div{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: flex-start;
                            padding: 8px 0;
                            .label{
                                background: #FFE4E1;
                                color: #DC143C;
                                padding: 3px 5px;
                                border-radius: 15px;
                                font-size: 8px;
                            }
                            .fans{
                                font-size: 10px;
                                color: #999;
                            }
                        }
                    }
                    .text{
                        font-size: 15px;
                        text-align: left;
                        span:nth-child(1){
                            color: #1E90FF;
                            font-weight: bold;
                        }
                    }
                    .img{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        img{
                            border-radius: 3px;
                            margin-top: 5px;
                        }
                    }
                    .footer{
                        display: flex;
                        justify-content: space-between;
                        margin: 20px 0 10px 0;
                        padding: 0 10px;
                        // color: #999;
                        .read{
                            color: #999;
                        }
                        .praise{
                            i{
                                font-size: 15px;
                                font-weight: bold;
                                margin-right: 5px;
                            }
                            span{
                                font-size: 15px;
                            }
                        }
                    }
                    .loading{
                        background:#E0E0E0;
                        width:100%;
                        height:50px;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
                }
            }
        }
    }
</style>