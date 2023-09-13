<template>
    <ManageNavbar></ManageNavbar>

    <!-- <hr style="width: 90%;margin:2% auto;"> -->
    <div class="contain">
        <div style="display: flex;">
            <div class="tags">
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/users">
                        <People style="width: 24px;" />
                        用戶管理
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/lessons">
                        <Server style="width: 24px;" />
                        課程管理
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/reports">
                        <Ban style="width: 24px;" />
                        檢舉管理
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/orders">
                        <ReorderFour style="width: 24px;" />
                        訂單管理
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/apply">
                        <NotificationsOutline style="width: 24px;" />
                        教師審核
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/revenue">
                        <BarChart style="width: 24px;" />
                        營收管理
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/comment">
                        <ChatbubbleEllipsesOutline style="width: 24px;" />
                        評論管理
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="/manager/system">
                        <Build style="width: 24px;" />
                        系統設置
                    </router-link>
                </div>
                <div class="tagslink">
                    <router-link class="routerLink" to="">
                        <LogOut style="width: 24px;" />
                        登出
                    </router-link>
                </div>

            </div>
            <div class="view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import ManageNavbar from "@/components/public/ManageNavbar.vue"
import { People, Ban, BarChart, Build, ChatbubbleEllipsesOutline, LogOut, NotificationsOutline, ReorderFour, Server } from "@vicons/ionicons5"
</script>
    
<style scoped>
.contain {

    border-radius: 5px;

}

.tags {
    padding-top: 2%;
    background-color: #1d2939;
    display: flex;
    flex-direction: column;
    width: 15%;
    height: 100vh;
}

.view {
    width: 85%;
}

.tagslink {
    display: flex;
    justify-content: center
}

.routerLink {
    /* display: flex; */
    margin: 10px;
    color: white;
    font-weight: bold;
    font-size: 20px;
}
</style>