from enum import IntEnum

class DeviceId(IntEnum):
    GPU0 = 0,
    GPU1 = 1,
    GPU2 = 2,
    GPU3 = 3,
    GPU4 = 4,
    GPU5 = 5,
    GPU6 = 6,
    GPU7 = 7,
    CPU = 99
    
    def __str__(self):
        return self.name.lower()

    def __repr__(self):
        return str(self)

    @staticmethod
    def argparse(s):
        try:
            return DeviceId[s.upper()]
        except KeyError:
            return s
