# 📱 Android Studio 封装 APK 详细指南

## 🎯 目标

将 KOKO Mall PWA 应用封装成 Android APK 文件。

## 📋 准备工作

### 1. 安装 Android Studio

1. **下载 Android Studio**
   - 访问：https://developer.android.com/studio
   - 下载并安装最新版本
   - 安装 Android SDK（API Level 21+）

2. **配置环境**
   - 确保已安装 Java JDK（Android Studio 自带）
   - 配置 Android SDK 路径

### 2. 准备 PWA 文件

✅ 已完成：
- `index.html` - 主应用文件
- `manifest.json` - PWA 清单
- `sw.js` - Service Worker
- `icon-*.png` - 应用图标
- `product-images-*/` - 图片文件夹

## 🚀 方法一：使用 Android Studio WebView（推荐）

### 步骤 1: 创建新项目

1. **打开 Android Studio**
   - 点击 "New Project"

2. **选择模板**
   - 选择 "Empty Activity"
   - 点击 "Next"

3. **配置项目**
   - Name: `KOKOMall`
   - Package name: `com.koko.mall`（或你喜欢的包名）
   - Save location: 选择保存位置
   - Language: `Java` 或 `Kotlin`（推荐 Kotlin）
   - Minimum SDK: `API 21`（Android 5.0+）
   - 点击 "Finish"

### 步骤 2: 复制 PWA 文件到项目

1. **创建 assets 文件夹**
   ```bash
   # 在项目根目录下
   mkdir -p app/src/main/assets
   ```

2. **复制 PWA 文件**
   ```bash
   # 复制所有文件到 assets 文件夹
   cp -r /Users/admin/Desktop/KOKO-app/pwa-android/* \
         /path/to/your/project/app/src/main/assets/
   ```

   或者手动操作：
   - 在 Android Studio 中，右键 `app/src/main`
   - New → Folder → Assets Folder
   - 将 `pwa-android` 文件夹中的所有文件复制到 `assets` 文件夹

### 步骤 3: 修改 MainActivity

#### 如果使用 Kotlin：

打开 `app/src/main/java/com/koko/mall/MainActivity.kt`：

```kotlin
package com.koko.mall

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        setContentView(webView)

        // 配置 WebView
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.databaseEnabled = true
        webSettings.setAppCacheEnabled(true)
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // 允许文件访问
        webSettings.allowFileAccess = true
        webSettings.allowContentAccess = true
        
        // 设置 User Agent（可选）
        webSettings.userAgentString = webSettings.userAgentString + " KOKOMallApp"

        // 设置 WebViewClient
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false // 在 WebView 中打开所有链接
            }
        }

        // 设置 WebChromeClient（用于进度条等）
        webView.webChromeClient = WebChromeClient()

        // 加载本地 HTML 文件
        webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
```

#### 如果使用 Java：

打开 `app/src/main/java/com/koko/mall/MainActivity.java`：

```java
package com.koko.mall;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        webView = new WebView(this);
        setContentView(webView);

        // 配置 WebView
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        
        // 允许文件访问
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        
        // 设置 User Agent（可选）
        webSettings.setUserAgentString(webSettings.getUserAgentString() + " KOKOMallApp");

        // 设置 WebViewClient
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false; // 在 WebView 中打开所有链接
            }
        });

        // 设置 WebChromeClient
        webView.setWebChromeClient(new WebChromeClient());

        // 加载本地 HTML 文件
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```

### 步骤 4: 配置 AndroidManifest.xml

打开 `app/src/main/AndroidManifest.xml`：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.koko.mall">

    <!-- 网络权限（如果需要加载外部资源） -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- 存储权限（如果需要访问本地文件） -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.KOKOMall"
        android:usesCleartextTraffic="true">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

### 步骤 5: 替换应用图标

1. **准备图标文件**
   - 使用 `icon-192.png` 和 `icon-512.png`
   - 或创建不同尺寸的图标

2. **使用 Android Studio 图标生成器**
   - 右键 `app/src/main/res`
   - New → Image Asset
   - 选择 "Launcher Icons"
   - 选择 `icon-512.png` 作为源文件
   - 生成所有尺寸的图标

3. **或手动替换**
   - 将图标文件复制到：
     - `app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
     - `app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
     - `app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
     - `app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
     - `app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

### 步骤 6: 配置应用名称和包名

打开 `app/src/main/res/values/strings.xml`：

```xml
<resources>
    <string name="app_name">KOKO Mall</string>
</resources>
```

### 步骤 7: 构建 APK

1. **生成签名密钥（首次）**
   ```bash
   keytool -genkey -v -keystore koko-mall-key.jks \
           -keyalg RSA -keysize 2048 -validity 10000 \
           -alias koko-mall
   ```

2. **配置签名**
   - File → Project Structure → Modules → app
   - Signing Configs → 添加签名配置
   - 选择刚才创建的密钥文件

3. **构建 APK**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - 等待构建完成
   - APK 文件位置：`app/build/outputs/apk/debug/app-debug.apk`

### 步骤 8: 生成发布版 APK

1. **创建签名配置**
   - 在 `app/build.gradle` 中添加：
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file('path/to/koko-mall-key.jks')
               storePassword 'your-password'
               keyAlias 'koko-mall'
               keyPassword 'your-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               minifyEnabled false
               proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

2. **构建发布版**
   - Build → Generate Signed Bundle / APK
   - 选择 APK
   - 选择 release 构建类型
   - 完成签名
   - APK 位置：`app/build/outputs/apk/release/app-release.apk`

## 🚀 方法二：使用 TWA (Trusted Web Activity)

TWA 是 Google 推荐的 PWA 转 APK 方法，更简单。

### 步骤 1: 使用 Bubblewrap（推荐）

1. **安装 Bubblewrap**
   ```bash
   npm install -g @bubblewrap/cli
   ```

2. **初始化项目**
   ```bash
   cd /Users/admin/Desktop/KOKO-app/pwa-android
   bubblewrap init --manifest manifest.json
   ```

3. **构建 APK**
   ```bash
   bubblewrap build
   ```

4. **生成 APK**
   - APK 文件会在 `build/` 目录中

### 步骤 2: 使用 PWA Builder

1. **访问 PWA Builder**
   - https://www.pwabuilder.com/
   - 输入你的 PWA URL 或上传 manifest.json

2. **生成 Android 包**
   - 点击 "Android" 选项
   - 下载生成的 APK

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

4. **Service Worker 支持**
   - Android 5.0+ 支持 Service Worker
   - 确保使用 `file:///android_asset/` 路径

### 路径问题

- HTML 文件：`file:///android_asset/index.html`
- 图片文件：`file:///android_asset/product-images-shop/xxx.jpg`
- Service Worker：`file:///android_asset/sw.js`

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

构建完成后，你就可以安装 APK 到 Android 设备上了！

## 📱 安装 APK

1. **传输 APK 到设备**
   - 通过 USB 连接
   - 或通过云盘/邮件传输

2. **安装**
   - 在设备上打开 APK 文件
   - 允许"未知来源"安装
   - 完成安装

3. **运行**
   - 打开应用
   - 享受你的 PWA 应用！