#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成首页产品图片映射文件
从index.html中提取所有产品数据，生成图片文件名和映射信息
"""

import json
import re
import os

def extract_products_from_html(html_file):
    """从HTML文件中提取产品数据"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找SD对象定义
    pattern = r"const SD = \{([\s\S]*?)\};"
    match = re.search(pattern, content)
    if not match:
        print("未找到产品数据SD对象")
        return []
    
    sd_content = match.group(1)
    
    # 解析各个分类的产品
    products = []
    categories = ['ph', 'sp', 'fa', 'li', 'di', 'sh', 'be', 'fu', 'bk', 'fit', 'toy', 'car', 'mus']
    
    for cat in categories:
        # 匹配每个分类的数组
        cat_pattern = rf"'{cat}':\s*\[([\s\S]*?)\]"
        cat_match = re.search(cat_pattern, sd_content)
        if cat_match:
            cat_products_str = cat_match.group(1)
            # 匹配每个产品对象
            product_pattern = r"\{\s*b:\s*\"([^\"]*)\",\s*n:\s*\"([^\"]*)\",\s*p:\s*(\d+)(?:,\s*t:\s*\"([^\"]*)\")?(?:,\s*i:\s*\"([^\"]*)\")?(?:,\s*img:\s*\"([^\"]*)\")?\s*\}"
            for prod_match in re.finditer(product_pattern, cat_products_str):
                brand = prod_match.group(1)
                name = prod_match.group(2)
                price = int(prod_match.group(3))
                tag = prod_match.group(4) if prod_match.group(4) else ""
                icon = prod_match.group(5) if prod_match.group(5) else ""
                existing_img = prod_match.group(6) if prod_match.group(6) else ""
                
                products.append({
                    'category': cat,
                    'brand': brand,
                    'name': name,
                    'price': price,
                    'tag': tag,
                    'icon': icon,
                    'existing_img': existing_img
                })
    
    return products

def generate_filename(brand, name):
    """生成图片文件名（与getProductImagePath函数逻辑一致）"""
    product_id = (brand + '_' + name).lower()
    # 移除不允许的字符
    product_id = re.sub(r'[<>:"/\\|?*]', '', product_id)
    # 替换空格为下划线
    product_id = re.sub(r'\s+', '_', product_id)
    return f"{product_id}.jpg"

def main():
    html_file = '../index.html'
    output_dir = '.'
    
    print("正在提取产品数据...")
    products = extract_products_from_html(html_file)
    print(f"找到 {len(products)} 个产品")
    
    # 生成映射数据
    mapping = []
    filename_list = []
    
    for idx, product in enumerate(products, 1):
        filename = generate_filename(product['brand'], product['name'])
        full_path = f"product-images-home/{filename}"
        
        mapping.append({
            'id': idx,
            'category': product['category'],
            'brand': product['brand'],
            'name': product['name'],
            'price': product['price'],
            'tag': product['tag'],
            'icon': product['icon'],
            'filename': filename,
            'path': full_path,
            'existing_img': product['existing_img'],
            'description': f"{product['brand']} {product['name']} {product['tag']}".strip()
        })
        
        filename_list.append({
            'filename': filename,
            'description': f"{product['brand']} {product['name']} {product['tag']}".strip(),
            'price': product['price']
        })
    
    # 保存映射文件
    mapping_file = os.path.join(output_dir, 'product-images-info.json')
    with open(mapping_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    print(f"已保存映射文件: {mapping_file}")
    
    # 保存文件名列表（文本格式）
    filename_list_file = os.path.join(output_dir, '图片文件名列表.txt')
    with open(filename_list_file, 'w', encoding='utf-8') as f:
        f.write("首页产品图片文件名列表\n")
        f.write("=" * 60 + "\n\n")
        for item in filename_list:
            f.write(f"文件名: {item['filename']}\n")
            f.write(f"产品: {item['description']}\n")
            f.write(f"价格: {item['price']} 积分\n")
            f.write("-" * 60 + "\n")
    print(f"已保存文件名列表: {filename_list_file}")
    
    # 保存产品清单（简化版）
    product_list_file = os.path.join(output_dir, '产品图片清单.txt')
    with open(product_list_file, 'w', encoding='utf-8') as f:
        f.write("首页产品图片清单\n")
        f.write("=" * 60 + "\n\n")
        for item in mapping:
            f.write(f"{item['id']}. {item['description']}\n")
            f.write(f"   文件名: {item['filename']}\n")
            f.write(f"   路径: {item['path']}\n")
            if item['existing_img']:
                f.write(f"   已有图片: {item['existing_img']}\n")
            f.write("\n")
    print(f"已保存产品清单: {product_list_file}")
    
    print(f"\n完成！共生成 {len(mapping)} 个产品的图片映射信息")
    print(f"\n下一步：")
    print(f"1. 查看 '{filename_list_file}' 了解需要上传的图片文件名")
    print(f"2. 将图片文件放入 '{output_dir}' 文件夹")
    print(f"3. 运行自动更新脚本更新HTML文件")

if __name__ == '__main__':
    main()
