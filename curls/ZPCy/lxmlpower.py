import lxml.html
reddit = lxml.html.parse('http://www.reddit.com').getroot()
reddit.make_links_absolute()
imgs = reddit.xpath('//a/img')
for link,thumbnail in [(x.getparent().attrib['href'], x.attrib['src']) for x in imgs]:
    print "<a href=\"%s\"><img src=\"%s\"></a><br><hr>" %(link,thumbnail)




#created:  http://c.sente.cc/Njl9/lxmlpower.html
