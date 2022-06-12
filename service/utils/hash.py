import zlib
from base64 import urlsafe_b64encode as b64e, urlsafe_b64decode as b64d

def create_hash(obj):
  base_hash = ''
  for _, value in obj.items():
    base_hash += str(value)
  data = str.encode(base_hash)
  return b64e(zlib.compress(data, 9)).decode("utf-8")