// 使用Node.js创建PWA图标
// 需要安装: npm install canvas

const fs = require('fs');

function createIcon(size, filename) {
  try {
    const { createCanvas } = require('canvas');
    
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // 橙色背景
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(0, 0, size, size);
    
    // 黑色AFRICA文字
    ctx.fillStyle = '#1C1C1C';
    const fontSize = Math.floor(size * 0.35);
    ctx.font = `italic bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AFRICA', size / 2, size / 2);
    
    // 保存文件
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`Created ${filename}`);
    return true;
  } catch (error) {
    console.log(`Failed to create ${filename}:`, error.message);
    return false;
  }
}

// 创建两个图标
if (createIcon(192, 'icon-192.png') && createIcon(512, 'icon-512.png')) {
  console.log('All icons created successfully!');
} else {
  console.log('\nTo create icons, install canvas module:');
  console.log('  npm install canvas');
  console.log('\nOr use the create-icons.html file in a browser');
}
