import time
import random
import meshtastic
import meshtastic.serial_interface
from datetime import datetime

# Initialize Meshtastic interface
interface = meshtastic.serial_interface.SerialInterface(devPath='COM3')  # Update with your Meshtastic COM port

# Initial telemetry data
current_speed = random.randint(0, 120)
current_battery_voltage = round(random.uniform(300.0, 400.0), 2)
current_solar_power = round(random.uniform(0.0, 5.0), 2)
current_temperature = round(random.uniform(-10.0, 40.0), 2)

def generate_telemetry_data():
    global current_speed, current_battery_voltage, current_solar_power, current_temperature

    # Simulate gradual changes in telemetry data
    current_speed += random.randint(-20, 20)
    current_speed = max(0, min(120, current_speed))  # Ensure speed stays within 0-120 km/h
    current_speed = round(current_speed, 2)

    current_battery_voltage += round(random.uniform(-5.0, 5.0), 2)
    current_battery_voltage = max(300.0, min(400.0, current_battery_voltage))  # Ensure voltage stays within 300-400 V
    current_battery_voltage = round(current_battery_voltage, 2)

    current_solar_power += round(random.uniform(-1.0, 1.0), 2)
    current_solar_power = max(0.0, min(5.0, current_solar_power))  # Ensure power stays within 0-5 kW
    current_solar_power = round(current_solar_power, 2)

    current_temperature += round(random.uniform(-2.0, 2.0), 2)
    current_temperature = max(-10.0, min(40.0, current_temperature))  # Ensure temperature stays within -10 to 40 °C
    current_temperature = round(current_temperature,2)

    # Add timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    data = {
        'speed': current_speed,
        'battery_voltage': current_battery_voltage,
        'solar_power': current_solar_power,
        'temperature': current_temperature,
        'timestamp': timestamp
    }
    return data

while True:
    telemetry_data = generate_telemetry_data()
    data_str = f"Speed: {telemetry_data['speed']} km/h, Voltage: {telemetry_data[ 'battery_voltage']} V, Solar Power: {telemetry_data['solar_power']} kW, Temperature: {telemetry_data['temperature']} °C, Timestamp: {telemetry_data['timestamp']}"
    
    # Send telemetry data over Meshtastic
    interface.sendText(data_str)
    print(f"Sent: {data_str}")
    
    time.sleep(1)  # Adjust as necessary

interface.close()
