def walk(point, seen={}):
    if point not in seen:
        seen.add(point)
        for n in point.neighbors():
            if n.occupied():
                walk(n, seen)
    return seen

