# ⚡ 快速复制文件指南

## 🎯 找到的项目

我找到了以下 Android 项目：

1. **kokomall** - `/Users/admin/AndroidStudioProjects/kokomall`
2. **KOKO** - `/Users/admin/AndroidStudioProjects/KOKO`
3. **KOKOmall** - `/Users/admin/Desktop/KOKOmall`
4. **KOKO-app** - `/Users/admin/Desktop/KOKO-app`

## 🚀 方法一：使用自动脚本（最简单）

```bash
cd /Users/admin/Desktop/KOKO-app/pwa-android
./COPY_TO_PROJECT.sh
```

脚本会：
1. 显示所有找到的项目
2. 让你选择要复制到的项目
3. 自动创建 assets 文件夹
4. 复制所有文件

## 🚀 方法二：手动复制（选择你的项目）

### 选项 1: 复制到 kokomall

```bash
# 创建 assets 文件夹
mkdir -p ~/AndroidStudioProjects/kokomall/app/src/main/assets

# 复制文件
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/AndroidStudioProjects/kokomall/app/src/main/assets/
```

### 选项 2: 复制到 KOKO

```bash
# 创建 assets 文件夹
mkdir -p ~/AndroidStudioProjects/KOKO/app/src/main/assets

# 复制文件
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/AndroidStudioProjects/KOKO/app/src/main/assets/
```

### 选项 3: 复制到 KOKOmall

```bash
# 创建 assets 文件夹
mkdir -p ~/Desktop/KOKOmall/app/src/main/assets

# 复制文件
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/Desktop/KOKOmall/app/src/main/assets/
```

### 选项 4: 复制到 KOKO-app

```bash
# 创建 assets 文件夹
mkdir -p ~/Desktop/KOKO-app/app/src/main/assets

# 复制文件
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/Desktop/KOKO-app/app/src/main/assets/
```

## 🎯 方法三：使用 Android Studio 拖拽（推荐）

1. **在 Android Studio 中打开你的项目**

2. **创建 assets 文件夹**（如果还没有）
   - 右键 `app/src/main`
   - New → Folder → Assets Folder
   - 点击 "Finish"

3. **在 Finder 中打开源文件夹**
   - 打开：`/Users/admin/Desktop/KOKO-app/pwa-android/`

4. **拖拽复制**
   - 选择所有文件（Cmd+A）
   - 拖拽到 Android Studio 的 `assets` 文件夹
   - 选择 "Copy"（不是 Move）

## ✅ 验证文件已复制

复制完成后，运行：

```bash
# 替换为你的项目路径
ls ~/AndroidStudioProjects/kokomall/app/src/main/assets/index.html
ls ~/AndroidStudioProjects/kokomall/app/src/main/assets/manifest.json
ls ~/AndroidStudioProjects/kokomall/app/src/main/assets/product-images-shop/
```

或在 Android Studio 中：
- 展开 `app/src/main/assets/`
- 应该能看到所有文件

## 🎉 完成！

文件复制完成后，继续按照 `ANDROID_STUDIO_GUIDE.md` 中的步骤操作。