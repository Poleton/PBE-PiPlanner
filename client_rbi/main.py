import gi
gi.require_version('Gtk', '3.0')
import threading
import time
import I2C_LCD_driver
import random
import table
import servidor
import puzzle1



from gi.repository import GLib, Gtk, Gdk, GObject, GdkPixbuf


class CourseManager_Gtk(Gtk.Window):
    def __init__(self):
        #Inicialitzem la finestra i posem el títol
        self.win = Gtk.Window(title="Course_Manager.py",default_height=300, default_width=450)
        self.win.set_resizable(True)
        self.win.maximize()
        self.win.set_border_width(20)
        self.win.connect("destroy", Gtk.main_quit)
        self.win.set_gravity(Gdk.Gravity.NORTH_WEST)
        #Creacions
        self.lbl3 = Gtk.Label()
        self.user = ""

        #Creem un pixbuf
        pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale("Logo_PBE.png", 553, 178, False)
        #Creem la imatge
        self.icon = Gtk.Image()
        #Posem el pixbuf a la imatge
        self.icon.set_from_pixbuf(pixbuf)

        self.ini()
   
    def ini(self):
        #Creem una capsa on anirà el label
        self.box = Gtk.Box(orientation="vertical", spacing=2)
        self.win.add(self.box)

        #Label
        self.evbox = Gtk.EventBox()
        self.lbl1 = Gtk.Label(label = '<span foreground="white">Please, login with your university card</span>')
        myLCD.lcd_clear()
        myLCD.lcd_display_string("Please, login with" , 2, 1)
        myLCD.lcd_display_string("your university card", 3)
        self.lbl1.set_use_markup(True)
        self.lbl1.override_background_color(0, Gdk.RGBA(0,0,0.9,1))
        self.lbl1.set_yalign(0.5)
        self.lbl1.set_xalign(0.5)
        self.evbox.add(self.lbl1)
       
        self.box.pack_start(self.evbox, True, True, 0)


        #Print everything
        #self.appearMiddle(850, 700)
        time.sleep(0.15)
        self.win.show_all()
        print("SHOW BLUE")

        
        t = threading.Thread(target = self.rfid_gtk)
        t.daemon = True
        t.start()
        print("THREAD")

    
        
    def rfid_gtk(self):
        scan=puzzle1.RfidPn532()
        self.uid=scan.read_uid()
        print(self.uid)
        ser=servidor.serverCon(self.uid)
        self.user = ser.verificarUid(self.uid)
        login = threading.Thread(target=self.login_usr)
        login.daemon = True
        login.start()



    def login_usr(self):
        if self.user == "error404":
            self.lbl1.set_text('<span foreground="white">User not found, try again</span>')
            myLCD.lcd_clear()
            myLCD.lcd_display_string("User not" , 2, 6)
            myLCD.lcd_display_string("found, try again", 3,2)
            self.lbl1.set_use_markup(True)
            time.sleep(0.15)
            self.lbl1.override_background_color(0, Gdk.RGBA(0.9,0,0,1))
            time.sleep(1)
            self.ini()
        else:
            #Passar com a usr, el usuari rebut del servidor
            self.win.remove(self.box)
            seg = 0.15

            #Grid
            self.grid = Gtk.Grid()
            self.win.add(self.grid)
            
            usr = self.user
            myLCD.lcd_clear()
            myLCD.lcd_display_string("Welcome" , 2, 5)
            myLCD.lcd_display_string(usr, 3, 4)  

            #Label Creation
            self.lbl2 = Gtk.Label(label="Welcome " + '<span foreground="blue">' + usr + '</span>')
            self.lbl2.set_use_markup(True)
            self.lbl2.override_background_color(0, Gdk.RGBA(0,0,0,0))
            self.lbl2.set_yalign(0)
            self.lbl2.set_xalign(0)
            self.grid.set_column_spacing(200)
            self.grid.set_row_spacing(2)
            self.grid.attach(self.lbl2, 0,0,1,1)
            print("Label")

            #Button
            self.button = Gtk.Button.new_with_label(label = "Logout")
            self.button.connect("clicked", self.on_click_me_clicked)
            self.grid.attach(self.button, 2,0,1,1)
            print("Button")
            
            #Icon
            
            self.grid.attach(self.icon,0,1,3,1)
            print("Icon")
            

            #Entry
            self.entry = Gtk.Entry()
            self.entry.connect("activate", self.enterPressed)
            self.grid.attach(self.entry,0,2,3,1)
            print("Entry")
            time.sleep(seg)

        self.win.show_all()
        self.win.unmaximize()
        print("SHOW LOGGIN")

    def enterPressed(self, entry):
        txt = entry.get_text()
        entry.set_text("")
        #Ha d'enviar el text al servidor perque retorni el JSON adient
        self.lbl3.set_text('<span foreground="red">' + txt + '</span>')
        self.lbl3.set_use_markup(True)
        self.grid.attach(self.lbl3, 0,3,3,1)

        #Table
        self.view = table.createTable(self, txt)
        self.view.expand_all()
        self.grid.attach(self.view, 0,4,3,100)
        print("Table")

        time.sleep(0.15)
        self.win.show_all()
        print("SHOW")

    def appearMiddle(self, ww, wh):
        s = self.win.get_screen()
        m = s.get_monitor_at_window(s.get_active_window())
        monitor = s.get_monitor_geometry(m)
        self.win.move((monitor.width - ww)/2, (monitor.height - wh)/2)
    

    def on_click_me_clicked(self, button):
        self.win.remove(self.grid)
        time.sleep(0.15) #A vegades peta si no esta
        print("LOGGED OUT")
        self.ini()


#Execute the program
if __name__ == "__main__":
    myLCD = I2C_LCD_driver.lcd()
    CourseManager_Gtk()
    Gtk.main()
    
