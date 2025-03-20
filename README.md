# Piazza Assignment (A2)

## User Authentication (login/register):
### REGISTER (with password hashed):
![register success](register.png)


`LOGIN (with auth-token sent back):`
![login success](login.png)


## CRUD Operations for Posts:


`Create a post (POST /posts) - requires authentication:`
![create a post success - shows body](create_post1.png)
![create a post success - shows headers](create_post2.png)


`Get all posts (GET /posts) - publicly available:`
![get all posts success- public](get_posts.png)


`Get a single post by ID (GET /posts/id) - publically available:`
![get single post success- public](get_post_id.png)


`Update a post (PUT /posts/:id) - only the post creator can update:`
![update post success - shows body](update_post1.png)
![update post success - shows headers](update_post2.png)


`Delete a post (DELETE /posts/:id) - only the post creator can delete:`
![delete post success - shows body](delete_post1.png)
![delete post success - shows headers](delete_post2.png)