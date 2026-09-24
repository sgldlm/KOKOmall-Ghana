# ⚡ Android Studio 快速开始指南

## 📁 文件夹位置

```
/Users/admin/Desktop/KOKO-app/pwa-android/
```

## ✅ 已准备的文件

- ✅ `index.html` - 主应用文件（632KB）
- ✅ `manifest.json` - PWA 清单文件
- ✅ `sw.js` - Service Worker
- ✅ `icon-192.png` - 应用图标 192x192
- ✅ `icon-512.png` - 应用图标 512x512
- ✅ `product-images-shop/` - 商城页图片（已链接）
- ✅ `product-images-home/` - 首页图片
- ✅ `product-images-points/` - 积分页图片

## 🚀 快速步骤

### 1. 打开 Android Studio

- 下载：https://developer.android.com/studio
- 安装并打开

### 2. 创建新项目

1. **New Project**
2. **Empty Activity**
3. **配置**：
   - Name: `KOKOMall`
   - Package: `com.koko.mall`
   - Language: `Kotlin`（推荐）或 `Java`
   - Minimum SDK: `API 21`

### 3. 复制文件到项目

1. **创建 assets 文件夹**
   - 在 Android Studio 中：右键 `app/src/main`
   - New → Folder → Assets Folder

2. **复制所有文件**
   ```bash
   # 复制整个 pwa-android 文件夹的内容到 assets
   cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
         /path/to/your/project/app/src/main/assets/
   ```

### 4. 修改 MainActivity

参考 `ANDROID_STUDIO_GUIDE.md` 中的代码示例

### 5. 构建 APK

- Build → Build Bundle(s) / APK(s) → Build APK(s)
- APK 位置：`app/build/outputs/apk/debug/app-debug.apk`

## 📖 详细指南

查看 `ANDROID_STUDIO_GUIDE.md` 获取完整详细步骤。

## ⚠️ 重要提示

1. **路径**：所有文件必须在 `assets` 文件夹中
2. **Service Worker**：Android 5.0+ 支持
3. **图标**：需要替换应用图标（使用 icon-512.png）

## 🎉 完成！

按照步骤操作，你的 PWA 应用就可以封装成 APK 了！