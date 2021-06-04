import zlib
from base64 import urlsafe_b64encode as b64e, urlsafe_b64decode as b64d

def criarHash(obj):
  baseHash = ''
  for key, value in obj.items():
    baseHash += str(value)
  data = str.encode(baseHash)
  return b64e(zlib.compress(data, 9)).decode("utf-8")