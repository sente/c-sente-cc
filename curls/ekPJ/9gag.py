import urllib
import json


def doit(id,filepath):
    o=[]
    jstxt = urllib.urlopen("http://9gag.com/new/json?list=hot&id=%s" %id ).read()
    js=json.loads(jstxt)

    for e,k in js['items'].items():
        o.append(k)



    open(filepath,'w').write('\n'.join(o))

    id = js['ids'][-1]
    return id



id="5136066"
for i in range(10):
    print i
    id = doit(id,'%d.html' %i)

