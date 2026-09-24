# 📋 复制文件到 Android Studio 项目指南

## ⚠️ 错误原因

你使用的路径 `/path/to/your/project/` 是一个**占位符**，不是实际路径！

需要替换为你的**实际 Android 项目路径**。

## 🔍 方法一：找到你的 Android 项目路径

### 步骤 1: 在 Android Studio 中找到项目路径

1. **打开 Android Studio**
2. **打开你的项目**（或创建新项目）
3. **查看项目路径**：
   - 在 Android Studio 顶部菜单栏
   - File → Project Structure
   - 或直接查看项目文件夹名称

### 步骤 2: 常见的项目路径位置

Android Studio 项目通常保存在：
- `~/AndroidStudioProjects/KOKOMall/`
- `~/Documents/AndroidStudioProjects/KOKOMall/`
- `~/Desktop/KOKOMall/`
- 或你自定义的位置

### 步骤 3: 创建 assets 文件夹（如果不存在）

在 Android Studio 中：
1. 右键 `app/src/main`
2. New → Folder → Assets Folder
3. 点击 "Finish"

## 🚀 方法二：使用 Android Studio 直接操作（推荐）

### 最简单的方法：

1. **在 Android Studio 中打开项目**

2. **创建 assets 文件夹**
   - 右键 `app/src/main`
   - New → Folder → Assets Folder
   - 点击 "Finish"

3. **复制文件**
   - 在 Finder 中打开：`/Users/admin/Desktop/KOKO-app/pwa-android/`
   - 选择所有文件（Cmd+A）
   - 拖拽到 Android Studio 的 `app/src/main/assets/` 文件夹中
   - 选择 "Copy"（不是 Move）

## 💻 方法三：使用命令行（需要知道实际路径）

### 步骤 1: 找到你的项目路径

```bash
# 常见的项目位置
ls ~/AndroidStudioProjects/
ls ~/Documents/AndroidStudioProjects/
ls ~/Desktop/ | grep -i koko
```

### 步骤 2: 创建 assets 文件夹（如果不存在）

```bash
# 替换 YOUR_PROJECT_PATH 为你的实际路径
mkdir -p ~/AndroidStudioProjects/KOKOMall/app/src/main/assets
```

### 步骤 3: 复制文件

```bash
# 替换 YOUR_PROJECT_PATH 为你的实际路径
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/AndroidStudioProjects/KOKOMall/app/src/main/assets/
```

## 📝 实际示例

假设你的项目在 `~/AndroidStudioProjects/KOKOMall/`：

```bash
# 1. 创建 assets 文件夹
mkdir -p ~/AndroidStudioProjects/KOKOMall/app/src/main/assets

# 2. 复制所有文件
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/AndroidStudioProjects/KOKOMall/app/src/main/assets/

# 3. 验证文件已复制
ls -la ~/AndroidStudioProjects/KOKOMall/app/src/main/assets/
```

## ✅ 验证文件已复制

复制完成后，在 Android Studio 中：
1. 展开 `app/src/main/assets/`
2. 应该能看到：
   - ✅ `index.html`
   - ✅ `manifest.json`
   - ✅ `sw.js`
   - ✅ `icon-*.png`
   - ✅ `product-images-*/` 文件夹

## 🎯 推荐操作流程

### 最简单的方法（推荐）：

1. **在 Android Studio 中创建项目**
   - New Project → Empty Activity
   - Name: `KOKOMall`

2. **创建 assets 文件夹**
   - 右键 `app/src/main` → New → Folder → Assets Folder

3. **在 Finder 中打开源文件夹**
   - 打开：`/Users/admin/Desktop/KOKO-app/pwa-android/`

4. **拖拽复制**
   - 选择所有文件（Cmd+A）
   - 拖拽到 Android Studio 的 `assets` 文件夹
   - 选择 "Copy"

5. **完成！**
   - 文件会自动出现在 Android Studio 中

## ⚠️ 重要提示

1. **路径必须是实际路径**
   - 不能使用 `/path/to/your/project/` 这样的占位符
   - 必须是你实际的项目路径

2. **assets 文件夹必须存在**
   - 如果不存在，先创建它
   - 在 Android Studio 中创建最简单

3. **文件路径**
   - 所有文件必须在 `app/src/main/assets/` 文件夹中
   - 不能在其他位置

## 🐛 如果还是出错

告诉我：
1. 你的 Android 项目保存在哪个文件夹？
2. 项目名称是什么？
3. 我可以帮你生成正确的命令！