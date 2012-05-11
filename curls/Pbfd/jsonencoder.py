class CommentJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, reddit.objects.Comment):
            mydict = {}
            mydict['id'] = obj.id
            mydict['permalink'] = obj.permalink
            mydict['replies'] = obj.replies
            return mydict
        return json.JSONEncoder.default(self, obj)

