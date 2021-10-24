from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.gmsservice import GMS
import platform
import json


def connect_token(entry, radio):
    if GMS in entry.services:
        GMS_connection = radio.connect(entry)
        if GMS_connection and GMS_connection.connected:
            response = GMS_connection[GMS].readline().decode("utf-8")
    GMS_connection.disconnect()
    return response

def discover_tokens():
    radio = BLERadio()
    tokens = set()
    for entry in radio.start_scan(ProvideServicesAdvertisement, timeout=2, minimum_rssi=-80):
        addr = entry.address
        name = entry.complete_name
        if addr not in tokens and name != None and "IFS4205" in name:
            if platform.system() == 'Darwin':
                addr = connect_token(entry, radio)
                tokens.add(addr)
            else:
                tokens.add(addr.string)

    return tokens


if __name__ == "__main__":
    tokens = discover_tokens()
    data = []
    for token in tokens:
        data.append({"uuid": token.lower()})
    print(json.dumps(data), end="")
