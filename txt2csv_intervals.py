import re
import csv
import sys
import datetime

def convert(inputFile, outputFile):
	out_txt = csv.writer(open(outputFile, "wb"))
	
	firstLine = True
	headerLine = False
	timeStamp = None
	for line in inputFile:
		line = line.strip()
		if headerLine:
			if firstLine:
   				out_txt.writerow(line.split()+['time'])
   			firstLine = False
   			headerLine = False
   			continue
   			
		try:
			timeStamp = datetime.datetime.strptime(line, "%A, %B %j, %Y %H:%M:%S %p %Z").time().strftime('%H:%M:%S')
			headerLine = True
		except:
			out_txt.writerow(line.split()+[timeStamp])
			continue			

input = open(sys.argv[1], "r")
output = sys.argv[2]
convert(input, output)

