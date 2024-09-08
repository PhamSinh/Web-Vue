<template>
  <div class="banner">
    <canvas id="dotsCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  const canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let dots = [];
  const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
  
  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function initDots() {
    dots = [];
    for (let index = 0; index < 50; index++) {
      dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)]
      });
    }
    drawDots();
  }

  function handleMouseMove(event: MouseEvent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    const mouse = {
      x: event.pageX - canvas.getBoundingClientRect().left,
      y: event.pageY - canvas.getBoundingClientRect().top
    };
    dots.forEach(dot => {
      const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
      if (distance < 300) {
        ctx.strokeStyle = dot.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });
  }

  function handleResize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initDots();
  }

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  initDots();

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style scoped>
.banner {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.banner h1, .banner h4 {
  color: #eee;
}

.banner button {
  all: unset;
  border: 1px solid #afaeae55;
  padding: 10px 20px;
  border-radius: 20px;
  background-image: linear-gradient(to bottom, #eee1, transparent, #eee1);
  cursor: pointer;
  transition: 0.5s;
}

.banner button:hover {
  background-color: #c691e6;
  color: #040018;
  box-shadow: 0 0 50px #c691e6;
}

h1 {
  --to: left;
  font-size: 4em;
  font-weight: bold;
  background-image: linear-gradient(to var(--to), #89a5df, #e46e7f, #e8e191);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  line-height: 1em;
}

h1.right {
  --to: right;
}

#dotsCanvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
