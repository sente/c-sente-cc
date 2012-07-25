def runcmd(str):
    s=subprocess.Popen(str,shell=True,stderr=subprocess.PIPE,stdout=subprocess.PIPE)
    sout,serr=s.communicate()
    s.wait()
    return sout,serr

