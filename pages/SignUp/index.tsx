import type { NextPage } from 'next'
import Navbar from '../../components/navbar/navbar'
import Head from 'next/head'

const SignUp: NextPage = () => {
  return (
      <>
        <Head>
            <title> Sign Up</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>

          <div class="login">
			<h1>Login</h1>
			<form action="/auth" method="post">
				<label for="username">
					<!-- font awesome icon -->
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Username" id="username" required>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required>
				<input type="submit" value="Login">
			</form>
		</div>
      </>
  )
}

export default SignUp
