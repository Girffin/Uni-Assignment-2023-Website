
from flask import Flask
from flask import render_template, redirect, url_for, request, flash, jsonify,json, session
import csv
from werkzeug.utils import secure_filename
from datetime import datetime



def create_app():
    app = Flask(__name__)
    #configure of your application
    #(1) secret Key
    app.config['SECRET_KEY'] = 'iynAz81tKWKmWBmifjph'
    #(2) database URL
    app.config['SQLALCHEMY_DATABASE_URL'] = 'sqlite///db.sqlite'

    return app    


import pymongo


#connect to the default local server database
connection = pymongo.MongoClient('mongodb://localhost:27017')
db = connection['TMAQ2']     
       

app = create_app()

#route to the relevant webpage
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=["GET","POST"])
def register():
    if request.method=="GET":
        return render_template('register.html')
    elif request.method =="POST":
        session['email'] = request.form.get('email')
        password = request.form.get('password')
        NRIC = request.form.get('NRIC')  
        return redirect(url_for('index'))



@app.route('/index', methods=['GET','POST'])
def login():
    if request.method=='GET':
        return render_template('index.html')
    elif request.method =='POST':
        session['email'] = request.form.get('email')
        password = request.form.get('password')
        if session['email'] == '':
            return redirect(url_for('index'))

        return redirect(url_for('catalog'))    


@app.route('/catalog',methods=['GET','POST'])
def catalog():
    if request.method=='GET':
        return render_template('catalog.html', ready=session.keys())
    elif request.method =='POST':
        data = {}
        data['when'] = datetime.strptime(request.form.get('when'), '%Y-%m-%d')
        data['who'] = request.form.get('who')
        data['comment'] = request.form.get('comment')
        data['about'] = request.form.get('about')
        data['media'] = request.form.get('media')
        data['what'] = request.form.get('what')
        data['whom'] = request.form.get('whom')
        data['ref'] = request.form.get('ref')
        db.appUser.insert_one(data)
        find = db.appUser.find({ "$expr": { "$eq": [{ "$year": "$when" }, data['when'].year] } })
        count = 0
        for i in find:  #counts each year occurence in mongodb
            count +=1
        print(count) 
        return jsonify({'when': data['when'], 'who': data['who'], 'comment': data['comment'], 'about':data['about'], 'media':data['media'],'what':data['what'],'whom':data['whom'],'ref':data['ref']})
        
        # db2.insert_one({'when': when, 'who': who, 'comment': comment, 'about':about, 'media':media,'what': what,'whom':whom,'ref':ref})

@app.route('/upload', methods=['GET','POST'])
def upload():
    if request.method=='GET':
        return render_template('upload.html',  ready=session.keys())
    elif request.method =='POST':
        file = request.files['file']
        file.save(secure_filename(file.filename))
        with open(file.filename, 'r', encoding="utf8") as csvfile:
            header = [ "when", "who", "comment", "about", "media", "what", "whom", "ref"]
            reader = csv.reader(csvfile)
            for row in reader:
                upload={}
                for n in range(0,len(header)):
                    upload[header[n]] = row[n]

                db.appUser.insert(upload)
        return render_template('upload.html', ready=session.keys())



@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', ready=session.keys())

@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect(url_for('login'))       #redirect to the main page



if __name__ == "__main__":
    app.run(debug=True, port=8000)