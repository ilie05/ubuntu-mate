import socket
import codecs


def get_last_byte(byte):
    data = byte.hex()[-2:]
    return int(data, 16)


class Communicator:
    def __init__(self):
        # self.host = '24.166.74.182'
        self.host = '192.168.1.121'
        self.port = 8899
        self.socket = None

    def send_position(self, valve_pos):
        valve_pos = int(valve_pos)
        if not (0 <= valve_pos <= 100):
            return None

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.host, self.port))
        send_data = b'\xAA\x55\x01%b' % (chr(valve_pos)).encode()
        print(send_data.hex())
        self.socket.send(send_data)
        recv_data = self.socket.recv(4)

        data = recv_data.hex()
        print(data)
        if data == '31313131':
            self.socket.close()
            raise ValueError('31313131 Error received from TCP server')
        return data

    def moving(self):
        recv_data = self.socket.recv(4)
        data = get_last_byte(recv_data)
        self.socket.close()
        return data

    def current_position(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.host, self.port))
        send_data = b'\xAA\x55\x05\x00'
        self.socket.send(send_data)
        recv_data = self.socket.recv(4)

        data = get_last_byte(recv_data)
        self.socket.close()
        return data

    def battery_pos(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.host, self.port))
        send_data = b'\xAA\x55\x03\x00'
        self.socket.send(send_data)
        recv_data = self.socket.recv(4)

        data = get_last_byte(recv_data)
        self.socket.close()
        return data / 10
