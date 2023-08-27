#-------- Givuma Consulting --------

echo "Givuma Consulting Website"
echo "Build Astro"
cd /root/website.givuma.com/astro/givumaconsulting
npm run build

echo "Update sitemap"
sed -i 's/com\/</com</g' ./build/sitemap-0.xml

echo "Minify"
node minify-html

echo "Deploy to Firebase"
cd /root/website.givuma.com
firebase deploy --only hosting:givumaconsulting

echo "Done"
