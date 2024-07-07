from flask import Flask
app = Flask(__name__)

@app.route("/api/pythonapi")
def hello_world():
    print("Hello world")
    return "<p>Hello, World!</p>"