import sys
import os

here = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, here)

from cons import create_app

application = create_app('cons')
