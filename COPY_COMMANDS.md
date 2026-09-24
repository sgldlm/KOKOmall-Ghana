# 📋 复制文件命令集合

## ⚠️ 重要：替换实际路径

以下命令中的 `YOUR_PROJECT_PATH` 需要替换为你的**实际 Android 项目路径**。

## 🔍 第一步：找到你的项目路径

### 方法 A：在 Android Studio 中查看

1. 打开 Android Studio
2. File → Project Structure
3. 查看 "Project Location" 或 "Project SDK Location"

### 方法 B：使用查找脚本

```bash
cd /Users/admin/Desktop/KOKO-app/pwa-android
./FIND_PROJECT_PATH.sh
```

### 方法 C：手动查找

```bash
# 查找常见的项目位置
ls ~/AndroidStudioProjects/
ls ~/Documents/AndroidStudioProjects/
ls ~/Desktop/ | grep -i koko
```

## 🚀 第二步：创建 assets 文件夹

```bash
# 替换 YOUR_PROJECT_PATH 为你的实际路径
mkdir -p YOUR_PROJECT_PATH/app/src/main/assets
```

## 📦 第三步：复制文件

### 完整复制命令：

```bash
# 替换 YOUR_PROJECT_PATH 为你的实际路径
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      YOUR_PROJECT_PATH/app/src/main/assets/
```

### 实际示例：

假设你的项目在 `~/AndroidStudioProjects/KOKOMall/`：

```bash
# 1. 创建 assets 文件夹
mkdir -p ~/AndroidStudioProjects/KOKOMall/app/src/main/assets

# 2. 复制所有文件
cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
      ~/AndroidStudioProjects/KOKOMall/app/src/main/assets/

# 3. 验证
ls -la ~/AndroidStudioProjects/KOKOMall/app/src/main/assets/
```

## ✅ 验证文件已复制

```bash
# 检查文件是否存在
ls YOUR_PROJECT_PATH/app/src/main/assets/index.html
ls YOUR_PROJECT_PATH/app/src/main/assets/manifest.json
ls YOUR_PROJECT_PATH/app/src/main/assets/product-images-shop/
```

## 🎯 推荐：使用 Android Studio 拖拽（最简单）

1. **在 Android Studio 中**：
   - 创建 assets 文件夹（右键 `app/src/main` → New → Folder → Assets Folder）

2. **在 Finder 中**：
   - 打开：`/Users/admin/Desktop/KOKO-app/pwa-android/`
   - 选择所有文件（Cmd+A）

3. **拖拽复制**：
   - 拖拽到 Android Studio 的 `assets` 文件夹
   - 选择 "Copy"

## 💡 需要帮助？

告诉我你的项目路径，我可以帮你生成正确的命令！

例如：
- 项目名称：KOKOMall
- 保存位置：~/AndroidStudioProjects/
- 完整路径：~/AndroidStudioProjects/KOKOMall/