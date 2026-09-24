# 快速开始指南

## 第一步：生成图标文件

图标文件（icon-192.png 和 icon-512.png）是PWA必需的。请按以下步骤生成：

### 方法1：使用浏览器生成（推荐）

1. 在浏览器中打开 `create-icons.html`
2. 页面会自动下载两个PNG图标文件
3. 确保文件名为 `icon-192.png` 和 `icon-512.png`

### 方法2：使用在线工具

1. 访问 https://realfavicongenerator.net/
2. 上传 `koko-logo.svg` 文件
3. 下载生成的图标包
4. 提取 `icon-192.png` 和 `icon-512.png` 到当前目录

### 方法3：手动创建

使用图像编辑软件（Photoshop、GIMP等）：
- 创建 192x192 像素的PNG文件，橙色背景(#FFA500)，黑色"KOKO"文字
- 创建 512x512 像素的PNG文件，橙色背景(#FFA500)，黑色"KOKO"文字
- 保存为 `icon-192.png` 和 `icon-512.png`

## 第二步：测试PWA

### 本地测试

```bash
# 进入目录
cd pwa-dist

# 启动本地服务器（Python）
python3 -m http.server 8000

# 或使用Node.js
npx http-server -p 8000
```

然后在浏览器访问：http://localhost:8000

### 安装PWA

1. 在Chrome/Edge中访问应用
2. 点击地址栏右侧的"安装"图标
3. 或在菜单中选择"安装KOKO Mall"

## 文件说明

- `index.html` - 主应用文件
- `manifest.json` - PWA清单配置
- `sw.js` - Service Worker（离线支持）
- `icon-192.png` - 192x192应用图标（需要生成）
- `icon-512.png` - 512x512应用图标（需要生成）
- `koko-logo.svg` - SVG格式的logo
- `README.md` - 详细文档

## 部署到服务器

1. 将所有文件上传到Web服务器
2. 确保服务器支持HTTPS（PWA要求）
3. 访问网站，浏览器会提示"添加到主屏幕"

## 故障排除

**图标不显示？**
- 确保 `icon-192.png` 和 `icon-512.png` 文件存在
- 检查文件路径是否正确

**无法安装？**
- 确保在HTTPS环境下（localhost除外）
- 检查浏览器控制台是否有错误

**Service Worker未注册？**
- 检查 `sw.js` 文件是否存在
- 确保在HTTPS或localhost环境下
