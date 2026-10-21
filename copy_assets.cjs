const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'client', 'public', 'images', 'yathra');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(__dirname);
const map = {
  '5.17.46': 'munnar-villa-pool.jpg',
  '5.17.47 PM (1)': 'kodaikanal-estate-9bhk.jpg',
  '5.17.47 PM.jpeg': 'kuttikkanam-aframe-night.jpg',
  '5.17.48': 'kookal-wooden-cottage.jpg',
  '5.17.49': 'kookal-village-views.jpg',
  '5.17.50': 'instagram-grid-overview.jpg',
  '5.17.52': 'ooty-queen-hills.jpg',
  '5.17.53': 'kerala-festival-lights.jpg',
  '5.17.54': 'marayoor-jacaranda-valleys.jpg',
  '5.17.55': 'kanthalloor-treehouse.jpg',
  '5.17.56': 'kerala-waterfalls-treks.jpg'
};

for (const file of files) {
  if (!file.endsWith('.jpeg')) continue;
  for (const [key, dest] of Object.entries(map)) {
    if (file.includes(key)) {
      const srcPath = path.join(__dirname, file);
      const dstPath = path.join(targetDir, dest);
      fs.copyFileSync(srcPath, dstPath);
      console.log(`Copied ${file} -> ${dest}`);
      break;
    }
  }
}
console.log('Finished copying Yathra brand assets.');
