let currentPage = 0;
let isPlaying = false;


function createFloatingHearts() {
    const heartBg = document.body;

    // 创建新的心形
    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    // 随机左右位置，避免集中
//    const randomLeft = Math.random() * 100;
//    heart.style.left = randomLeft + '%';
// 随机生成位置
    const randomLeft = Math.random() * 100; // 左右随机位置（百分比）
    const randomTop = Math.random() * 100;  // 上下随机位置（百分比）
    heart.style.left = randomLeft + 'vw';  // 使用视口宽度单位
    heart.style.top = randomTop + 'vh';    // 使用视口高度单位

    // 随机大小
    const scale = 0.5 + Math.random();
    heart.style.transform = `scale(${scale})`;

    // 随机动画持续时间
    const duration = 3 + Math.random() * 3;
    heart.style.animationDuration = duration + 's';

    heartBg.appendChild(heart);

    // 动画结束后移除
    heart.addEventListener('animationend', () => heart.remove());
}
// 显示下一条消息
function showNextMessage() {
    if(currentPage >= messages.length) {
        // 所有消息显示完毕，可以添加特殊效果
        showFinalMessage();
        return;
    }

    const content = document.querySelector('.content');
    content.style.opacity = 0;

    setTimeout(() => {
        content.textContent = messages[currentPage];
        content.style.opacity = 1;
        content.classList.add('fade-in');
        currentPage++;
    }, 500);
}

// 显示最终消息
function showFinalMessage() {
    const content = document.querySelector('.content');
    content.innerHTML = `
        <div style="text-align: center;">
            <h2>❤️ 情人节快乐 ❤️</h2>
            <p style="margin-top: 20px;">永远爱你</p>
        </div>
    `;
    document.querySelector('.next-btn').style.display = 'none';
    // 最终消息时创建更多心形
    for(let i = 0; i < 20; i++) {
        setTimeout(createFloatingHearts, i * 100);
    }
}

// 控制背景音乐
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    if (isPlaying) {
        music.pause();
        musicBtn.textContent = '🔇';
    } else {
        music.play();
        musicBtn.textContent = '🎵';
    }

    isPlaying = !isPlaying;
}

// 页面加载完成后自动显示第一条消息
window.onload = function() {
    showNextMessage();
    // 尝试自动播放音乐（注意：很多浏览器会阻止自动播放）
    const music = document.getElementById('bgMusic');
    music.volume = 0.5;  // 设置音量为50%

    // 监听用户交互以启动音乐
    document.body.addEventListener('click', function() {
        if (!isPlaying) {
            music.play();
            isPlaying = true;
            document.getElementById('musicBtn').textContent = '🎵';
        }
    }, { once: true });

    // 添加心形生成的定时器
    setInterval(createFloatingHearts, 300); // 每300ms创建一个新的心形
};


