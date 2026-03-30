import re
import os

files = [
    "src/app/(public)/licences/mri/page.tsx",
    "src/app/(public)/licences/page.tsx",
    "src/app/(public)/presentation/alternance/page.tsx",
    "src/app/(public)/presentation/apres-but/page.tsx",
    "src/app/(public)/presentation/but-gmp/page.tsx",
    "src/app/(public)/presentation/lieu/page.tsx",
    "src/app/(public)/presentation/page.tsx",
    "src/app/(public)/presentation/programme/page.tsx",
    "src/app/(public)/presentation/specificite/page.tsx",
    "src/components/forge/Nav-DeleteME.tsx",
    "src/components/layout/Footer.tsx",
    "src/components/layout/Nav.tsx",
    "src/components/sections/Entreprises.tsx",
    "src/components/sections/Hero.tsx"
]

# Regex to find apostrophes between letters, which is the most common case in French text.
# We avoid replacing them if they are part of a JS string (surrounded by quotes in code)
# by only targeting text that seems to be inside JSX.
# A simpler approach for this specific project (where most apostrophes are in text)
# is to look for French-specific patterns: d', l', qu', n', s', c', m', t', j'
pattern = re.compile(r"([dlqunscmjtDLQUNSCMJT])'([a-zA-Z\u00C0-\u00FF])")

for file_path in files:
    full_path = os.path.join("/home/hyo/hyosua/Projects/gmp", file_path)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Surgical replacement: only in lines that look like JSX (contain tags)
    new_lines = []
    for line in content.splitlines():
        if '<' in line or '>' in line or re.search(r"[a-zA-Z\u00C0-\u00FF]'[a-zA-Z\u00C0-\u00FF]", line):
            # If it's an import or 'use client', don't touch it
            if "import" in line or "'use client'" in line or "document.cookie" in line:
                new_lines.append(line)
            else:
                new_lines.append(pattern.sub(r"\1&rsquo;\2", line))
        else:
            new_lines.append(line)
    
    new_content = "\n".join(new_lines)
    if content.endswith('\n') and not new_content.endswith('\n'):
        new_content += '\n'
        
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {file_path}")
