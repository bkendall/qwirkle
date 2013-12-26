
class Qwirkle(object):
    state = set()

    def __init__(self, init_state=set()):
        self.state = init_state

    def get_state_length(self):
        return len(self.state)

    def get_state(self):
        for x, y in self.state:
            yield (x, y)
