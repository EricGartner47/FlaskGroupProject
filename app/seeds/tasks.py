from app.models import db, Task


def seed_tasks():
    milk = Task(
        name="Milk", notes="Remember the Milk", due_date="Dec 13 2021 07:15", list_id=1, user_id=1)
    eggs = Task(
        name="Eggs", notes="Remember the Eggs", due_date="Dec 13 2021 07:15", list_id=1, user_id=1)
    pasta = Task(
        name="Pasta", notes="Remember the Pasta", due_date="Dec 13 2021 07:15", list_id=1, user_id=1)
    sauce = Task(
        name="Sauce", notes="Remember the Sauce", due_date="Dec 13 2021 07:15", list_id=1, user_id=1)
    brother = Task(
        name="Brother", notes="Brother wants new work boots", due_date="Dec 20 2021 09:30", list_id=2, user_id=1)
    sister = Task(
        name="Sister", notes="Sister wants perfume", due_date="Dec 20 2021 09:30", list_id=2, user_id=1)
    mom = Task(
        name="Mom", notes="Mom wants an iPad", due_date="Dec 20 2021 09:30", list_id=2, user_id=1)
    dad = Task(
        name="Dad", notes="Dad wants a new power tool", due_date="Dec 20 2021 09:30", list_id=2, user_id=1)

    db.session.add(milk)
    db.session.add(eggs)
    db.session.add(pasta)
    db.session.add(sauce)
    db.session.add(brother)
    db.session.add(sister)
    db.session.add(mom)
    db.session.add(dad)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
