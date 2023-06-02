# hier login und logout

from flask import Flask, request, render_template
from project.server.config import database
 
# initialize flask function
app = Flask(__name__)
 
 
# Make hello_world function
@app.route('/')
def hello_world():
    return render_template("login.html")

 
# Make another function for login and we are
# making if and else condition for some
# situation like during wrong password wrong
# user and also for successful login
 
@app.route('/form_login', methods=['POST', 'GET'])
def login():
    name1 = request.form['username']
    pwd = request.form['password']
    if name1 not in database:
        return render_template('login.html',
                               info='Invalid User ????!')
    else:
        if database[name1] != pwd:
            return render_template('login.html',
                                   info='Invalid Password ????!')
        else:
            return render_template('home.html',
                                   name=name1)
 
 
 # Run flask in debug mode
if __name__ == '__main__':
    app.run()


# hier werden daten aufgerufen 
# public_data werden ausgefiltert und zu web_server gegeben
# wenn angemeldet schmeiß allen daten zur Anwendung