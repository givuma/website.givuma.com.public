# Givuma and Givuma consulting


## Astro

Install dependencies for Astro

```bash
cd ./astro/givuma
npm install

cd ../astro/givumaconsulting
npm install
```

Update the google

## Firebase Functions

Install dependencies for Functions

```bash
cd ../../functions
npm install
```

Create a .env file and add

```env
MAILJETSENDER_KEY_PUBLIC=""
MAILJETSENDER_KEY_PRIVATE=""

RESEND_KEY=""

PUSHOVER_TOKEN = ""
PUSHOVER_USER = ""
```

## Deploy using Firebase Hosting and Functions

```bash
cd ..
sh deploy.sh  - Note you can deploy the website, or consulting or functions indipendently.
```
