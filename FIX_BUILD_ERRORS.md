# 🔧 修复 Android Studio 构建错误

## ⚠️ 发现的问题

从截图看，有两个问题需要修复：

1. **构建错误**：`minSdkVersion 21 cannot be smaller than 23`
2. **MainActivity 使用 Compose**：需要改为 WebView

## 🔧 修复步骤

### 步骤 1: 修复 minSdkVersion 错误

#### 方法一：提高 minSdkVersion（推荐）

1. **打开 `build.gradle` 文件**
   - 在项目中找到 `app/build.gradle`（或 `app/build.gradle.kts`）

2. **修改 minSdkVersion**
   ```gradle
   android {
       defaultConfig {
           minSdk 23  // 从 21 改为 23
           targetSdk 34
           ...
       }
   }
   ```

#### 方法二：使用 tools:overrideLibrary（不推荐）

如果必须使用 minSdk 21，可以在 AndroidManifest.xml 中添加：
```xml
<uses-sdk tools:overrideLibrary="androidx.navigationevent" />
```

但**不推荐**，因为可能引起兼容性问题。

### 步骤 2: 修改 MainActivity.kt

当前代码使用的是 Jetpack Compose，需要改为 WebView。

#### 替换 MainActivity.kt 代码：

打开 `app/src/main/java/com/KOKO/mall/MainActivity.kt`，替换为：

```kotlin
package com.KOKO.mall

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
        
        // 设置 User Agent
        webSettings.userAgentString = webSettings.userAgentString + " KOKOMallApp"

        // 设置 WebViewClient
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false // 在 WebView 中打开所有链接
            }
        }

        // 设置 WebChromeClient
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

### 步骤 3: 检查 AndroidManifest.xml

确保 AndroidManifest.xml 包含必要的权限：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.KOKO.mall">

    <!-- 网络权限 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- 存储权限 -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.KOKOmall"
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

### 步骤 4: 检查 build.gradle 依赖

确保 `app/build.gradle` 包含必要的依赖：

```gradle
dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    // 如果使用 Kotlin
    implementation 'org.jetbrains.kotlin:kotlin-stdlib:1.9.0'
    // 其他依赖...
}
```

## ✅ 修复后的验证

1. **同步项目**
   - File → Sync Project with Gradle Files
   - 或点击工具栏的 "Sync" 按钮

2. **重新构建**
   - Build → Rebuild Project
   - 应该不再有错误

3. **运行应用**
   - 点击运行按钮
   - 应用应该能正常启动并显示 HTML 页面

## 🐛 如果还有错误

### 错误：找不到 WebView

确保在 `build.gradle` 中：
```gradle
android {
    compileSdk 34
    ...
}
```

### 错误：assets 文件夹找不到文件

确保：
1. 文件已复制到 `app/src/main/assets/`
2. 文件路径正确：`file:///android_asset/index.html`

### 错误：图片不显示

检查：
1. 图片文件是否在 assets 文件夹中
2. HTML 中的图片路径是否正确
3. WebView 的文件访问权限是否启用

## 🎉 完成！

修复这些问题后，你的应用就可以正常构建和运行了！