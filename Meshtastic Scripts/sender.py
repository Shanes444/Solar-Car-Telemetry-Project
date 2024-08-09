import meshtastic
import meshtastic.serial_interface
import time

def read_can_data():
    return "Something rnadom"

interface = meshtastic.serial_interface.SerialInterface(devPath='COM3')  # Update to the sender COM port

while True:
    can_data = read_can_data()
    interface.sendText(can_data)
    print(f"Sent: {can_data}")
    time.sleep(1)

interface.close()
