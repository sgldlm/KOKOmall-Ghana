#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成首页产品图片信息文件
提取所有产品信息，生成图片文件名清单和详细信息
"""

import json
import re
import os

# 读取HTML文件中的产品数据
def extract_products_from_html(html_file):
    """从HTML文件中提取产品数据"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找SD对象定义
    pattern = r'const SD = ({.*?});'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print("未找到产品数据")
        return []
    
    # 解析JavaScript对象（简化版，实际需要更复杂的解析）
    # 这里我们直接提取产品信息
    products = []
    
    # 匹配产品对象模式: { b: "品牌", n: "名称", p: 价格, t: "标签", i: "图标", img: "图片" }
    product_pattern = r'\{[^}]*b:\s*"([^"]*)",\s*n:\s*"([^"]*)",\s*p:\s*(\d+),\s*t:\s*"([^"]*)",\s*i:\s*"([^"]*)"(?:\s*,\s*img:\s*"([^"]*)")?\s*\}'
    
    matches = re.finditer(product_pattern, content)
    for match in matches:
        brand = match.group(1)
        name = match.group(2)
        price = int(match.group(3))
        tag = match.group(4)
        icon = match.group(5)
        img = match.group(6) if match.group(6) else ""
        
        # 生成产品ID（与HTML中的getProductImagePath函数保持一致）
        product_id = (brand + '_' + name).lower().replace(' ', '_')
        product_id = re.sub(r'[<>:"/\\|?*]', '', product_id)
        product_id = re.sub(r'\s+', '_', product_id)
        
        # 生成图片文件名
        image_filename = f"{product_id}.jpg"
        image_path = f"product-images/{image_filename}"
        
        products.append({
            'id': product_id,
            'brand': brand,
            'name': name,
            'price': price,
            'tag': tag,
            'icon': icon,
            'current_img': img,
            'image_filename': image_filename,
            'image_path': image_path
        })
    
    return products

def generate_product_id(brand, name):
    """生成产品ID（与HTML中的getProductImagePath函数保持一致）"""
    product_id = (brand + '_' + name).lower().replace(' ', '_')
    product_id = re.sub(r'[<>:"/\\|?*]', '', product_id)
    product_id = re.sub(r'\s+', '_', product_id)
    return product_id

def main():
    html_file = '../index.html'
    output_dir = '.'
    
    print("正在读取HTML文件...")
    products = extract_products_from_html(html_file)
    
    if not products:
        print("未找到产品数据，尝试直接读取HTML中的SD对象...")
        # 如果正则匹配失败，尝试读取HTML并手动解析
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 查找所有产品数据行
        products = []
        lines = content.split('\n')
        in_sd = False
        current_category = None
        
        for i, line in enumerate(lines):
            if "const SD = {" in line:
                in_sd = True
                continue
            if in_sd and line.strip().startswith("'") and ':' in line:
                # 分类行，如 'ph': [
                category_match = re.search(r"'(\w+)':\s*\[", line)
                if category_match:
                    current_category = category_match.group(1)
                    continue
            if in_sd and '{' in line and 'b:' in line:
                # 产品行
                # 匹配: { b: "品牌", n: "名称", p: 价格, t: "标签", i: "图标" }
                brand_match = re.search(r'b:\s*"([^"]*)"', line)
                name_match = re.search(r'n:\s*"([^"]*)"', line)
                price_match = re.search(r'p:\s*(\d+)', line)
                tag_match = re.search(r't:\s*"([^"]*)"', line)
                icon_match = re.search(r'i:\s*"([^"]*)"', line)
                img_match = re.search(r'img:\s*"([^"]*)"', line)
                
                if brand_match and name_match and price_match:
                    brand = brand_match.group(1)
                    name = name_match.group(1)
                    price = int(price_match.group(1))
                    tag = tag_match.group(1) if tag_match else ""
                    icon = icon_match.group(1) if icon_match else ""
                    img = img_match.group(1) if img_match else ""
                    
                    product_id = generate_product_id(brand, name)
                    image_filename = f"{product_id}.jpg"
                    image_path = f"product-images/{image_filename}"
                    
                    products.append({
                        'id': product_id,
                        'category': current_category or '',
                        'brand': brand,
                        'name': name,
                        'price': price,
                        'tag': tag,
                        'icon': icon,
                        'current_img': img,
                        'image_filename': image_filename,
                        'image_path': image_path
                    })
            if in_sd and line.strip() == '};':
                break
    
    print(f"找到 {len(products)} 个产品")
    
    # 生成JSON文件
    json_file = os.path.join(output_dir, 'product-images-info.json')
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print(f"已生成: {json_file}")
    
    # 生成文本清单文件
    txt_file = os.path.join(output_dir, '产品图片清单.txt')
    with open(txt_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("首页产品图片清单\n")
        f.write("=" * 80 + "\n\n")
        f.write(f"共 {len(products)} 个产品需要图片\n\n")
        f.write("使用说明：\n")
        f.write("1. 将产品图片放入 product-images 文件夹\n")
        f.write("2. 图片文件名必须与下面的 '图片文件名' 完全一致\n")
        f.write("3. HTML文件会自动检测并显示图片\n")
        f.write("4. 如果图片不存在或加载失败，会显示默认图标\n\n")
        f.write("=" * 80 + "\n\n")
        
        for idx, product in enumerate(products, 1):
            f.write(f"{idx}. {product['brand']} {product['name']}\n")
            f.write(f"   价格: ¥{product['price']}\n")
            f.write(f"   标签: {product['tag']}\n")
            f.write(f"   图片文件名: {product['image_filename']}\n")
            f.write(f"   图片路径: {product['image_path']}\n")
            if product['current_img']:
                f.write(f"   当前已有图片: {product['current_img']}\n")
            f.write("\n")
    
    print(f"已生成: {txt_file}")
    
    # 生成简化的文件名列表
    filename_list_file = os.path.join(output_dir, '图片文件名列表.txt')
    with open(filename_list_file, 'w', encoding='utf-8') as f:
        f.write("所有产品的图片文件名列表\n")
        f.write("=" * 80 + "\n\n")
        f.write(f"共 {len(products)} 个产品\n\n")
        f.write("文件名格式：品牌_产品名称.jpg\n\n")
        f.write("-" * 80 + "\n\n")
        
        for idx, product in enumerate(products, 1):
            f.write(f"{idx}. {product['image_filename']}\n")
    
    print(f"已生成: {filename_list_file}")
    
    print("\n完成！")
    print(f"\n生成的文件：")
    print(f"1. {json_file} - 详细产品信息（JSON格式）")
    print(f"2. {txt_file} - 产品图片清单（文本格式）")
    print(f"3. {filename_list_file} - 图片文件名列表（文本格式）")

if __name__ == '__main__':
    main()
