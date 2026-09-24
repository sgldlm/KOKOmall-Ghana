# ⚡ 快速修复 minSdk 错误

## 🎯 找到 build.gradle 文件

### 最简单的方法：

1. **在 Android Studio 左侧**
   - 向下滚动到底部
   - 找到 **"Gradle Scripts"** 文件夹
   - 点击展开

2. **找到文件**
   - 找到 `build.gradle (Module: app)`
   - 双击打开

### 如果找不到 Gradle Scripts：

1. **切换到 Project 视图**
   - 点击左侧项目结构顶部的下拉菜单
   - 选择 **"Project"**

2. **导航**
   - 展开项目根目录
   - 展开 `app` 文件夹
   - 找到 `build.gradle`
   - 双击打开

## 🔧 修改步骤

### 1. 打开文件后，找到这段代码：

```gradle
android {
    defaultConfig {
        applicationId "com.KOKO.mall"
        minSdk 21  // ← 这一行
        targetSdk 34
        ...
    }
}
```

### 2. 修改为：

```gradle
android {
    defaultConfig {
        applicationId "com.KOKO.mall"
        minSdk 23  // ← 改为 23
        targetSdk 34
        ...
    }
}
```

### 3. 保存并同步

- 保存文件（Cmd+S）
- 点击顶部出现的 **"Sync Now"** 按钮
- 或 File → Sync Project with Gradle Files

## ✅ 完成！

修改后，构建错误应该就解决了！