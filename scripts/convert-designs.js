import fs from 'fs';
import path from 'path';

function convertHtmlToReact(htmlPath, componentName, themeClass) {
    let ht = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract everything between <body> and </body>
    const bodyMatch = ht.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    let bodyCode = bodyMatch ? bodyMatch[1] : ht;

    // Convert class to className
    bodyCode = bodyCode.replace(/class=/g, 'className=');

    // Self-close single tags
    bodyCode = bodyCode.replace(/<img(.*?)(\/?)>/g, (match, attrs, selfclosed) => {
        if(selfclosed) return match;
        const cleaned = attrs.trim();
        return `<img ${cleaned} />`;
    });
    bodyCode = bodyCode.replace(/<input(.*?)(\/?)>/g, (match, attrs, selfclosed) => {
        if(selfclosed) return match;
        const cleaned = attrs.trim();
        return `<input ${cleaned} />`;
    });
    // Remove unsupported SVG attributes
    bodyCode = bodyCode.replace(/stroke-dasharray/g, 'strokeDasharray');
    bodyCode = bodyCode.replace(/stroke-dashoffset/g, 'strokeDashoffset');
    bodyCode = bodyCode.replace(/stroke-width/g, 'strokeWidth');

    // Extract tailwind config script and convert JSON colors to CSS vars
    const jsMatch = ht.match(/tailwind\.config[^=]*=\s*({[\s\S]*?})\s*<\/script>/i);
    let cssVars = '';
    if (jsMatch) {
       try {
         // evaluate JSON config to JS object loosely to avoid strict parsing
         const colorMatch = ht.match(/"colors":\s*({[^}]*})/);
         if (colorMatch) {
            const colorsObj = JSON.parse(colorMatch[1]);
            for(const [key, value] of Object.entries(colorsObj)) {
                // To support extended tailwind naming
                cssVars += `  --color-${key}: ${value};\n`;
            }
         }
       } catch (e) {
           console.error("Error extracting colors", e);
       }
    }
    
    const styleMatch = ht.match(/<style>([\s\S]*?)<\/style>/i);
    const internalStyles = styleMatch ? styleMatch[1].replace(/\\/g, '\\\\') : '';

    const finalCode = `import React from 'react';

const ${componentName} = () => {
    return (
        <div className="${themeClass}">
            <style>{\`
               .${themeClass} {
${cssVars}
               }
${internalStyles}
            \`}</style>
            <div className="min-h-screen bg-background font-body text-on-surface">
                ${bodyCode}
            </div>
        </div>
    );
};

export default ${componentName};
`;

    fs.writeFileSync(path.join(process.cwd(), 'src', 'pages', componentName + '.tsx'), finalCode);
    console.log(`Generated ${componentName}.tsx`);
}

convertHtmlToReact('.stitch/designs/landing.html', 'Landing', 'theme-landing');
convertHtmlToReact('.stitch/designs/dashboard.html', 'Dashboard', 'theme-dashboard');
