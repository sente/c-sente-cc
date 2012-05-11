import reddit
import time
import json
import sys

page = 'http://www.reddit.com/r/AskReddit/comments/tel1c/if_i_were_to_see_a_nuclear_mushroom_cloud_in_the/'
r = reddit.Reddit(user_agent='testing for stu town')
submission = r.get_submission(page)



data = submission.to_dict(include_comments=False)
json.dump(data, open('a.json','w'), indent=4)

data = submission.to_dict(include_comments=True)
json.dump(data, open('b.json','w'), indent=4)



data = submission.comments[0].to_dict(include_replies=False)
json.dump(data, open('c.json','w'), indent=4)

data = submission.comments[0].to_dict(include_replies=True)
json.dump(data, open('d.json','w'), indent=4)




data = submission.comments[-1].to_dict(include_replies=False)
json.dump(data, open('e.json','w'), indent=4)

data = submission.comments[-1].to_dict(include_replies=True)
json.dump(data, open('f.json','w'), indent=4)


# http://c.sente.cc/6oAB/a.json
# http://c.sente.cc/6oAB/b.json
# http://c.sente.cc/6oAB/c.json
# http://c.sente.cc/6oAB/d.json
# http://c.sente.cc/6oAB/e.json
# http://c.sente.cc/6oAB/f.json




