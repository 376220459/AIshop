<template>
    <div class="search-whole">
        <div class="search">
            <i class="iconfont icon-fanhui"></i>
            <input type="text">
            <button>搜索</button>
        </div>

        <div class="nav">
            <ul>
                <li>全部</li>
                <li>商品</li>
                <li>店铺</li>
            </ul>
        </div>

        <div class="history">
            <span>历史搜索</span>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    
}
</script>

<style lang="scss" scoped>
    .search-whole{
        height: 100%;
        display: grid;
        grid-template: 1fr 1fr 10fr / 1fr;
        .search{
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 30px;
            }
            input{
                border: 1px solid gray;
                border-radius: 20px;
                height: 30px;
                width: 55%;
                padding-left: 10px;
                margin: 0 10px 0 30px;
                font-size: 15px;
            }
            button{
                height: 30px;
                padding: 5px 10px;
                border-radius: 15px;
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
                    color: #FF6600;
                    border-bottom: 2px solid #FF6600;
                }
            }
        }
        .history{
            span{
                margin: 5px 0;

            }
        }
    }
</style>


