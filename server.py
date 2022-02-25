#!/usr/bin/env python3
# encoding: utf-8
"""Use instead of `python3 -m http.server` when you need CORS"""

from http.server import HTTPServer, SimpleHTTPRequestHandler

import socket

UDP_IP = "192.168.2.114"
UDP_PORT = 9980
MESSAGE = b"Hello, World!"


sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler, self).end_headers()
    def do_POST(self):
        length = int(self.headers.get("Content-Length"))
        print("got request")
        contents = self.rfile.read(length)
        print("contents",contents)
        sock.sendto(contents, (UDP_IP, UDP_PORT))


httpd = HTTPServer(('0.0.0.0', 8003), CORSRequestHandler)
httpd.serve_forever()

