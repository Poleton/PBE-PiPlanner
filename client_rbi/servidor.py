import requests
import json


class serverCon():
    
    #Constructor
    def __init__(self, field):
        self.url = "http://88.17.210.25/" + field
        print(self.url)
        self.req = requests.get(self.url)

    #Get the title of the table
    def getTitles(self):
        data = self.req.json()
        row = []
        for x in data[0]:
            row.append(str(x)) 
        return row
    
    #Get the data 
    def getData(self):
        data = self.req.json()
        matrix = []
        for x in data:
            temp = []
            for field in x:
                temp.append(str(x[field]))
            matrix.append(temp)
        return matrix

    #verificar UID
    def verificarUid(self, uidd):
        error = "error404"
        URLstudents = "http://88.17.210.25/check?id=" + uidd
        rs = requests.get(URLstudents)
        dataStudents=rs.json()
        if dataStudents['valid'] == 1:
            name = dataStudents['name']
            return name
        else: 
            return error





