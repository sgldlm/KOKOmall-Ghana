#!/usr/bin/env python3
"""Generate PWA icons from SVG or create simple icons"""
try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    def create_icon(size, output_path):
        """Create a simple icon with KOKO text"""
        # Create image with orange background
        img = Image.new('RGB', (size, size), color='#FFA500')
        draw = ImageDraw.Draw(img)
        
        # Try to use a bold font
        try:
            font_size = int(size * 0.4)
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Arial Bold.ttf", font_size)
            except:
                font = ImageFont.load_default()
        
        # Draw KOKO text
        text = "KOKO"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        position = ((size - text_width) / 2, (size - text_height) / 2)
        
        draw.text(position, text, fill='#1C1C1C', font=font)
        img.save(output_path, 'PNG')
        print(f"Created {output_path}")
    
    # Generate icons
    create_icon(192, 'icon-192.png')
    create_icon(512, 'icon-512.png')
    print("Icons generated successfully!")
    
except ImportError:
    print("PIL/Pillow not installed. Please install it with: pip3 install Pillow")
    print("Or use the generate-icons.html file in a browser to generate icons.")
