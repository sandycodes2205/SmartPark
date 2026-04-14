const fs = require('fs');

function fixJsx(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace HTML comments
    content = content.replace(/<!--(.*?)-->/g, '{/* $1 */}');

    // Fix style="font-variation-settings: 'FILL' 1;"
    content = content.replace(/style="font-variation-settings: 'FILL' 1;"/g, "style={{fontVariationSettings: \\\"'FILL' 1\\\"}}");

    // Also fix any style="background-image: url(...)" in Landing
    content = content.replace(/style="background-image: url\\('([^']+)'\\);([^"]+)"/g, "style={{backgroundImage: \\\"url('\$1')\\\"}}");

    fs.writeFileSync(file, content);
    console.log(`Fixed JSX in ${file}`);
}

fixJsx('src/pages/Dashboard.tsx');
fixJsx('src/pages/Landing.tsx');
