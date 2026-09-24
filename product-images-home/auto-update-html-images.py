#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动更新HTML文件中的图片路径
检测product-images-home文件夹中的图片，自动更新到index.html
"""

import json
import os
import re
import glob
from pathlib import Path

def load_image_mapping():
    """加载图片映射文件"""
    mapping_file = 'product-images-info.json'
    if os.path.exists(mapping_file):
        with open(mapping_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def scan_image_files():
    """扫描product-images-home文件夹中的图片文件"""
    image_dir = '.'
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif']
    found_images = {}
    
    for ext in image_extensions:
        for img_path in glob.glob(os.path.join(image_dir, ext)):
            filename = os.path.basename(img_path)
            # 移除扩展名，只保留基础名称
            base_name = os.path.splitext(filename)[0]
            found_images[base_name] = filename
    
    return found_images

def update_html_file(html_file, image_mapping, found_images):
    """更新HTML文件中的图片路径"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    updated_count = 0
    
    # 更新getProductImagePath函数，使其优先查找product-images-home文件夹
    # 首先检查函数是否存在
    if 'function getProductImagePath(product)' in content:
        # 查找函数定义
        func_pattern = r'(function getProductImagePath\(product\) \{[\s\S]*?return `product-images/\$\{productId\}\.jpg`;)'
        
        new_func = '''function getProductImagePath(product) {
                // 如果产品已有img属性，优先使用
                if (product.img) {
                    return product.img;
                }
                
                // 尝试从product-images-home文件夹中查找图片
                // 生成产品ID（基于品牌+名称）
                const brand = (product.b || '').trim();
                const name = (product.n || '').trim();
                const productId = (brand + '_' + name).toLowerCase().replace(/[<>:"/\\\\|?*]/g, '').replace(/\\s+/g, '_');
                if (!productId) return '';
                
                // 优先查找product-images-home文件夹
                // 支持的图片格式（按优先级排序）
                const extensions = ['jpg', 'jpeg', 'png', 'webp'];
                for (let ext of extensions) {
                    const testPath = `product-images-home/${productId}.${ext}`;
                    // 注意：这里假设图片存在，浏览器会通过onerror处理加载失败
                    // 实际文件存在性检查需要在服务器端或通过预加载列表完成
                }
                
                // 回退到product-images文件夹
                return `product-images-home/${productId}.jpg`; // 默认尝试jpg格式
            }'''
        
        content = re.sub(func_pattern, new_func, content)
        updated_count += 1
        print("已更新 getProductImagePath 函数")
    
    # 方法2：直接更新产品数据中的img属性（如果图片存在）
    # 查找SD对象并更新产品数据
    for item in image_mapping:
        brand = item['brand']
        name = item['name']
        filename = item['filename']
        base_name = os.path.splitext(filename)[0]
        
        # 检查图片文件是否存在
        if base_name in found_images:
            actual_filename = found_images[base_name]
            img_path = f"product-images-home/{actual_filename}"
            
            # 构建产品匹配模式
            # 匹配格式: { b: "Brand", n: "Name", ... }
            pattern = rf'(\{{\s*b:\s*"{re.escape(brand)}",\s*n:\s*"{re.escape(name)}"[^}}]*?)(\}})'
            
            def replace_product(match):
                product_str = match.group(1)
                # 检查是否已有img属性
                if 'img:' in product_str:
                    # 替换现有的img值
                    product_str = re.sub(r'img:\s*"[^"]*"', f'img: "{img_path}"', product_str)
                else:
                    # 在最后一个属性后添加img属性
                    # 找到最后一个属性（通常是i:）
                    if 'i:' in product_str:
                        product_str = re.sub(r'(i:\s*"[^"]*")', rf'\1, img: "{img_path}"', product_str)
                    else:
                        # 如果没有i属性，在n属性后添加
                        product_str = re.sub(r'(n:\s*"[^"]*")', rf'\1, img: "{img_path}"', product_str)
                return product_str + match.group(2)
            
            new_content = re.sub(pattern, replace_product, content)
            if new_content != content:
                content = new_content
                updated_count += 1
    
    if content != original_content:
        # 备份原文件
        backup_file = html_file + '.backup'
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(original_content)
        print(f"已创建备份文件: {backup_file}")
        
        # 写入更新后的内容
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"已更新HTML文件: {html_file}")
        print(f"共更新 {updated_count} 个产品的图片路径")
    else:
        print("未发现需要更新的内容")
    
    return updated_count

def main():
    html_file = '../index.html'
    
    if not os.path.exists(html_file):
        print(f"错误: 找不到HTML文件 {html_file}")
        return
    
    print("正在加载图片映射信息...")
    image_mapping = load_image_mapping()
    print(f"加载了 {len(image_mapping)} 个产品的映射信息")
    
    print("\n正在扫描图片文件...")
    found_images = scan_image_files()
    print(f"找到 {len(found_images)} 个图片文件")
    
    if found_images:
        print("\n找到的图片文件:")
        for base_name, filename in list(found_images.items())[:10]:  # 只显示前10个
            print(f"  - {filename}")
        if len(found_images) > 10:
            print(f"  ... 还有 {len(found_images) - 10} 个文件")
    
    print("\n正在更新HTML文件...")
    updated_count = update_html_file(html_file, image_mapping, found_images)
    
    print(f"\n完成！")
    if updated_count > 0:
        print(f"已更新 {updated_count} 个产品的图片路径")
        print("请刷新浏览器查看效果")
    else:
        print("没有需要更新的内容")
        print("提示: 请确保图片文件已放入 product-images-home 文件夹")

if __name__ == '__main__':
    main()
