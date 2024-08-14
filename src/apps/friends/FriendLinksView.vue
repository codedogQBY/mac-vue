<!-- src/views/FriendLinksView.vue -->
<template>
  <div class="friend-links-view">
    <FriendLink v-for="friend in friends" :key="friend.url" :friend="friend" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FriendLink from './FriendLink.vue';
export interface FriendLinkType {
  name: string;
  motto: string;
  url: string;
  avatarUrl: string;
}
// Example friend link data
const friends = ref<FriendLinkType[]>([
  {
    name: 'John Doe',
    motto: 'Live and let live.',
    url: 'https://johndoe.com',
    avatarUrl: 'https://via.placeholder.com/60',
  },
  {
    name: 'Jane Smith',
    motto: 'Carpe Diem.',
    url: 'https://janesmith.com',
    avatarUrl: 'https://via.placeholder.com/60',
  },
]);
</script>

<style scoped>
.friend-links-view {
  max-width: 600px;
  margin: 20px auto;
  padding: 0 20px;
}
</style>
