from pynfc import Nfc, Desfire, Timeout
class RfidPn532:     
	def __init__(self):
		self.n = Nfc("pn532_uart:/dev/ttyS0:115200")
	def read_uid(self):         
		for target in self.n.poll():  
			try:                               
				uid = target.uid                
				uid = uid.decode(encoding='UTF-8',errors='strict').upper() 
				return uid      
			except TimeoutException:                
				pass
if __name__ == "__main__":
	rf = RfidPn532()
	uid=rf.read_uid()
	print(uid)