# 📱 KOKO Mall PWA → Android APK 完整指南

## ✅ 准备工作已完成

### 📁 文件夹位置
```
/Users/admin/Desktop/KOKO-app/pwa-android/
```

### 📦 已准备的文件

#### 核心文件
- ✅ `index.html` (632KB) - 主应用文件，已链接商城页面图片
- ✅ `manifest.json` - PWA 清单文件
- ✅ `sw.js` - Service Worker
- ✅ `icon-192.png` - 应用图标 192x192
- ✅ `icon-512.png` - 应用图标 512x512

#### 图片资源
- ✅ `product-images-shop/` - 商城页图片（已链接）
- ✅ `product-images-home/` - 首页图片
- ✅ `product-images-points/` - 积分页图片

#### 代码示例文件
- ✅ `MainActivity.kt` - Kotlin 版本代码
- ✅ `MainActivity.java` - Java 版本代码
- ✅ `AndroidManifest.xml` - 清单文件示例

#### 文档
- ✅ `ANDROID_STUDIO_GUIDE.md` - 详细完整指南
- ✅ `QUICK_START.md` - 快速开始指南
- ✅ `README.md` - 项目说明

## 🚀 Android Studio 封装流程

### 第一步：安装 Android Studio

1. **下载**
   - 访问：https://developer.android.com/studio
   - 下载并安装最新版本

2. **配置**
   - 安装 Android SDK（API Level 21+）
   - 配置环境变量（可选）

### 第二步：创建新项目

1. **打开 Android Studio**
   - 点击 "New Project"

2. **选择模板**
   - 选择 "Empty Activity"
   - 点击 "Next"

3. **配置项目**
   ```
   Name: KOKOMall
   Package name: com.koko.mall
   Save location: [选择保存位置]
   Language: Kotlin（推荐）或 Java
   Minimum SDK: API 21 (Android 5.0+)
   ```

4. **完成创建**
   - 点击 "Finish"
   - 等待项目初始化完成

### 第三步：复制 PWA 文件

1. **创建 assets 文件夹**
   - 在 Android Studio 中
   - 右键 `app/src/main`
   - New → Folder → Assets Folder
   - 点击 "Finish"

2. **复制所有文件**
   ```bash
   # 方法一：使用命令行
   cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
         /path/to/your/project/app/src/main/assets/
   
   # 方法二：手动复制
   # 在 Finder 中打开两个文件夹，拖拽复制
   ```

3. **验证文件**
   - 在 Android Studio 中查看 `app/src/main/assets/`
   - 应该能看到所有文件

### 第四步：修改 MainActivity

#### 如果使用 Kotlin：

1. **打开文件**
   - `app/src/main/java/com/koko/mall/MainActivity.kt`

2. **替换代码**
   - 复制 `pwa-android/MainActivity.kt` 中的代码
   - 粘贴到 MainActivity.kt 文件中

#### 如果使用 Java：

1. **打开文件**
   - `app/src/main/java/com/koko/mall/MainActivity.java`

2. **替换代码**
   - 复制 `pwa-android/MainActivity.java` 中的代码
   - 粘贴到 MainActivity.java 文件中

### 第五步：配置 AndroidManifest.xml

1. **打开文件**
   - `app/src/main/AndroidManifest.xml`

2. **替换内容**
   - 复制 `pwa-android/AndroidManifest.xml` 中的内容
   - 粘贴到 AndroidManifest.xml 文件中
   - 修改 `package` 属性为你的包名

### 第六步：替换应用图标

1. **使用 Android Studio 图标生成器**
   - 右键 `app/src/main/res`
   - New → Image Asset
   - 选择 "Launcher Icons"
   - Foreground Layer → 选择 `icon-512.png`
   - 点击 "Next" → "Finish"

2. **或手动替换**
   - 将 `icon-192.png` 复制到各个 mipmap 文件夹
   - 重命名为 `ic_launcher.png`

### 第七步：配置应用名称

1. **打开文件**
   - `app/src/main/res/values/strings.xml`

2. **修改内容**
   ```xml
   <resources>
       <string name="app_name">KOKO Mall</string>
   </resources>
   ```

### 第八步：构建 APK

#### 构建调试版 APK：

1. **构建**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - 等待构建完成

2. **找到 APK**
   - 位置：`app/build/outputs/apk/debug/app-debug.apk`
   - 点击通知中的 "locate" 链接

#### 构建发布版 APK：

1. **创建签名密钥**
   ```bash
   keytool -genkey -v -keystore koko-mall-key.jks \
           -keyalg RSA -keysize 2048 -validity 10000 \
           -alias koko-mall
   ```

2. **配置签名**
   - File → Project Structure → Modules → app
   - Signing Configs → 添加签名配置
   - 选择密钥文件，输入密码

3. **构建发布版**
   - Build → Generate Signed Bundle / APK
   - 选择 APK
   - 选择 release 构建类型
   - 完成签名
   - APK 位置：`app/build/outputs/apk/release/app-release.apk`

### 第九步：安装和测试

1. **传输 APK 到设备**
   - 通过 USB 连接
   - 或通过云盘/邮件传输

2. **安装**
   - 在设备上打开 APK 文件
   - 允许"未知来源"安装
   - 完成安装

3. **测试**
   - 打开应用
   - 检查所有功能是否正常

## 📝 重要配置说明

### WebView 配置要点

1. **JavaScript 必须启用**
   ```kotlin
   webSettings.javaScriptEnabled = true
   ```

2. **本地存储必须启用**
   ```kotlin
   webSettings.domStorageEnabled = true
   webSettings.databaseEnabled = true
   ```

3. **文件访问权限**
   ```kotlin
   webSettings.allowFileAccess = true
   ```

4. **路径格式**
   - HTML: `file:///android_asset/index.html`
   - 图片: `file:///android_asset/product-images-shop/xxx.jpg`

### Service Worker 支持

- Android 5.0+ (API 21+) 支持 Service Worker
- 使用 `file:///android_asset/` 路径
- 确保 WebView 版本支持

## ⚠️ 常见问题

### Q: Service Worker 不工作？
A: 
- 确保使用 `file:///android_asset/` 路径
- Android 5.0+ 才支持 Service Worker
- 检查 WebView 版本

### Q: 图片不显示？
A: 
- 检查图片路径是否正确
- 确保图片文件在 assets 文件夹中
- 检查文件权限

### Q: 外部资源加载失败？
A: 
- 检查网络权限
- 确保 `usesCleartextTraffic="true"`（仅开发环境）
- 生产环境使用 HTTPS

### Q: 应用图标不显示？
A: 
- 确保图标文件存在
- 检查 AndroidManifest.xml 中的图标路径
- 重新构建项目

## ✅ 测试清单

- [ ] 应用可以正常启动
- [ ] HTML 页面正常加载
- [ ] JavaScript 功能正常
- [ ] 图片可以正常显示
- [ ] Service Worker 正常工作
- [ ] 离线功能正常
- [ ] 返回键可以返回上一页

## 🎉 完成！

按照以上步骤操作，你的 PWA 应用就可以成功封装成 Android APK 了！

## 📚 参考文档

- 详细指南：`ANDROID_STUDIO_GUIDE.md`
- 快速开始：`QUICK_START.md`
- 项目说明：`README.md`