#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查product-images文件夹中的图片文件
统计已上传和未上传的图片数量
"""

import os
import json

def check_images():
    """检查图片文件"""
    # 读取产品信息
    info_file = 'product-images-info.json'
    if not os.path.exists(info_file):
        print(f"错误：未找到 {info_file}")
        print("请先运行 generate-product-list.py 生成产品清单")
        return
    
    with open(info_file, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    # 检查product-images文件夹
    images_dir = '../product-images'
    if not os.path.exists(images_dir):
        print(f"警告：未找到 {images_dir} 文件夹")
        print(f"正在创建 {images_dir} 文件夹...")
        os.makedirs(images_dir, exist_ok=True)
    
    # 获取所有图片文件
    image_files = set()
    if os.path.exists(images_dir):
        for file in os.listdir(images_dir):
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
                image_files.add(file.lower())
    
    # 统计
    total_products = len(products)
    uploaded_count = 0
    missing_images = []
    
    for product in products:
        filename = product['image_filename'].lower()
        if filename in image_files:
            uploaded_count += 1
        else:
            missing_images.append(product)
    
    # 输出统计信息
    print("=" * 80)
    print("图片上传统计")
    print("=" * 80)
    print(f"\n总产品数: {total_products}")
    print(f"已上传图片: {uploaded_count}")
    print(f"未上传图片: {total_products - uploaded_count}")
    print(f"上传进度: {uploaded_count/total_products*100:.1f}%")
    
    if missing_images:
        print(f"\n未上传图片的产品（前20个）：")
        print("-" * 80)
        for i, product in enumerate(missing_images[:20], 1):
            print(f"{i}. {product['brand']} {product['name']}")
            print(f"   需要文件名: {product['image_filename']}")
        
        if len(missing_images) > 20:
            print(f"\n... 还有 {len(missing_images) - 20} 个产品未上传图片")
    
    print("\n" + "=" * 80)
    
    # 生成缺失图片列表文件
    if missing_images:
        missing_file = '缺失图片列表.txt'
        with open(missing_file, 'w', encoding='utf-8') as f:
            f.write("缺失图片列表\n")
            f.write("=" * 80 + "\n\n")
            f.write(f"共 {len(missing_images)} 个产品缺少图片\n\n")
            f.write("-" * 80 + "\n\n")
            
            for idx, product in enumerate(missing_images, 1):
                f.write(f"{idx}. {product['brand']} {product['name']}\n")
                f.write(f"   需要文件名: {product['image_filename']}\n")
                f.write(f"   图片路径: {product['image_path']}\n\n")
        
        print(f"\n已生成缺失图片列表: {missing_file}")

if __name__ == '__main__':
    check_images()
