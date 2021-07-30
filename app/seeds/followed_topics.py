from app.models import db, FollowedTopics


# Adds a demo topics, you can add other topics here if you want
def seed_followed_topics():
    topic1 = FollowedTopics(
        userId=1, topicString='business')
    topic2 = FollowedTopics(
        userId=3, topicString='lakers+lebron+james')
    topic3 = FollowedTopics(
        userId=2, topicString='animals')
    topic4 = FollowedTopics(
        userId=2, topicString='bitcoin')
    topic5 = FollowedTopics(
        userId=2, topicString='tech+stocks')
    topic6 = FollowedTopics(
        userId=2, topicString='politics')

    db.session.add(topic1)
    db.session.add(topic2)
    db.session.add(topic3)
    db.session.add(topic4)
    db.session.add(topic5)
    db.session.add(topic6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the articles table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_followed_topics():
    db.session.execute('TRUNCATE "Followed Topics" RESTART IDENTITY CASCADE;')
    db.session.commit()
