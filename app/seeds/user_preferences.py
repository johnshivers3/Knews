from app.models import db, UserPreferences


# Adds a demo preferences, you can add other preferences here if you want
def seed_user_preferences():
    preference1 = UserPreferences(
        userId=1, lang='en', country='us', defaultFeed='', theme='')
    preference2 = UserPreferences(
        userId=3, lang='en', country='us', defaultFeed='', theme='')
    preference3 = UserPreferences(
        userId=2, lang='es', country='us', defaultFeed='', theme='')

    db.session.add(preference1)
    db.session.add(preference2)
    db.session.add(preference3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the articles table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_user_preferences():
    db.session.execute('TRUNCATE "User Preferences" RESTART IDENTITY CASCADE;')
    db.session.commit()
