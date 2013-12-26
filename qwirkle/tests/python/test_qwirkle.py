import unittest
from qwirkle.qwirkle import Qwirkle

class TestQWirkleEmptyState(unittest.TestCase):
    def setUp(self):
        self.q = Qwirkle()

    def test_get_state_length(self):
        self.assertEqual(self.q.get_state_length(), 0)

    def test_get_state(self):
        num = 0
        for x, y, in self.q.get_state():
            num += 1
        self.assertEqual(num, 0)

class TestQuirkleInitialState(unittest.TestCase):
    def setUp(self):
        s = set([(1, 1), (2, 2), (3, 3)])
        self.q = Qwirkle(s)

    def test_get_state_length(self):
        self.assertEqual(self.q.get_state_length(), 3)

    def test_get_state(self):
        num = 0
        for x, y, in self.q.get_state():
            num += 1
        self.assertEqual(num, 3)
