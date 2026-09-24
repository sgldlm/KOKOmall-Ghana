# 🔧 逐步修复指南

## ⚠️ 当前问题

从 Android Studio 截图看：
1. ❌ 构建错误：`minSdkVersion 21 cannot be smaller than 23`
2. ❌ MainActivity 使用 Compose，需要改为 WebView

## 🚀 修复步骤

### 步骤 1: 修复 minSdkVersion

1. **打开 `app/build.gradle` 文件**
   - 在项目左侧找到 `Gradle Scripts`
   - 打开 `build.gradle (Module: app)`

2. **找到 `defaultConfig` 部分**
   ```gradle
   defaultConfig {
       applicationId "com.KOKO.mall"
       minSdk 21  // ← 这里需要改
       targetSdk 34
       ...
   }
   ```

3. **修改为 23**
   ```gradle
   defaultConfig {
       applicationId "com.KOKO.mall"
       minSdk 23  // ← 改为 23
       targetSdk 34
       ...
   }
   ```

4. **同步项目**
   - 点击 "Sync Now" 按钮
   - 或 File → Sync Project with Gradle Files

### 步骤 2: 替换 MainActivity.kt

1. **打开 MainActivity.kt**
   - 在 `app/src/main/java/com/KOKO/mall/MainActivity.kt`

2. **删除所有现有代码**

3. **复制新代码**
   - 打开 `pwa-android/MainActivity_FIXED.kt`
   - 复制所有代码
   - 粘贴到 MainActivity.kt

4. **保存文件**
   - Cmd+S

### 步骤 3: 检查 AndroidManifest.xml

1. **打开 AndroidManifest.xml**
   - `app/src/main/AndroidManifest.xml`

2. **确保包含权限**
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   ```

3. **检查 activity 配置**
   ```xml
   <activity
       android:name=".MainActivity"
       android:exported="true"
       android:configChanges="orientation|screenSize|keyboardHidden"
       android:windowSoftInputMode="adjustResize">
   ```

### 步骤 4: 验证 assets 文件夹

1. **检查 assets 文件夹**
   - 在项目左侧展开 `app/src/main/assets`
   - 应该能看到：
     - ✅ `index.html`
     - ✅ `manifest.json`
     - ✅ `sw.js`
     - ✅ `product-images-shop/` 文件夹

2. **如果文件不存在**
   - 参考 `QUICK_COPY.md` 复制文件

### 步骤 5: 重新构建

1. **清理项目**
   - Build → Clean Project

2. **重新构建**
   - Build → Rebuild Project

3. **检查错误**
   - 应该不再有 minSdkVersion 错误
   - MainActivity 应该能正常编译

### 步骤 6: 运行应用

1. **连接设备或启动模拟器**

2. **运行应用**
   - 点击运行按钮（绿色三角形）
   - 或 Run → Run 'app'

3. **验证**
   - 应用应该启动
   - 显示 HTML 页面
   - 图片应该正常显示

## ✅ 修复检查清单

- [ ] minSdkVersion 已改为 23
- [ ] MainActivity.kt 已替换为 WebView 版本
- [ ] AndroidManifest.xml 包含必要权限
- [ ] assets 文件夹包含所有文件
- [ ] 项目可以成功构建
- [ ] 应用可以正常运行

## 🐛 如果还有问题

### 问题：找不到 WebView

**解决**：确保 `build.gradle` 中：
```gradle
dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
}
```

### 问题：图片不显示

**解决**：
1. 检查 assets 文件夹中是否有图片文件
2. 检查 HTML 中的图片路径
3. 确保 WebView 设置正确

### 问题：Service Worker 不工作

**解决**：
- Android 5.0+ (API 21+) 支持 Service Worker
- 但建议使用 minSdk 23 以确保兼容性

## 🎉 完成！

按照以上步骤操作，你的应用就可以正常构建和运行了！