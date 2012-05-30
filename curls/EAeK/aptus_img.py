#!/usr/bin/python

import cgi
import time
import sys
import subprocess
import os

fs = cgi.FieldStorage()

center = (-.60000000, 0.0)
diam = (3.0, 3,0)

def runcmd(str):
    s=subprocess.Popen(str,shell=True,stderr=subprocess.PIPE,stdout=subprocess.PIPE)
    sout,serr=s.communicate()
    s.wait()
    return sout,serr



def cmd(center,diam,filename):
    template = "aptuscmd.py -o /var/www/sente/htdocs/tmp-aptus/%s -s 800x800 --center=%10.10f,%10.10f --diam=%10.10f,%10.10f" % (filename,center[0],center[1],diam[0],diam[1])
    return runcmd(template)



def main():

    try:
        x = float(fs['x'].value)
    except:
        x=-.6000
    try:
        y = float(fs['y'].value)
    except:
        y = 0
    try:
        diam = float(fs['diam'].value)
    except:
        diam = 3.0



    f = int(time.time())
    filename = "%d_town.png" %f

    a,b = cmd((x,y),(diam,diam),filename)


    png = open('/var/www/sente/htdocs/tmp-aptus/' + filename, 'rb')

    print "Content-type: image/png"
    print
    print png.read()

main()


