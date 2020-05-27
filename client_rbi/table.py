
from gi.repository import Gtk
from gi.repository import Pango
import sys
import servidor



#columns = ["DATE",
#          "SUBJECT",
#           "NAME"]

#rows = [["2018-08-04", "PBE", "Practica1"],
#             ["2018-03-03", "DSBM", "Practica1"],
#             ["2018-04-10", "AST", "Entregable1"],
#             ["2018-01-20", "RP", "Entregable 3"],
#             ["2018-11-30", "ICOM", "Exercicis Tema2"],
#             ["2018-4-30", "PSAVC", "Entregable1"]]

def createTable(self, txt):
    ser = servidor.serverCon(txt)
    columns = ser.getTitles()
    rows = ser.getData()


    # the data in the model (three strings for each row, one for each
    # column)
    if len(columns) == 4:
        listmodel = Gtk.ListStore(str, str, str, str)
    else:
        listmodel = Gtk.ListStore(str, str, str)
    # append the values in the model
    for i in range(len(rows)):
        listmodel.append(rows[i])

    # a treeview to see the data stored in the model
    view = Gtk.TreeView(model=listmodel)
    # for each column
    for i, column in enumerate(columns):
        # cellrenderer to render the text
        cell = Gtk.CellRendererText()
        # the column is created
        col = Gtk.TreeViewColumn(column, cell, text=i)
        col.set_expand(True)
        # and it is appended to the treeview
        view.append_column(col)
    
    return view



  
