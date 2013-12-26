from tornado import web, ioloop, websocket
import os
import json

class HomeHandler(web.RequestHandler):
    def get(self):
        self.render('home.html')

class QwirkleHandler(websocket.WebSocketHandler):
    connections = set()
    state = set()

    def open(self):
        print('Websocket opened. Connections: %d' % (len(self.connections) + 1))
        self.connections.add(self)

    def on_message(self, message):
        print('Received: %s' % message)

        data = json.loads(message)
        print(data)

        if data['action'] == 'init':
            print('Initializing connection: %s' % self)
            for click_x, click_y in self.state:
                self.write_message(json.dumps({
                    'action': 'fill',
                    'fill': {
                        'click_x': click_x,
                        'click_y': click_y,
                    },
                }))

        if data['action'] == 'fill':
            print('Processing click: %s' % self)
            click = (data['fill']['click_x'], data['fill']['click_y'])
            if click not in self.state: self.state.add(click)

        if data['action'] == 'clear':
            print('Processing clear...')
            self.state.clear()

        for c in self.connections:
            if c != self: c.write_message(message)

    def on_close(self):
        self.connections.remove(self)
        print('Websocket closed. Connections: %d' % (len(self.connections) + 1))


settings = {
    'template_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates"),
    'static_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "static"),
    'login_url': '/login',
}

application = web.Application([
    (r'/', HomeHandler),
    (r'/ws', QwirkleHandler),
], **settings)

if __name__ == '__main__':
    port = os.environ['QWIRKLE_PORT']
    if port == '': port = 8000
    application.listen(port)
    ioloop.IOLoop.instance().start()
