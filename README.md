# Bloglio

A full-featured blogging platform built with React 19 and Appwrite. Create, edit, publish, and manage blog posts with a rich text editor, image uploads, and user authentication — deployed on Vercel.

## ✨ Features

- **User Authentication** — Sign up, log in, and session persistence with Appwrite email/password auth
- **Rich Text Editor** — Write posts with TinyMCE (formatting, lists, links, images, tables, code blocks, and more)
- **Full CRUD** — Create, read, update, and delete blog posts
- **Featured Images** — Upload and manage post cover images via Appwrite Storage
- **Auto-Generated Slugs** — URL-friendly slugs with unique suffixes to prevent collisions
- **Post Visibility** — Toggle posts between active and inactive status
- **Author-Only Controls** — Edit and delete actions shown only to the post author
- **My Posts Dashboard** — Personalized view of all posts by the logged-in user
- **Protected Routes** — Auth-aware routing with automatic redirects
- **Dark Mode** — Full dark mode support out of the box
- **Responsive Design** — Mobile-friendly header with hamburger drawer, styled with Tailwind CSS v4

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit |
| Routing | React Router v8 |
| Forms | React Hook Form |
| Rich Text Editor | TinyMCE |
| Backend | Appwrite (Auth, TablesDB, Storage) |
| Deployment | Vercel |

## 📁 Project Structure

```text
Blog/
├── .gitignore
├── README.md
└── frontendBlog/
    ├── vercel.json
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx                        # Entry point & router config
        ├── App.jsx                         # Root layout & auth bootstrap
        ├── App.css                         # Global styles & .browser-css
        ├── index.css                       # Tailwind imports
        ├── assets/
        │   └── bloglioLogo.png             # App logo
        ├── components/
        │   ├── index.js                    # Barrel exports
        │   ├── authlayout/
        │   │   └── AuthLayout.jsx          # Route protection wrapper
        │   ├── button/
        │   │   └── Button.jsx              # Reusable button
        │   ├── container/
        │   │   └── Container.jsx           # Layout container (dark mode)
        │   ├── footer/
        │   │   └── Footer.jsx              # Site footer
        │   ├── header/
        │   │   └── Header.jsx              # Navbar with mobile drawer
        │   ├── input/
        │   │   └── Input.jsx               # Reusable text input
        │   ├── login/
        │   │   └── Login.jsx               # Login form
        │   ├── logo/
        │   │   └── Logo.jsx                # Bloglio logo
        │   ├── post-form/
        │   │   └── PostForm.jsx            # Create/edit post form
        │   ├── postcard/
        │   │   └── PostCard.jsx            # Post preview card
        │   ├── real-time-text-editor/
        │   │   └── RTE.jsx                 # TinyMCE editor wrapper
        │   ├── select/
        │   │   └── Select.jsx              # Reusable select dropdown
        │   └── signup/
        │       └── Signup.jsx              # Signup form
        ├── pages/
        │   ├── Home/
        │   │   ├── Home.jsx                # Conditional home router
        │   │   ├── LandingPage.jsx         # Marketing page (guests)
        │   │   └── AuthenticatedPage.jsx   # User dashboard (logged in)
        │   ├── AllPosts.jsx                # Browse all active posts
        │   ├── AddPost.jsx                 # Create a new post
        │   ├── EditPost.jsx                # Edit an existing post
        │   ├── Post.jsx                    # Single post reader
        │   ├── MyPosts.jsx                 # Posts by a specific user
        │   ├── Login.jsx                   # Login page
        │   └── SignUp.jsx                  # Signup page
        ├── services/
        │   ├── auth.js                     # Appwrite auth service
        │   ├── database.js                 # Appwrite TablesDB service
        │   └── storage.js                  # Appwrite Storage service
        ├── features/
        │   └── authSlice.js                # Redux auth slice
        ├── store/
        │   └── store.js                    # Redux store config
        └── conf/
            └── conf.js                     # Environment variable config
```

## 🗺️ Routes

| Path | Page | Auth | Description |
|---|---|---|---|
| `/` | Home | Public | Landing page for guests, dashboard for logged-in users |
| `/get-started` | SignUp | Guest only | User registration |
| `/login` | Login | Guest only | User sign in |
| `/all-posts` | AllPosts | Required | Browse all active posts |
| `/add-post` | AddPost | Required | Create a new blog post |
| `/edit-post/:slug` | EditPost | Required | Edit an existing post |
| `/post/:slug` | Post | Required | Read a single blog post |
| `/my-posts/:slug` | MyPosts | Required | View all posts by a user |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [Appwrite](https://appwrite.io/) project with:
  - Email/password authentication enabled
  - A TablesDB table for blog posts
  - A storage bucket for featured images
- A [TinyMCE](https://www.tiny.cloud/) API key

### Installation

```bash
# Clone the repository
git clone https://github.com/archie1138/blog-app.git
cd blog-app/frontendBlog

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the `frontendBlog/` directory:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## 🌐 Deployment

The project includes a `vercel.json` configured for SPA routing. To deploy:

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/)
3. Set the **Root Directory** to `frontendBlog`
4. Add the environment variables listed above
5. Deploy

## 📄 License

This project is open source.