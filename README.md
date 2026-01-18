# UniTube

This project is mainly based optimized for dark view, light view is also optimized but may face small issues

# 🖥️ Frontend Overview

This project has a frontend application deployed and accessible here:
🔗 https://unitube.harishnigam.cloud/

Unitube is a YouTube-style video platform where users can:

- Sign up and log in
- View a feed of video posts
- Create and delete their own channels
- Create, update, and delete their own posts
- Upload videos with thumbnails
- Like / dislike videos
- Subscribe to channels
- Comment and reply to comments
- Like / dislike comments

📌 Project setup
1.1 unzip file, go to project folder.
1.2 folder don't contain node modules, so just run,
npm install command
1.3 After successful installation start server using command
npm start

📌 How the Frontend Works

1. Authentication
   1.1 Users first register or log in.
   1.2 On successful login, the frontend stores a JWT token locally (e.g., in Local Storage or memory).
   1.3 Subsequent API requests send the token in the request header:
   1.4 Authorization: Bearer <token>
   1.5 Feed & Pagination
   1.6 The homepage shows a list of posts (videos).
   1.7 Feed uses cursor-based pagination.
   1.8 First load: /posts?limit=5
   1.9 Next loads: /posts?cursor=<timestamp>&limit=5
   1.10 This allows infinite scrolling without page numbers.

2. Channel Features
   2.1 Users can create a channel (with banner and picture images).
   2.2 Each channel has a unique handler like @mychannel.
   2.3 Channels display their posts and list of subscribers.
   2.4 Post Upload
   2.5 When uploading posts, the frontend uses multipart form data (file uploads).
   2.6 The API stores thumbnails and video files in the backend uploads/ folder, which frontend displays via its URLs.

3. Interactions
   3.1 Like / dislike buttons toggle reactions.
   3.2 Subscribing to channels shows user subscriptions.
   3.3 Comment sections show nested replies.
   3.4 Comments
   3.5 Comments are shown in a nested tree structure.
   3.6 Users can post comments and replies.
   3.7 Likes and dislikes are supported on comments too.

🧑‍💻 Frontend UI Expectations

1. Videos appear in a responsive feed.
2. Comment threads show replies nested under their parent comments.
3. Each action (like, dislike, subscribe, comment) updates the UI using optimistic UI patterns — displaying updates instantly, then syncing with the server.
   4.Cursor pagination should show a “load more” or auto-scroll to fetch more posts.

# 🖥️ Backend Overview

📌 Project setup
1.1 unzip file, go to project folder.
1.2 folder don't contain node modules, so just run,
npm install command
1.3 After successful installation start server using command
npm start
for development purpose : npm run dev

📌 Multer Uploads Note
NOTE : This project uses multer for file uploads (thumbnail, channelPicture, channelBanner, videoURL etc.).
All uploaded files are stored inside an uploads/ folder at the root of backend project.
⚠️ I am not including the uploads/ folder in this submission (to keep repo clean).
✅ If you want to see existing uploaded images/videos properly, download the uploads folder from here, and place it in your backend root like:
backend/uploads/
Folder name must be exactly: uploads

📌 API calls
NOTE : ID will be generated from mongoDB, so the routes that require ID, while testing you have to provide it after listing resources like GET all posts/channels/comments etc.
and token format at header => Authorization : Bearer <token>
Base URL (Live) : https://api.unitube.harishnigam.cloud/

------------------------------AUTH----------------------------------

1. Register new User
   method : POST
   route : /register
   live link : https://api.unitube.harishnigam.cloud/register
   requirement : body object should include firstname,middlename(optional),lastname,gender,dob,email,mobileno,password,cnfPassword

2. Log In User
   method : POST
   route : /login
   live link : https://api.unitube.harishnigam.cloud/login
   requirement : body object should include email,password

3. Forgot Password
   method : POST
   route : /forgot_password
   live link : https://api.unitube.harishnigam.cloud/forgot_password

4. Refresh Token
   method : GET
   route : /refresh
   live link : https://api.unitube.harishnigam.cloud/refresh

5. Logout
   method : GET
   route : /logout
   live link : https://api.unitube.harishnigam.cloud/logout

------------------------------CHANNEL----------------------------------

6. Get My Channels
   method : GET
   route : /my_channels
   live link : https://api.unitube.harishnigam.cloud/my_channels
   requirement : token at header with key name 'Authorization'

7. Get Channel by Handler
   method : GET
   route : /channel/:handler
   live link : https://api.unitube.harishnigam.cloud/channel/:handler
   requirement : token at header with key name 'Authorization'
   example : /channel/@mychannel

8. Create Channel
   method : POST
   route : /create_channel
   live link : https://api.unitube.harishnigam.cloud/create_channel
   requirement : token at header with key name 'Authorization'
   upload type : multipart/form-data
   required files : channelPicture (file), channelBanner (file)
   required body fields : channelName, channelHandler, description(optional)

9. Update Channel
   method : PATCH
   route : /update_channel/:id
   live link : https://api.unitube.harishnigam.cloud/update_channel/:id
   requirement : token at header with key name 'Authorization'
   note : send only fields you want to update (channelName, channelBanner, channelPicture, description)

10. Delete Channel
    method : DELETE
    route : /delete_channel/:id
    live link : https://api.unitube.harishnigam.cloud/delete_channel/:id
    requirement : token at header with key name 'Authorization'

11. Subscribe / Unsubscribe Channel (Toggle)
    method : PATCH
    route : /new_subscriber/:id
    live link : https://api.unitube.harishnigam.cloud/new_subscriber/:id
    requirement : token at header with key name 'Authorization'

12. Validate Channel Handler
    method : GET
    route : /validatehandler/:handler
    live link : https://api.unitube.harishnigam.cloud/validatehandler/:handler
    requirement : token at header with key name 'Authorization'

------------------------------POST----------------------------------

13. Create Post
    method : POST
    route : /create_post
    live link : https://api.unitube.harishnigam.cloud/create_post
    requirement : token at header with key name 'Authorization'
    upload type : multipart/form-data
    required files : thumbnail (file), videoURL (file)
    required body fields : channel_id,title,type,category,tags,description(optional),details(JSON string)

14. Get Post by ID
    method : GET
    route : /post/:id
    live link : https://api.unitube.harishnigam.cloud/post/:id
    requirement : token at header with key name 'Authorization'

15. Update Post
    method : PATCH
    route : /post/:id
    live link : https://api.unitube.harishnigam.cloud/post/:id
    requirement : token at header with key name 'Authorization'
    upload type : multipart/form-data (optional thumbnail)
    note : send only fields you want to update (category,tags,description,details,thumbnail)

16. Delete Post
    method : DELETE
    route : /post/:id
    live link : https://api.unitube.harishnigam.cloud/post/:id
    requirement : token at header with key name 'Authorization'

17. Get More Posts (Feed Pagination)
    method : GET
    route : /posts
    live link : https://api.unitube.harishnigam.cloud/posts
    requirement : token at header with key name 'Authorization'
    query params : cursor(optional), limit(optional, max 20)
    example : /posts?limit=10
    /posts?cursor=2025-01-01T00:00:00.000Z&limit=10

------------------------------POST INTERACTIONS----------------------------------

18. Like / Unlike Post (Toggle)
    method : PATCH
    route : /like/:id
    live link : https://api.unitube.harishnigam.cloud/like/:id
    requirement : token at header with key name 'Authorization'

19. Dislike / Undislike Post (Toggle)
    method : PATCH
    route : /dislike/:id
    live link : https://api.unitube.harishnigam.cloud/dislike/:id
    requirement : token at header with key name 'Authorization'

------------------------------COMMENTS----------------------------------

20. Get All Comments of a Post
    method : GET
    route : /comment/:id
    live link : https://api.unitube.harishnigam.cloud/comment/:id
    requirement : token at header with key name 'Authorization'
    note : here :id is post_id

21. Create Comment
    method : POST
    route : /comment/:id
    live link : https://api.unitube.harishnigam.cloud/comment/:id
    requirement : token at header with key name 'Authorization'
    body fields : commentText, parent_id(optional)
    note : here :id is post_id

22. Update Comment
    method : PATCH
    route : /comment/:id
    live link : https://api.unitube.harishnigam.cloud/comment/:id
    requirement : token at header with key name 'Authorization'

23. Delete Comment
    method : DELETE
    route : /comment/:id
    live link : https://api.unitube.harishnigam.cloud/comment/:id
    requirement : token at header with key name 'Authorization'

------------------------------COMMENT INTERACTIONS----------------------------------

24. Like / Unlike Comment (Toggle)
    method : PATCH
    route : /clike/:id
    live link : https://api.unitube.harishnigam.cloud/clike/:id
    requirement : token at header with key name 'Authorization'

25. Dislike / Undislike Comment (Toggle)
    method : PATCH
    route : /cdislike/:id
    live link : https://api.unitube.harishnigam.cloud/cdislike/:id
    requirement : token at header with key name 'Authorization'

# Some Changes I have done

📌 Clarification About “Username”

1. User authentication is implemented using Email + Password (standard industry approach).
2. For public identity (username-like feature), the project uses Channel Handler:
3. Example: @mychannel
4. It is unique and validated via: GET /validatehandler/:handler
5. Channel data can be fetched using: GET /channel/:handler
   So “username” is covered in the form of channelHandler, not as a separate user.username.

📌 Clarification About “fetch any information from that channel.”
I have implemented channel information fetching using GET /channel/:handler, which returns the channel’s public details such as name, handler, banner, picture, description, and subscriber count.

# TODO

1. Till Now all project requirement has been completed fully.
2. Each important route is protected as per project requirement, but in future I am going to unprotect route like get channel basic info, get posts and get detail post. So that guest user can able to use this app
3. Completion:
   3.1 as per requirement : 100%.
   3.2 as per App : 45 %
   3.2.1 Remaining
   a. Streaming post partially, changing quality of posts,speed.
   b. With the help of user search history, views, giving them recommend post, interest post.
   c. Currently working on algorithm for view updation that view only increment per user no duplicates and only increment when user watch 25% of post.

# Submission Link :

Live : https://unitube.harishnigam.cloud
Github :https://github.com/harishnigam21/UniTube

# My Learning on this Project
1. Mongoose Transaction
2. Mongoose Aggregation