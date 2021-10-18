from adafruit_ble import BLERadio
import json


def discover_tokens():
    radio = BLERadio()
    tokens = set()
    for entry in radio.start_scan(timeout=3, minimum_rssi=-60):
        addr = entry.address
        if addr not in tokens and "Thing" in entry.complete_name:
            tokens.add(addr.string)

    return tokens


if __name__ == "__main__":
    tokens = discover_tokens()
    data = {}
    for token in tokens:
        data["uuid"] = token
    print(json.dumps(data))
