import csv
import sys

def convert(inputFile, outputFile):
	out_txt = csv.writer(open(outputFile, "wb"))
	for line in inputFile:
		out_txt.writerow(line.split())

input = open(sys.argv[1])
output = sys.argv[2]
convert(input, output)
