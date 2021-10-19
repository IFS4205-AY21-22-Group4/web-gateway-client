from adafruit_ble import BLERadio
import re
import json

radio = BLERadio()

def extract_address(address):
    try:
        add = re.search('\"(.+?)\"', str(address)).group(1)
    except AttributeError:
        add = ''
    return add  

def scan(found):
    for entry in radio.start_scan(timeout=3, minimum_rssi=-80):
        addr = entry.address
        address = extract_address(addr)
        name = str(entry.complete_name)
        if (address, name) not in found:
            if "IFS4205" in name:
                found.add((address, name))

def outputList(found):
    tokens = []
    for token in found:
        data = {}
        data["name"] = token[1]
        tokens.insert(0, data)
    print(json.dumps(tokens))

if __name__ == "__main__":
    found = set()
    scan(found)
    outputList(found)
