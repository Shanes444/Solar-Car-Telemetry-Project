import time
import meshtastic
import meshtastic.serial_interface
import pubsub
import logging

logging.basicConfig(level=logging.INFO)

def on_receive(packet, interface):
    try:
        if 'payload' in packet['decoded'] and isinstance(packet['decoded']['payload'], bytes):
            payload_text = packet['decoded']['payload'].decode('utf-8')
            print(f"Received: {payload_text}")
    except UnicodeDecodeError as e:
        pass

try:
    interface = meshtastic.serial_interface.SerialInterface(devPath='COM6')  # Update with your Meshtastic COM port
    print("Connected to Meshtastic device.")
    pubsub.pub.subscribe(on_receive, "meshtastic.receive")

    while True:
        time.sleep(1)  # Keep the script running
except meshtastic.mesh_interface.MeshInterface.MeshInterfaceError as e:
    print(f"Error: {e}")
except KeyboardInterrupt:
    print("Exiting...")
finally:
    interface.close()
