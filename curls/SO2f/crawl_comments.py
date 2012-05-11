

def crawl(comment):
    d = {}
    try:
        d['id'] = comment.id
        d['parent_id'] = comment.parent_id
        d['body'] = comment.body

        # if statements are used because of 'deleted' comments.. :(

        if comment and comment.name:
            d['name'] = comment.name or '[deleted]'
        if comment and comment.author and comment.author.name:
            d['author'] = comment.author.name or '[deleted]'
    except Exception, e:
        print str(e)

    d['replies'] = []

    for child in comment.replies:
        d['replies'].append(crawl(child))

    return d
