from adafruit_ble import BLERadio
import json


def discover_tokens():
    radio = BLERadio()
    tokens = set()
    for entry in radio.start_scan(timeout=2, minimum_rssi=-80):
        addr = entry.address
        name = entry.complete_name
        if addr not in tokens and name != None and "Thing" in name:
            tokens.add(addr.string)

    return tokens


if __name__ == "__main__":
    tokens = discover_tokens()
    data = []
    for token in tokens:
        data.append({"uuid": token.lower()})
    print(json.dumps(data), end="")
