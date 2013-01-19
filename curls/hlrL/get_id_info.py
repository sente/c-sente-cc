import pymongo
import sys
import json
import pymongo
import datetime

import list_friends_and_followers as listfuncs


conn=pymongo.Connection('127.0.0.1',60000)

CONSUMER_KEY="P5EQw6tOsCQGpKrEhdSAiw"
CONSUMER_SECRET="YKwDNFMMoHZMSNymePDK9Y5t1gU3c8AfudL3NXA3UA"

for line in open('ids.txt','r'):
    tups = line.strip().split(' ')
    token = tups[0]
    secret = tups[1]
    network_id = tups[2]
    print '%s %s %s %s %s' % (network_id, CONSUMER_KEY, CONSUMER_SECRET, token, secret)


for line in open('ids.txt','r'):
    tups = line.strip().split(' ')
    token = tups[0]
    secret = tups[1]
    network_id = tups[2]

    print '%s %s %s %s %s' % (network_id, CONSUMER_KEY, CONSUMER_SECRET, token, secret)

    js = listfuncs.main(network_id, CONSUMER_KEY, CONSUMER_SECRET, token, secret)

    obj = json.loads(js)

    print obj

    db = conn.profiles
    print 'isnerting..'
    db.twitter.insert(obj)
    print 'inserted'



#

#dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime) else None
#db = a.lamba
#obj
#api.get_user('vincefairfax').id_str
#obj['network_id']=235199233

#import pymongo
#a=pymongo.Connection('127.0.0.1',60000)
##
#a.profiles
#a.profiles.a=pymongo.Connection('127.0.0.1',60000)
#
