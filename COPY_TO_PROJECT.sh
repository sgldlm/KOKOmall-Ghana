#!/bin/bash
# 复制 PWA 文件到 Android Studio 项目的脚本

SOURCE_DIR="/Users/admin/Desktop/KOKO-app/pwa-android"

# 找到的项目列表
PROJECTS=(
  "/Users/admin/AndroidStudioProjects/kokomall"
  "/Users/admin/AndroidStudioProjects/KOKO"
  "/Users/admin/Desktop/KOKOmall"
  "/Users/admin/Desktop/KOKO-app"
)

echo "📋 找到以下 Android 项目："
echo ""

for i in "${!PROJECTS[@]}"; do
  echo "$((i+1)). ${PROJECTS[$i]}"
done

echo ""
read -p "请选择要复制到的项目编号 (1-${#PROJECTS[@]}): " choice

if [ -z "$choice" ] || [ "$choice" -lt 1 ] || [ "$choice" -gt "${#PROJECTS[@]}" ]; then
  echo "❌ 无效的选择"
  exit 1
fi

SELECTED_PROJECT="${PROJECTS[$((choice-1))]}"
ASSETS_DIR="$SELECTED_PROJECT/app/src/main/assets"

echo ""
echo "📁 目标项目: $SELECTED_PROJECT"
echo "📁 Assets 路径: $ASSETS_DIR"
echo ""

# 检查项目是否存在
if [ ! -d "$SELECTED_PROJECT" ]; then
  echo "❌ 项目不存在: $SELECTED_PROJECT"
  exit 1
fi

# 创建 assets 文件夹
echo "📁 创建 assets 文件夹..."
mkdir -p "$ASSETS_DIR"

if [ ! -d "$ASSETS_DIR" ]; then
  echo "❌ 无法创建 assets 文件夹"
  exit 1
fi

# 复制文件
echo "📦 复制文件..."
cp -r "$SOURCE_DIR"/* "$ASSETS_DIR/"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ 文件复制成功！"
  echo ""
  echo "📊 复制的文件："
  ls -lh "$ASSETS_DIR" | head -10
  echo ""
  echo "🎉 完成！现在可以在 Android Studio 中看到文件了。"
else
  echo "❌ 复制失败"
  exit 1
fi