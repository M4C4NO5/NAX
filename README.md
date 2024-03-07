# NAX
## Project for "Proyecto Integrador 1"
By: **Daniel Correa Botero, Daniel Felipe Arango Guarín, Miguel Ángel Cano Salinas**

## Get started

### Requirements
You need some dependencies installed in your PC to run this app. Be sure you have them.
- Python 3.11
- Node 21

### Install project dependencies
 *Note that both Django and React apps are in the same root folder, so don't run python commands in /NAX/ folder, nor npm commands in /nax-react/ folder!*

To setup the backend you need to install Django and some libraries, just run
```bash
cd NAX/
pip install -r requirements.txt
```
Now, let's setup the frontend, React is the responsible for that
```bash
cd nax-react/
npm install
```

### Run the application
You need to run both local servers for Backend API and Frontend interface, so, create two separate terminals, each one in the appropiate folder and run
```bash
cd NAX/
python manage.py runserver
```
```bash
cd nax-react/
npm start
```
