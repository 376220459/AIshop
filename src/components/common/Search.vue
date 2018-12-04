<template>
    <div class="search-whole" :style="{right:wholeRight+'%',height: appHeight+'px'}">
        <div class="search">
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <input autofocus="autofocus" id="inp" type="text" placeholder="输入要搜索的宝贝或店铺" v-model="searchContent">
            <button @click="search">搜索</button>
        </div>

        <div class="nav">
            <ul>
                <li :style="navStyle[0]" @click="changeNav('whole')">全部</li>
                <!-- <li :style="navStyle[1]" @click="changeNav('goods')">商品</li> -->
                <li :style="navStyle[1]" @click="changeNav('shop')">店铺</li>
            </ul>
        </div>

        <div class="history">
            <div>
                <span>历史搜索</span>
                <i class="iconfont icon-remove-1-copy" @click="deleteAll"></i>
            </div>
            <ul>
                <li v-for="(item, index) in history" :key="index" @touchstart="touchstart(index)" @touchmove="touchmove" @touchend="touchend(item)">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data(){
        return{
            timeOutEvent: 0,
            appHeight: document.body.clientHeight,
            wholeRight: 0,
            nav: 'whole',
            history: ['拖鞋棉冬室内男 男士 包跟 冬季','秋裤','毛衣','羽绒服','IphoneX','小米MIX3','牛仔裤','蛋糕'],
            searchContent: ''
        }
    },
    computed: {
        navStyle(){
            let wholeStyle = this.nav == 'whole' ? 'color:#FF6600;border-bottom:2px solid #FF6600;':'';
            // let goodsStyle = this.nav == 'goods' ? 'color:#FF6600;border-bottom:2px solid #FF6600;':'';
            let shopStyle = this.nav == 'shop' ? 'color:#FF6600;border-bottom:2px solid #FF6600;':'';
            // return [wholeStyle,goodsStyle,shopStyle]
            return [wholeStyle,shopStyle]
        }
    },
    methods: {
        touchstart(index){
            this.timeOutEvent = setTimeout(() => {
                this.longPress(index);
            }, 500);
            return false;
        },
        touchend(item){
            clearTimeout(this.timeOutEvent);
            if(this.timeOutEvent != 0){
                this.historyClick(item);
            }
            return false;
        },
        touchmove(){
            clearTimeout(this.timeOutEvent);
            this.timeOutEvent = 0;
        },
        longPress(index){
            this.timeOutEvent = 0;
            this.$message.confirm('您将删除此条记录？').then(action=>{
                this.history.splice(index,1);
            },reject=>{
                console.log('取消删除操作');
            })
        },
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
        changeNav(nav){
            this.nav = nav;
        },
        goBack(){
            this.rightMove();
            setTimeout(() => {
                this.$router.push({path:'/home'}); 
            }, 200);
        },
        search(){
            if(!this.searchContent || this.searchContent.trim() == ''){
                this.$toast({
                    message: '空空如也',
                    iconClass: 'iconfont icon-jinggao1',
                    duration: 1000
                })
            }else{
                this.leftMove();
                setTimeout(() => {
                    this.$router.push({path:'/searchresult', query: {type: this.nav,goods: this.searchContent.trim()}});
                }, 200);
                
            }
        },
        deleteAll(){
            this.$message.confirm('您将删除全部历史记录？').then(action=>{
                this.history = [];
            },reject=>{
                console.log('取消删除操作');
            })
        },
        historyClick(item){
            this.searchContent = item;
            this.leftMove();
            setTimeout(() => {
                this.$router.push({path:'/searchresult', query: {type: this.nav,goods: this.searchContent}});
            }, 200); 
        }
    },
    mounted() {
        console.log(inp);
        inp.autofocus = 'autofocus';
        this.searchContent = this.$route.query.goods;
    },
    // beforeRouteLeave(to, from, next) {
    //     if(to.path === '/searchresult'){
    //         to.meta.keepAlive = false;
    //     }
    //     next();
    // }
}
</script>

<style lang="scss" scoped>
    .search-whole{
        position: relative;
        // height: 100%;
        display: grid;
        grid-template: 1fr 1fr 10fr / 1fr;
        background: #F0F0F0;
        .search{
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 30px;
            }
            i:active{
                color: #999;
            }
            input{
                border: 1px solid gray;
                border-radius: 20px;
                height: 30px;
                width: 55%;
                padding: 0 10px;
                margin: 0 10px 0 20px;
                font-size: 15px;
                background: white;
            }
            button{
                height: 30px;
                padding: 5px 10px;
                border-radius: 15px;
                background: #FF6600;
                font-size: 15px;
            }
            button:active{
                background: #999;
            }
        }
        .nav{
            ul{
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 100%;
                li{
                    font-size: 20px;
                    padding-bottom: 5px;
                }
            }
        }
        .history{
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            div{
                width: 100%;
                margin: 10px 0;
                display: flex;
                justify-content: space-between;
                span{
                    color: #999;
                    margin-left: 10px;
                }
                i{
                    margin-right: 20px;
                    font-size: 20px;
                }
                i:active{
                    color: #999
                }
            }
            ul{
                // align-self: center;
                display: flex;
                flex-wrap: wrap;
                width: 90%;
                // justify-content: space-around;
                li{
                    background: gainsboro;
                    padding: 5px;
                    margin: 5px 10px;
                    border-radius: 15px;
                }
            }
        }
    }
</style>


