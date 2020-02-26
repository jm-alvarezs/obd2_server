import matplotlib.pyplot as plt

def readFile(file):
    f = open(file, "r")
    s = f.readline()
    #array of coordinates
    data = list()
    x = list()
    y = list()
    #while not EOF
    while(s != ""):
        #get x and y as separate values
        datos = s.split(" ")
        x_coord = float(datos[0])
        y_coord = float(datos[1])
        #append to array of separate coordinates
        x.append(x_coord)
        y.append(y_coord)
        #coordinate [x,y]
        coord = list()
        #parse string to number and push to coordinate
        coord.append(x_coord)
        coord.append(y_coord)
        #add to dataset
        data.append(coord)
        #read next line
        s = f.readline() 
    return data, x, y

def main():
    data, x_training, y_training = readFile("datos.txt")