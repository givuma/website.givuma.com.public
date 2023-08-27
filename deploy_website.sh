#-------- Givuma Website --------

echo "Givuma Website"
echo "Build Astro"
cd /root/website.givuma.com/astro/givuma
npm run build

echo "Update sitemap"
sed -i 's/com\/</com</g' ./build/sitemap-0.xml

echo "Minify"
node minify-html

echo "Deploy to Firebase"
cd /root/website.givuma.com
firebase deploy --only hosting:givuma

echo "Done"
