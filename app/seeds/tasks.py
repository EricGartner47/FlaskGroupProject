from app.models import db, Task


def seed_tasks():
    milk = Task(
        name="Buy Almond Milk", notes="Almond milk is on sale this week", due_date="Jan 20 2022", list_id=1, user_id=1)
    eggs = Task(
        name="Buy 2 dozen eggs", notes="Try to get organic eggs if available", due_date="Jan 20 2022", list_id=1, user_id=1)
    pasta = Task(
        name="Buy 4 boxes of Pasta", notes="Mom likes spaghetti but dad likes penne", due_date="Jan 20 2022", list_id=1, user_id=1)
    sauce = Task(
        name="Buy 3 jars of Pasta sauce", notes="Get one jar of white sauce, two jars of red sauce", due_date="Jan 20 2022", list_id=1, user_id=1)
    brother = Task(
        name="Boots for Brother", notes="He wears a size 11. He wants them in the color brown.", due_date="Apr 24 2022", list_id=2, user_id=1)
    sister = Task(
        name="Perfume for Sister", notes="I need to ask mom what kind of scent she likes. I got her the wrong kind last time", due_date="Jan 22 2022", list_id=2, user_id=1)
    mom = Task(
        name="iPad for Mom", notes="She doesn't know how to use an iPad so I'll need to show her. I think she wants the biggest screen available.", due_date="Oct 9 2022", list_id=2, user_id=1)
    dad = Task(
        name="Power tool for Dad", notes="I have a 20% off coupon from the hardware store that I can use. I think he wants a drill.", due_date="Dec 20 2022", list_id=2, user_id=1)
    lawn = Task(
        name="Mow the lawn", notes="I don't have to do this until the spring.", due_date="Mar 21 2022", list_id=3, user_id=1)
    trash = Task(
        name="Task out the trash", notes="The garbage gets collected on Wednesday.", due_date="Jan 19 2022", list_id=3, user_id=1)
    vacuum = Task(
        name="Vacuum the house", notes="Friends are coming over on Saturday, so I need to vacuum before then.", due_date="Jan 22 2022", list_id=3, user_id=1)
    laundry = Task(
        name="Do the laundry", notes="Our washer is broken, so we I need to go to the laundromat.", due_date="Jan 29 2022", list_id=3, user_id=1)
    bed = Task(
        name="Make my bed", due_date="Jan 17 2022", list_id=3, user_id=1)
    plants = Task(
        name="Water the plants", due_date="Jan 18 2022", list_id=3, user_id=1, completed=True, completed_date="Jan 17 2022")


    db.session.add(milk)
    db.session.add(eggs)
    db.session.add(pasta)
    db.session.add(sauce)
    db.session.add(brother)
    db.session.add(sister)
    db.session.add(mom)
    db.session.add(dad)
    db.session.add(lawn)
    db.session.add(trash)
    db.session.add(vacuum)
    db.session.add(laundry)
    db.session.add(bed)
    db.session.add(plants)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
