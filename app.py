from pymongo import Connection
from flask import Flask
from flask import render_template
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'solarisstats'
COLLECTION_NAME = 'mpstat2'

FIELDS = {'CPU':True,'xcal':True,'intr':True,'ithr':True,'csw':True,'icsw':True, 'time':True, '_id': False}

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/solarisstats/mpstat2")
def solarisstats():
	connection = Connection(MONGODB_HOST, MONGODB_PORT)
	collection = connection[DBS_NAME][COLLECTION_NAME]
	mpstat = collection.find(fields=FIELDS)

	json_stats = []
	for stat in mpstat:
		json_stats.append(stat)
	json_stats = json.dumps(json_stats, default=json_util.default)
	connection.disconnect()
	return json_stats

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000, debug=True)
