#!/bin/bash
# 查找 Android Studio 项目路径的脚本

echo "🔍 正在查找 Android Studio 项目..."
echo ""

# 常见的项目位置
SEARCH_PATHS=(
  "$HOME/AndroidStudioProjects"
  "$HOME/Documents/AndroidStudioProjects"
  "$HOME/Desktop"
  "$HOME/Documents"
)

for path in "${SEARCH_PATHS[@]}"; do
  if [ -d "$path" ]; then
    echo "📁 检查: $path"
    # 查找包含 KOKO 或 Android 的项目文件夹
    find "$path" -maxdepth 2 -type d -name "*KOKO*" -o -name "*koko*" 2>/dev/null | while read dir; do
      if [ -d "$dir/app/src/main" ]; then
        echo "  ✅ 找到项目: $dir"
        echo "     Assets 路径: $dir/app/src/main/assets"
      fi
    done
  fi
done

echo ""
echo "💡 如果没有找到，请告诉我你的项目保存在哪里？"