import socket
import codecs


class Communicator:
    def __init__(self):
        # self.host = '24.166.74.182'
        self.host = '192.168.1.115'
        self.port = 8899
        self.socket = None

    def send_position(self, position):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((self.host, self.port))
        # send_data = ("\xAA\x55\x01\x{}".format(hex(position).replace('0x', ''))).encode()
        send_data = b'\xAA\x55\x01\x45'
        # print(send_data)
        self.socket.send(send_data)
        recv_data = self.socket.recv(4)

        print(recv_data.hex())
        return recv_data.hex()

    def moving(self):
        recv_data = self.socket.recv(4)
        print(recv_data.hex())
        self.socket.close()
        return recv_data.hex()



