import time
import meshtastic
import meshtastic.serial_interface
from pubsub import pub

# Function to handle received messages
def onReceive(packet, interface):
    try:
        decoded = packet['decoded']
        text = decoded['text']
        print(f"Received: {text}")
    except KeyError as e:
        print(f"KeyError: {e}")
        print(f"Packet: {packet}")

# Subscribe to receive messages
pub.subscribe(onReceive, "meshtastic.receive")

# Initialize Meshtastic interface
try:
    interface = meshtastic.serial_interface.SerialInterface(devPath='COM6')  # Update to the correct COM port
except meshtastic.serial_interface.SerialException as e:
    print(f"Error: {e}")
    exit(1)

# Keep the script running
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    pass

interface.close()
