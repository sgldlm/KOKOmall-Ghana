# 📍 如何找到 app/build.gradle 文件

## 🎯 方法一：在 Android Studio 左侧项目结构中查找

### 步骤：

1. **查看左侧项目结构**
   - 在 Android Studio 左侧，你会看到项目文件树

2. **找到 "Gradle Scripts" 节点**
   - 在项目结构的最底部（或顶部，取决于视图）
   - 有一个名为 **"Gradle Scripts"** 的文件夹
   - 点击展开它

3. **找到 build.gradle 文件**
   - 在 "Gradle Scripts" 文件夹中，你会看到多个文件：
     - `build.gradle (Project: KOKOmall)` ← 这是项目级别的
     - `build.gradle (Module: app)` ← **这是你要找的！**
     - `settings.gradle`
     - `gradle.properties`
     - 等等

4. **打开文件**
   - 双击 `build.gradle (Module: app)`
   - 文件会在中央编辑器打开

## 🎯 方法二：使用 Project 视图

### 步骤：

1. **切换到 Project 视图**
   - 在左侧项目结构顶部，有一个下拉菜单
   - 当前可能是 "Android" 视图
   - 点击下拉菜单，选择 **"Project"**

2. **导航到文件**
   - 展开项目根目录
   - 展开 `app` 文件夹
   - 找到 `build.gradle` 文件
   - 双击打开

## 🎯 方法三：使用搜索功能

### 步骤：

1. **使用快捷键搜索**
   - 按 `Cmd + Shift + F`（macOS）或 `Ctrl + Shift + F`（Windows）
   - 或点击顶部菜单：Edit → Find → Find in Files

2. **搜索内容**
   - 在搜索框中输入：`minSdk`
   - 应该能找到 `build.gradle` 文件

3. **打开文件**
   - 在搜索结果中点击文件
   - 会自动打开并定位到该行

## 🎯 方法四：直接路径

### 文件位置：

```
你的项目根目录/app/build.gradle
```

例如：
- `~/AndroidStudioProjects/KOKOmall/app/build.gradle`
- `~/Desktop/KOKOmall/app/build.gradle`

## 📝 如何识别正确的文件

### 项目级别的 build.gradle：
- 文件名：`build.gradle (Project: KOKOmall)`
- 位置：项目根目录
- 内容：包含 `buildscript` 和 `allprojects`

### 模块级别的 build.gradle（你要找的）：
- 文件名：`build.gradle (Module: app)`
- 位置：`app/` 文件夹内
- 内容：包含 `android { defaultConfig { minSdk ... } }`

## ✅ 验证找到了正确的文件

打开文件后，应该能看到类似这样的内容：

```gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.KOKO.mall'
    compileSdk 34

    defaultConfig {
        applicationId "com.KOKO.mall"
        minSdk 21  // ← 这里需要改为 23
        targetSdk 34
        ...
    }
    ...
}
```

## 🔧 修改步骤

1. **找到 `minSdk` 行**
   - 在 `defaultConfig` 块中
   - 应该是 `minSdk 21`

2. **改为 23**
   ```gradle
   minSdk 23  // 从 21 改为 23
   ```

3. **同步项目**
   - 点击顶部出现的 "Sync Now" 横幅
   - 或 File → Sync Project with Gradle Files

## 💡 提示

- **Gradle Scripts** 是 Android Studio 的特殊视图，方便查找 Gradle 相关文件
- 如果找不到，切换到 **Project** 视图，直接导航到 `app/build.gradle`
- 文件可能显示为 `build.gradle.kts`（Kotlin DSL），内容类似，修改方法相同

## 🎉 完成！

找到文件后，按照修复步骤修改 `minSdk` 值即可！