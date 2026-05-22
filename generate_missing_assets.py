from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random

out = Path('/home/ubuntu/western-public-academy-work/public/manus-storage')
out.mkdir(parents=True, exist_ok=True)

assets = {
    'BACKGROUND-IMG-1_f0226305.jpg': ('Western Public Academy', 'Learning with character', (25, 68, 54), (199, 161, 74)),
    'BACKGROUND-IMG-2_af8cbdf6.jpg': ('Senior Campus', 'Focused academic environment', (34, 84, 92), (225, 210, 170)),
    'BACKGROUND-IMG-3_2f26548e.jpg': ('Student Life', 'Confidence, creativity, discipline', (50, 70, 45), (196, 130, 62)),
    'BACKGROUNDIMG4_37770fbe.jpg': ('Campus Activities', 'Balanced growth beyond classrooms', (63, 52, 85), (201, 161, 74)),
    'HOTEL-MANAGEMENT_2acdb586.png': ('Hotel Management', 'Hospitality • Service • Leadership', (73, 50, 32), (220, 188, 120)),
    'accountant_5ac1ff74.jpg': ('Accountancy', 'Finance and practical records', (38, 67, 75), (190, 154, 82)),
    'administrator_2034585d.jpg': ('Administration', 'Guidance and support', (35, 60, 50), (213, 187, 130)),
    'boating-picnic_7abe223c.jpg': ('Outdoor Learning', 'Community and exploration', (39, 91, 97), (195, 154, 72)),
    'education-faculty-cropped_26e06f3d.jpg': ('Education Faculty', 'Teaching for tomorrow', (45, 67, 99), (222, 200, 150)),
    'education-faculty_ab15b271.png': ('Education Faculty', 'Humanities and pedagogy', (42, 72, 96), (205, 170, 92)),
    'gal-13_65f6bd93.jpg': ('Gallery', 'Assembly and events', (41, 80, 60), (201, 161, 74)),
    'gal-17_f8a63fe2.jpg': ('Gallery', 'Classroom moments', (68, 58, 42), (225, 205, 154)),
    'gal-22_29534251.jpg': ('Gallery', 'Celebrations and culture', (73, 48, 72), (211, 157, 92)),
    'gallery-1_589fc84a.jpg': ('Gallery', 'Campus view', (26, 70, 56), (215, 184, 117)),
    'gallery-2_794d068d.jpg': ('Gallery', 'Learning spaces', (49, 75, 92), (205, 168, 95)),
    'gallery-3_323f24b0.jpg': ('Gallery', 'Student teamwork', (67, 75, 48), (222, 196, 132)),
    'gallery-4_8e46bd18.jpg': ('Gallery', 'Programs and clubs', (83, 56, 45), (201, 161, 74)),
    'gallery-5_8f12a865.jpg': ('Gallery', 'Academic excellence', (39, 59, 89), (228, 211, 160)),
    'gallery-8_2a2870f6.jpg': ('Gallery', 'School community', (58, 76, 62), (203, 164, 82)),
    'gallery-9_b25c0269.jpg': ('Gallery', 'Co-curricular learning', (71, 66, 92), (219, 189, 124)),
    'home-down-cover-photo_9d6f0754.jpg': ('Western Public Academy', 'A complete learning community', (26, 63, 52), (201, 161, 74)),
    'picnic-gallery_cf5f7b49.jpg': ('Picnic Gallery', 'Friendship and discovery', (37, 92, 82), (218, 187, 116)),
    'principal_5cc0958b.jpg': ('Principal', 'Leadership • Vision • Care', (54, 56, 70), (216, 190, 132)),
    'school-heads_472b7e4e.jpg': ('School Heads', 'Committed leadership team', (39, 69, 61), (201, 161, 74)),
    'sports-science-cropped_bbd1e293.jpg': ('Sports Science', 'Fitness and performance', (58, 78, 54), (216, 171, 82)),
    'sports-science_f4960d84.jpeg': ('Sports Science', 'Discipline and teamwork', (41, 84, 58), (201, 161, 74)),
    'teacher-picnic_ba3635cb.jpg': ('Teacher Community', 'Together beyond classrooms', (65, 67, 83), (220, 198, 142)),
    'vice-principal_efa73d24.jpg': ('Vice Principal', 'Academic coordination', (53, 61, 78), (201, 161, 74)),
}

def font(size, bold=False):
    candidates = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    ]
    for c in candidates:
        try:
            return ImageFont.truetype(c, size)
        except Exception:
            pass
    return ImageFont.load_default()

serif_big = font(68, True)
serif_mid = font(40, True)
sans = font(25, False)
small = font(18, False)

def draw_gradient(size, c1, c2):
    w, h = size
    img = Image.new('RGB', size, c1)
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x / w * 0.55 + y / h * 0.45)
            wave = 0.08 * math.sin((x + y) / 90.0)
            t = max(0, min(1, t + wave))
            px[x, y] = tuple(int(c1[i] * (1 - t) + c2[i] * t) for i in range(3))
    return img

def create_photo(name, title, subtitle, c1, c2):
    is_png = name.lower().endswith('.png')
    w, h = (1600, 1050)
    img = draw_gradient((w, h), c1, c2)
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    random.seed(name)
    # soft architectural arcs and panels
    for i in range(10):
        x = random.randint(-200, w)
        y = random.randint(-150, h)
        r = random.randint(180, 520)
        color = (247, 241, 229, random.randint(18, 42))
        d.ellipse((x, y, x + r, y + r), outline=color, width=random.randint(4, 10))
    for i in range(7):
        x0 = random.randint(-100, w-200)
        y0 = random.randint(0, h-120)
        x1 = x0 + random.randint(250, 600)
        y1 = y0 + random.randint(80, 180)
        d.rounded_rectangle((x0, y0, x1, y1), radius=26, fill=(255, 255, 255, random.randint(12, 25)), outline=(255, 255, 255, random.randint(18, 38)), width=2)
    # dark readability band
    d.rectangle((0, int(h*0.55), w, h), fill=(15, 30, 25, 118))
    d.rectangle((0, 0, w, h), outline=(201, 161, 74, 120), width=18)
    img = Image.alpha_composite(img.convert('RGBA'), overlay)
    d = ImageDraw.Draw(img)
    # WPA crest-like mark
    cx, cy = 120, 115
    d.ellipse((cx-55, cy-55, cx+55, cy+55), fill=(247, 241, 229, 230), outline=(201, 161, 74, 255), width=5)
    d.text((cx, cy-18), 'WPA', font=font(24, True), anchor='mm', fill=(25, 68, 54, 255))
    d.text((cx, cy+20), 'Est. 2053', font=font(12), anchor='mm', fill=(80, 70, 45, 255))
    # title and subtitle
    d.text((86, int(h*0.66)), title, font=serif_big if len(title) < 20 else serif_mid, fill=(247, 241, 229, 255))
    d.line((90, int(h*0.75), 330, int(h*0.75)), fill=(201, 161, 74, 255), width=6)
    d.text((90, int(h*0.79)), subtitle, font=sans, fill=(247, 241, 229, 230))
    d.text((90, int(h*0.88)), 'Western Public Academy • Bheemdatt-18, Katan, Kanchanpur', font=small, fill=(247, 241, 229, 190))
    img = img.convert('RGB')
    target = out / name
    img.save(target, quality=88, optimize=True)

for name, (title, subtitle, c1, c2) in assets.items():
    create_photo(name, title, subtitle, c1, c2)

# Dedicated transparent-style logo file expected by the header.
logo = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
d = ImageDraw.Draw(logo)
d.ellipse((18, 18, 494, 494), fill=(247, 241, 229, 255), outline=(201, 161, 74, 255), width=18)
d.ellipse((56, 56, 456, 456), outline=(25, 68, 54, 255), width=8)
d.text((256, 218), 'WPA', font=font(96, True), anchor='mm', fill=(25, 68, 54, 255))
d.text((256, 298), 'WESTERN PUBLIC', font=font(30, True), anchor='mm', fill=(65, 58, 36, 255))
d.text((256, 340), 'ACADEMY', font=font(30, True), anchor='mm', fill=(65, 58, 36, 255))
d.text((256, 400), 'EST. 2053', font=font(24), anchor='mm', fill=(145, 113, 52, 255))
logo.save(out / 'school-logo-circle-256_2612ab98.png', optimize=True)

print(f'Generated {len(assets)} visual assets plus logo in {out}')
