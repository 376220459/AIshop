<template>
    <div class="follow-whole">
        <div>
            关注
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
}
</script>

<style lang="scss">
    .follow-whole{
        height: 100%;
        display: grid;
        grid-template: 9fr 1fr / 1fr;
        .footer{
            ul{
                li:nth-child(2){
                    color: #FF6600;
                    transform: scale(0.9)
                }
            }
        }
    }
</style>