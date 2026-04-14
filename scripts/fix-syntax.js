import fs from 'fs';

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix style={{fontVariationSettings: \"'FILL' 1\"}}
    content = content.replace(/style={{fontVariationSettings: \\"'FILL' 1\\"}}/g, "style={{fontVariationSettings: \\\"'FILL' 1\\\"}}"); // wait, maybe better regex
    
    // Actually remove escaping string:
    content = content.replace(/style={{fontVariationSettings: \\"([^"]+)\\"}}/g, "style={{fontVariationSettings: '$1'}}");

    // Clean up all standard HTML styles in Landing.tsx that might not have been caught
    // e.g. style="background-image: url('...'); background-size: cover; background-position: center; filter: grayscale(1) contrast(1.2);"
    content = content.replace(/style="background-image: url\('([^']+)'\); background-size: cover; background-position: center; filter: grayscale\(1\) contrast\(1\.2\);"/g, "style={{backgroundImage: `url('$1')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(1) contrast(1.2)'}}");
    
    // fix viewbox to viewBox
    content = content.replace(/viewbox=/g, 'viewBox=');

    fs.writeFileSync(file, content);
}

fixFile('src/pages/Landing.tsx');
fixFile('src/pages/Dashboard.tsx');
