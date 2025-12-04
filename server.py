import http.server
import socketserver

PORT = 5000
HOST = "0.0.0.0"

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

class ReuseAddrServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReuseAddrServer((HOST, PORT), NoCacheHandler) as httpd:
    print(f"Serving at http://{HOST}:{PORT}")
    httpd.serve_forever()
