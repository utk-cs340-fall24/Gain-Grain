import Link from 'next/link';

export default function Login() {
  return (
    <html lang="en">
        <head>
            <meta charset="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <title>Grain & Grain Login</title>
            <link rel="stylesheet" href="../css/login-style.css"></link>
        </head>
    
        <div id="alert-container" class="alert hidden">
            <span id="alert-message"></span>
            <button id="alert-close">x</button>
        </div>
    
        <div class="wrapper">
            <form class="login">
            <p class="title">Log in</p>
            <input type="text" class="username" placeholder="Username" autofocus required />
            <i class="fa fa-user"></i>
            <input type="password" class="password" placeholder="Password" required />
            <i class="fa fa-key"></i>
            <a href="#">Forgot your password?</a>
            <button id="login">
                <i class="spinner"></i>
                <span class="state">Log in</span>
            </button>
            </form>
        </div>
    
      <script src="login.js"></script>
    </html>
  );
}