import json
import sys

def convert(inputFile,outputFile):
	header = inputFile.readline().split()
	#jenc = json.JSONEncoder()
	jList = []
	for line in inputFile:
		contents = line.split()
		jsonDict = {}
		for i in range(0,len(header)):
			jsonDict[header[i]] = contents[i]
		jList.append(jsonDict)
		#w.write(jenc.encode(jsonDict))
	
	with open(outputFile, 'w') as w:
		w.write(json.dumps(jList))		
	w.close()

input = open(sys.argv[1])
output = sys.argv[2]
convert(input, output)
