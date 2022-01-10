from app.models import db, List


def seed_lists():
    groceries = List(
        name="Groceries", user_id=1)
    presents = List(
        name="Christmas Presents", user_id=1)

    db.session.add(groceries)
    db.session.add(presents)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
