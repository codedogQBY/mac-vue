<template>
  <div class="friend-links-container">
    <div
        v-for="friend in friends"
        :key="friend.name"
        class="avatar"
        @mouseover="stopMovement(friend.name)"
        @mouseleave="startMovement(friend.name)"
        :style="{ top: friend.top, left: friend.left }"
    >
      <div class="avatar-content">
        {{ getInitials(friend.name) }}
      </div>
      <div v-if="friend.hovered" class="tooltip">
        <p>{{ friend.motto }}</p>
        <a :href="friend.url" target="_blank" rel="noopener noreferrer">喜欢我的话，欢迎访问</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { FriendLink } from '../types';

const friends = ref<FriendLink[]>([
  {
    name: 'John Doe',
    motto: 'Live and let live.',
    url: 'https://johndoe.com',
    avatarUrl: '',
    top: '50px',
    left: '100px',
    hovered: false,
  },
  {
    name: 'Jane Smith',
    motto: 'Carpe Diem.',
    url: 'https://janesmith.com',
    avatarUrl: '',
    top: '150px',
    left: '200px',
    hovered: false,
  },
  // 继续添加更多好友...
]);

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const stopMovement = (name: string) => {
  const friend = friends.value.find(f => f.name === name);
  if (friend) friend.hovered = true;
};

const startMovement = (name: string) => {
  const friend = friends.value.find(f => f.name === name);
  if (friend) friend.hovered = false;
};

onMounted(() => {
  friends.value.forEach(friend => startMovingAvatar(friend));
});

const startMovingAvatar = (friend: FriendLink) => {
  const move = () => {
    if (!friend.hovered) {
      friend.top = `${Math.random() * 80 + 10}%`;
      friend.left = `${Math.random() * 80 + 10}%`;
    }
    setTimeout(move, Math.random() * 3000 + 1000);
  };
  move();
};
</script>

<style scoped>
.friend-links-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(120deg, #ff9a9e, #fad0c4, #fad0c4);
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.avatar {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  color: #333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.avatar-content {
  text-align: center;
  font-weight: bold;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.tooltip {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9em;
  z-index: 10;
}

.tooltip::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  border-width: 8px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
  transform: translateX(-50%);
}
</style>
