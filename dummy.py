from flask import Flask
app = Flask(__name__)


@app.route('/<url>')
def dummyFunction(url) :
	print "Hello"
	# Read data from data.csv
	file = open("data.csv","r")
	return file.read()


if __name__ == '__main__':
   app.run(debug = True)