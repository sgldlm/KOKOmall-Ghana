# 📱 KOKO Mall PWA - Android APK 封装版本

## 📁 文件夹结构

```
pwa-android/
├── index.html              # 主应用文件
├── manifest.json           # PWA 清单文件
├── sw.js                   # Service Worker
├── icon-192.png           # 应用图标 192x192
├── icon-512.png           # 应用图标 512x512
├── product-images-shop/   # 商城页图片
├── product-images-home/   # 首页图片
├── product-images-points/ # 积分页图片
└── README.md              # 本文件
```

## ✅ 文件说明

### 核心文件
- **index.html**: 主应用文件，包含所有功能
- **manifest.json**: PWA 清单文件，定义应用元数据
- **sw.js**: Service Worker，处理离线缓存

### 图片资源
- **product-images-shop/**: 商城页产品图片（已链接）
- **product-images-home/**: 首页产品图片
- **product-images-points/**: 积分页产品图片

### 应用图标
- **icon-192.png**: 192x192 像素图标
- **icon-512.png**: 512x512 像素图标

## 🚀 在 Android Studio 中封装 APK

详细流程请参考：`ANDROID_STUDIO_GUIDE.md`

## 📝 注意事项

1. **路径问题**：所有路径使用相对路径，适合 Android WebView
2. **图片路径**：代码中已配置为使用 `product-images-shop/` 等文件夹
3. **Service Worker**：需要在 HTTPS 或 localhost 环境下工作
4. **图标**：确保图标文件存在，否则需要创建

## 🔧 如果需要创建图标

如果图标文件不存在，可以使用在线工具创建：
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

或使用 ImageMagick：
```bash
# 需要先安装 ImageMagick
brew install imagemagick

# 从现有图片创建图标
convert your-logo.png -resize 192x192 icon-192.png
convert your-logo.png -resize 512x512 icon-512.png
```