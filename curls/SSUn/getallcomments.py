import reddit
import time
import sys

username,password = open('username.dat').read().strip().split('\n')


r = reddit.Reddit(user_agent='testing for stu town')
r.login(username, password)


r.config.more_comments_max = -1

page = sys.argv[1]
print 'getting submission'
submission = r.get_submission(page)
print 'got submission'

comments = []
allcomments = []
for i,c in enumerate(submission.all_comments):
    timestamp = time.time()
    print i,timestamp

    allcomments.append(c)
    comments.append([i,timestamp, c])

