# SweetGist
A Blogging API for Second Semester Exam Project.

### Requirements
1. Users should have a first_name, last_name, email, password, (you can add other
attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs
created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published
state
12. The owner of the blog should be able to get a list of their blogs.
a. The endpoint should be paginated
b. It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state,
read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged
in users should be paginated,
a. default it to 20 blogs per page.b. It should also be searchable by author, title and tags.
c. It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information(the
author) with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.
17. Write tests for all endpoints

###Technology 
A NodeJS runtime environment
NoSQL MongoDB database

### Setup
npm install - This will install the necessary dependencies needed for the application



pull this repo
update env with example.env
run npm run start:dev
Base URL
somehostsite.com
Models
User
field	data_type	constraints
id	string	required
username	string	required
firstname	string	optional
lastname	string	optional
email	string	optional
password	string	required
user_type	string	required, default: user, enum: ['user', 'admin']
Order
field	data_type	constraints
id	string	required
created_at	date	required
state	number	required,default:1
total_price	number	required
items	array	required
item.name	string	required
item.price	number	required
item.size	string	required, enum: ['m', 's', 'l']
item.quantity	number	required, enum: ['m', 's', 'l']
APIs
### Signup User
Route: /auth/signup
Method: POST
Body:
{
  "first_name": "John",
  "last_name": "Adeniran",
  "email": "jasolajohn@gmail.com",
  "password": "password"
 } 
Responses
Success -  It returns the user detail

Login User
Route: /auth/signin
Method: POST
Body:
{
  "email": "jasolajohn@gmail.com",
  "password": "password"
}
Responses
Success - it returns a token and the user

View Users
Route: /users
Method: GET
Header
Authorization: Bearer {token}

Responses
Success - It gets you an array of the User


Contributor - John Adeniran
