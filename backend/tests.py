from django.test import LiveServerTestCase, Client
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from django.urls import reverse
import json
from techi.models import *


class ModelTests(LiveServerTestCase):
    port = 8000

    def testNumGroups(self):
        driver = webdriver.Chrome()
        driver.get('http://localhost:3000/groups')
        n = Group.objects.all().count()
        print("There are",n,"groups")
        time.sleep(10)

    def testLogin(self):
        driver = webdriver.Chrome()
        driver.get('http://localhost:3000/login')
        user = User.objects.create_user(username='testuser',password='asdfasdf')
        profile = Profile.objects.create(user=user)
        user.save()
        profile.save()
        print(Profile.objects.all().count())
        driver.implicitly_wait(2)
        username = driver.find_element(By.CLASS_NAME, "username")
        password = driver.find_element(By.CLASS_NAME, "password")
        submit = driver.find_element(By.CLASS_NAME, "submit")
        username.send_keys('testuser')
        password.send_keys('asdfasdf')
        time.sleep(2)
        submit.click()
        #MUST WAIT
        time.sleep(4)

    def testProfileCreation(self): #No wonder...There is no database data
        driver = webdriver.Chrome()

        driver.get('http://localhost:3000/createProfile')
        driver.implicitly_wait(2)
        username = driver.find_element(By.CLASS_NAME, "username")
        password = driver.find_element(By.CLASS_NAME, "password")
        submit = driver.find_element(By.CLASS_NAME, "submit")
        username.send_keys('testuser')
        password.send_keys('asdfasdf')
        time.sleep(2)
        submit.click()
        #MUST WAIT
        time.sleep(4)
        #This will then take the user to the group list page
        assert 'Logout' in driver.page_source


    def testGroupCreation(self):
        driver = webdriver.Chrome()
        driver.get('http://localhost:3000/login')
        user = User.objects.create_user(username='testuser',password='asdfasdf')
        profile = Profile.objects.create(user=user, pType="Staff")
        user.save()
        profile.save()
        print(Profile.objects.all().count())
        driver.implicitly_wait(2)
        username = driver.find_element(By.CLASS_NAME, "username")
        password = driver.find_element(By.CLASS_NAME, "password")
        submit = driver.find_element(By.CLASS_NAME, "submit")
        username.send_keys('testuser')
        password.send_keys('asdfasdf')
        time.sleep(1)
        submit.click()
        #MUST WAIT
        time.sleep(3)
        cGroup = driver.find_element(By.ID, "cGroup")
        cGroup.click()
        driver.find_element(By.ID, "day").send_keys("Sunday")
        driver.find_element(By.ID, "startTime").send_keys("00:00:00")
        driver.find_element(By.ID, "endTime").send_keys("02:00:00")
        driver.find_element(By.ID, "level").send_keys("Python 20")
        driver.find_element(By.CLASS_NAME, "button").click()
        #At this point, a new Group should have been created
        time.sleep(2)
        new = Group.objects.filter(day="Sunday").filter(startTime="00:00:00").filter(endTime='02:00:00').get(level="Python 20")
        self.assertTrue(new)

class ViewTests(LiveServerTestCase):

    def testProfileCreation(self):
        client = Client()
        response = client.post(reverse('register'), {"user": "viewTest", "password": "asdfasdf"})
        self.assertEqual(response.status_code, 201) #201 is "CREATED"
