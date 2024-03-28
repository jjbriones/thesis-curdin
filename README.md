## Getting Started

First, create virtual environment and install dependencies using requirements.txt:

- VS Code: https://code.visualstudio.com/docs/python/environments
- PyCharm: https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html

Macbook:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Windows:
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Then, run the flask server in server.py in api folder:
```bash
cd api
python server.py
```

Then, run the development server:

```bash
npm install
npm run next-dev
# or
yarn next-dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



