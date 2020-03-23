import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

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
        datos = s.split(",")
        x_coord = datos[3]
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
    colors = ['blue', 'red', 'green']
    cmdIDs = ["ENGINE_RPM", "FUEL_CONSUMPTION_RATE", "FUEL_LEVEL"]
    for i in range(len(cmdIDs)):
        cmdID = cmdIDs[i]
        data, x, y = readFile(cmdID+".txt")    
        plt.scatter(x, y, color=colors[i])
        line_patch = mpatches.Patch(color=colors[i], label=cmdID)
        plt.legend(handles=[line_patch])
        plt.title(cmdID)
    plt.show()

main()