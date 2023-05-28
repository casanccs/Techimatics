# Steps to Run
1. Enter "backend" directory and install requirements in a virtual environment using:  
    $ pip install -r requirements.txt
2. Run backend by using:  
    $ python manage.py runserver
3. Run frontend by creating a NEW terminal and installing dependencies then running:  
    $ npm install --force  
    $ npm start

# How to use
1. Create an account, which will make you a "Customer".
2. "Customer"s become "Staff" through the admin panel.
3. "Staff" can create groups.
4. Click on a group to request to be put in, it will turn blue. Click again to cancel the request.
5. If accepted into a group, it will turn green. Click to enter.
6. If rejected into a group, it will turn red. Click to cancel request and attempt a re-entry.
7. Both Staff and Customers can message in chats that they are in.
8. Customers can add credit to their account to be in a class by purchasing in the "Account" Tab, which takes them to a Stripe checkout page.