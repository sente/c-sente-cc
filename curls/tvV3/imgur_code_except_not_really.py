import random
import urllib2
import time
import itertools


# no longer used... because 
chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345670"
code = "".join(random.sample(chars,5))
randomChars = lambda :"".join(random.sample(chars,5))



def testimgur(code):
    try:
        urllib2.urlopen("https://imgur.com/%s"%code)
        return True
    except:
        return False


class ImgurIterator(object):


    digits = 5
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345670"
    sequence = None
    counter = 0


    def __init__(self):
        self.sequence = itertools.combinations(self.alphabet, self.digits) 

    def get_next(self):
        self.counter += 1
        digits = self.sequence.next()
        return ''.join(digits)




imgururl = ImgurIterator()







res = {}
times = {}

def doitall(n):


    for i in range(n):
        code = imgururl.get_next()

        #code=randomChars()

        before = time.time()
        res[code] = testimgur(code)
        after = time.time()

        truecount = len(filter(lambda x: x is True, res.values()))
        falsecount = len(filter(lambda x: x is not True, res.values()))
        perc = 100.0 * float(float(truecount) / (len(res)))
        times[code] = after - before

        print "%d\t%s\t%1.5f\t%d\t%d\t%1.5f" % (i,code,times[code],truecount,falsecount,perc)
        #print i, code, '%1.5f' % times[code], res[code]



def main():

    doitall(10000)

    truecount = len(filter(lambda x: x is True, res.values()))
    print truecount



if __name__ == "__main__":
    main()
