#!/bin/bash
# 生成PWA图标的脚本

# 创建简单的PNG图标（使用ImageMagick或sips）
# 如果没有这些工具，可以使用在线工具或手动创建

echo "正在生成图标..."

# 检查是否有ImageMagick
if command -v convert &> /dev/null; then
    # 使用ImageMagick创建192x192图标
    convert -size 192x192 xc:#FFA500 -gravity center -pointsize 60 -fill "#1C1C1C" -font Arial-Bold -annotate +0+0 "KOKO" icon-192.png
    # 使用ImageMagick创建512x512图标
    convert -size 512x512 xc:#FFA500 -gravity center -pointsize 160 -fill "#1C1C1C" -font Arial-Bold -annotate +0+0 "KOKO" icon-512.png
    echo "图标已生成"
elif command -v sips &> /dev/null; then
    # macOS sips不能直接创建带文字的图片，需要先创建纯色图片
    # 这里我们创建一个简单的橙色方块作为临时方案
    # 用户可以使用在线工具或图形软件添加文字
    echo "sips工具可用，但需要手动添加文字"
    echo "请使用图形软件打开SVG文件并导出为PNG格式"
    echo "或者访问 https://realfavicongenerator.net/ 生成图标"
else
    echo "未找到图像处理工具"
    echo "请手动创建以下尺寸的PNG图标："
    echo "  - icon-192.png (192x192像素)"
    echo "  - icon-512.png (512x512像素)"
    echo "图标应为橙色背景(#FFA500)，黑色KOKO文字"
fi
