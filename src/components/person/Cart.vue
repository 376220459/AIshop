<template>
    <div class="cart-whole">
        <div>
            购物车
        </div>
        <Footer class="footer"></Footer>
    </div>

</template>

<script>
import Footer from '@/components/common/Footer'
export default {
    name: 'Cart',
    components: {
        Footer: Footer
    },
}
</script>

<style lang="scss">
    .cart-whole{
        height: 100%;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        .footer{
            ul{
                li:nth-child(3){
                    color: #26a2ff;transform: scale(0.9)
                }
            }
        }
    }
</style>