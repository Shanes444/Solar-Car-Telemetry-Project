import time
import random
import meshtastic
import meshtastic.serial_interface
import logging

logging.basicConfig(level=logging.INFO)

def generate_telemetry_data():
    # Simulate telemetry data
    data = {
        'speed': random.randint(0, 120),  # Speed in km/h
        'battery_voltage': round(random.uniform(300.0, 400.0), 2),  # Voltage in volts
        'solar_power': round(random.uniform(0.0, 5.0), 2)  # Power in kW
    }
    return data

def send_telemetry_data(interface):
    while True:
        telemetry_data = generate_telemetry_data()
        data_str = f"Speed: {telemetry_data['speed']} km/h, Voltage: {telemetry_data['battery_voltage']} V, Solar Power: {telemetry_data['solar_power']} kW"
        interface.sendText(data_str)
        print(f"Sent: {data_str}")
        time.sleep(5)  # Send data every 5 seconds

try:
    interface = meshtastic.serial_interface.SerialInterface(devPath='COM3')  # Update with your Meshtastic COM port
    print("Connected to Meshtastic device.")
    send_telemetry_data(interface)
except meshtastic.mesh_interface.MeshInterface.MeshInterfaceError as e:
    print(f"Error: {e}")
except KeyboardInterrupt:
    print("Exiting...")
finally:
    interface.close()
