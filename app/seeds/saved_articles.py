from app.models import db, SavedArticle


# Adds a demo articles, you can add other articles here if you want
def seed_saved_articles():
    article1 = SavedArticle(
        userId=1, url='https://news.yahoo.com/thursday-morning-uk-news-briefing-012353159.html', urlToImage='https://s.yimg.com/uu/api/res/1.2/q1MSB9hCEJVvknN9bYSb6g--~B/aD03NTA7dz0xMjAwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/the_telegraph_258/e075f42a9cf43176da5017e6a811b4fd')
    article2 = SavedArticle(
        userId=1, url='https://www.theglobeandmail.com/world/article-northrop-to-build-homes-for-astronauts-in-moon-orbit-after-landing-935/', urlToImage='https://www.theglobeandmail.com/resizer/4GKzYrtDgkmcZuRM9GRoAFtjldQ=/1200x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/ZQJYPFFVJBJRHGDL6B7AVAQW2E.JPG')
    article3 = SavedArticle(
        userId=1, url='https://arstechnica.com/information-technology/2021/07/come-talk-with-us-about-machine-learning-experiments-gone-right-and-wrong/', urlToImage='https://cdn.arstechnica.net/wp-content/uploads/2021/07/Machine-Learning-Evite-760x380.jpg')

    db.session.add(article1)
    db.session.add(article2)
    db.session.add(article3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the articles table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_saved_articles():
    db.session.execute('TRUNCATE "Saved Article" RESTART IDENTITY CASCADE;')
    db.session.commit()
