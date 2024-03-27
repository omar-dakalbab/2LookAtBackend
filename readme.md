1. Create a Blog

Endpoint: POST /api/blogs
Request Body: { "title": "string", "content": "string", "author": "string" }
Description: Creates a new blog post.
Response: { "blog": { /_ Blog object _/ }, "message": "Blog created successfully", "status": "success" } 2. Get Blog by ID

Endpoint: GET /api/blogs/:id
Description: Retrieves a blog post by its ID.
Response: { "blog": { /_ Blog object _/ }, "message": "Blog retrieved successfully", "status": "success" } 3. Get All Blogs

Endpoint: GET /api/blogs
Description: Retrieves all blog posts.
Response: { "blogs": [ /* Array of Blog objects */ ], "message": "Blogs retrieved successfully", "status": "success" } 4. Update Blog

Endpoint: PUT /api/blogs/:id
Request Body: { "title": "string", "content": "string" }
Description: Updates an existing blog post.
Response: { "blog": { /_ Updated Blog object _/ }, "message": "Blog updated successfully", "status": "success" } 5. Delete Blog

Endpoint: DELETE /api/blogs/:id
Description: Deletes a blog post by its ID.
Response: { "blog": { /_ Deleted Blog object _/ }, "message": "Blog deleted successfully", "status": "success" }

2. Create a Category

Endpoint: POST /api/categories
Request Body: { "name": "string", "description": "string" }
Description: Creates a new category.
Response: { "category": { /_ Category object _/ }, "message": "Category created successfully", "status": "success" } 2. Get All Categories

Endpoint: GET /api/categories
Description: Retrieves all categories.
Response: { "categories": [ /* Array of Category objects */ ], "message": "Categories retrieved successfully", "status": "success" } 3. Update a Category

Endpoint: PUT /api/categories/:id
Request Body: { "name": "string", "description": "string" }
Description: Updates an existing category.
Response: { "category": { /_ Updated Category object _/ }, "message": "Category updated successfully", "status": "success" } 4. Delete a Category

Endpoint: DELETE /api/categories/:id
Description: Deletes a category by its ID.
Response: { "category": { /_ Deleted Category object _/ }, "message": "Category deleted successfully", "status": "success" }

3. Create a Gig

Endpoint: POST /api/gigs
Request Body: { "category": "string", "title": "string", "tags": ["string"], "description": "string", "deadline": "date", "addOns": ["string"], "startingFromPrice": "number", "gigImages": ["string"], "gigMainImage": "string" }
Description: Creates a new gig.
Response: { "gig": { /_ Gig object _/ }, "message": "Gig created successfully", "status": "success" } 2. Update a Gig

Endpoint: PUT /api/gigs/:id
Request Body: { "status": "string", "client": "string", "otherFields": "string" }
Description: Updates an existing gig.
Response: { "gig": { /_ Updated Gig object _/ }, "message": "Gig updated successfully", "status": "success" } 3. Get All Gigs

Endpoint: GET /api/gigs
Description: Retrieves all gigs.
Response: { "gigs": [ /* Array of Gig objects */ ], "message": "Gigs retrieved successfully", "status": "success" } 4. Get Gigs by Category

Endpoint: GET /api/gigs/categories
Description: Retrieves all gigs grouped by category.
Response: { "gigs": [ /* Array of Category objects with gigs */ ], "message": "Gigs retrieved successfully", "status": "success" } 5. Delete a Gig

Endpoint: DELETE /api/gigs/:id
Description: Deletes a gig by its ID.
Response: { "gig": { /_ Deleted Gig object _/ }, "message": "Gig deleted successfully", "status": "success" } 6. Pay for a Gig

Endpoint: POST /api/gigs/pay
Request Body: { "gigId": "string", "amount": "number" }
Description: Processes payment for a gig using Stripe.
Response: { "clientSecret": "string" }

4. Send a Message

Endpoint: POST /api/messages
Request Body: { "sender": "string", "receiver": "string", "content": "string" }
Description: Sends a message from a sender to a receiver.
Response: { "message": "Message sent successfully", "data": { /_ Message object _/ } } 2. Get Messages

Endpoint: GET /api/messages
Query Parameters: sender (optional), receiver (optional)
Description: Retrieves messages between specified sender and receiver.
Response: { "messages": [ /* Array of Message objects */ ], "message": "Messages retrieved successfully" } 3. Delete a Message

Endpoint: DELETE /api/messages/:id
Description: Deletes a message by its ID.
Response: { "message": "Message deleted successfully" }

5. Create an Offer

Endpoint: POST /api/offers
Request Body:
json
Copy code
{
"title": "string",
"offeredBy": "string",
"categories": ["string"],
"description": "string",
"pricing": "string",
"expirationDate": "date",
"discountPercentage": "number",
"price": "number",
"duration": "string",
"contact": "string"
}
Description: Creates a new offer. 2. Get All Offers

Endpoint: GET /api/offers
Description: Retrieves all offers. 3. Get Offers by Category

Endpoint: GET /api/offers/category
Description: Retrieves offers grouped by category. 4. Update an Offer

Endpoint: PUT /api/offers/:id
Request Body: Same as for creating an offer
Description: Updates an existing offer. 5. Delete an Offer

Endpoint: DELETE /api/offers/:id
Description: Deletes an offer by its ID.

6. USER AUTHENTICATION, PROFILE, SIGNUP

Endpoint: POST /api/auth/signup
Description: Creates a new user account. 2. Log In

Endpoint: POST /api/auth/login
Description: Logs in an existing user. 3. Add Payment Method

Endpoint: POST /api/auth/payment-method
Description: Adds a payment method to the user's account. 4. Edit Payment Method

Endpoint: PUT /api/auth/payment-method/:methodId
Description: Updates an existing payment method. 5. Delete Payment Method

Endpoint: DELETE /api/auth/payment-method/:methodId
Description: Deletes a payment method from the user's account. 6. Forgot Password

Endpoint: POST /api/auth/forgot-password
Description: Sends an email with instructions to reset the user's password. 7. Reset Password

Endpoint: POST /api/auth/reset-password/:token
Description: Resets the user's password using a valid reset token. 8. Get User Profile

Endpoint: GET /api/profile
Description: Retrieves the user's profile information. 9. Edit User Profile

Endpoint: PUT /api/profile
Description: Updates the user's profile information. 10. Delete User Profile

Endpoint: DELETE /api/profile
Description: Deletes the user's account and profile.



Everything is explained here, and you can also check the controllers to see what fields I'm requesting.

# 2LookAtBackend
