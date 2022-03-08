
from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import pickle
import os

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['POST','GET'])
def hello():
    print("Hello world")
    return "hello"

@app.route('/processData',methods=['POST','GET'])
def index():
   jfile = request.get_json()
   dat = jfile['data']
   print(dat)
   file = open('C:/Users/momin/Downloads/'+dat+'.weba','rb')
   object_file = file.read()
   to_send = pickle.dumps(object_file)
   file.close()
   # verification
   # x = pickle.loads(to_send)
   # file = open('my_file.weba', 'wb')
   # file.write(x)
   # file.close()
   # deletion
   os.remove('C:/Users/momin/Downloads/'+dat+'.weba')

   ## take model output and send back
   print(to_send)
   
   return "hi"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')