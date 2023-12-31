'use client';
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { Lexend_Tera } from "next/font/google";



export default function Header(){

    const session = useSession();
    //console.log(session)
    console.log("Estado de la sesión:", session);
    const status =session?.status;
    const userData= session.data?.user;

    let userName =userData?.name || userData?.email;
    if(userName && userName.includes(' ')){
      userName = userName.split(' ')[0];

    }

    return(
        <header className='flex items-center justify-between'>
       
        <nav className="flex gap-8 items-center text-gray-400 font-semibold">
        <Link href={'/'} className="text-primary font-semibold text-2xl">
          ST PIZZA</Link>

          <Link href={'/'}>Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
         
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
      
      
        {status === 'authenticated' && (

          <>
          <Link href={'/profile'} className="whitespace-nowrap">
            Hello, {userName}</Link>
            <button 
        type="button" 
        onClick={() => {
            console.log("Intentando cerrar sesión...");
            signOut({ callbackUrl: '/' });
        }} 
        className="bg-primary rounded-full text-white px-8 py-2">
        Logout
    </button>
          
          </>
  
)}

          {status === 'unauthenticated' &&(
            <>
           <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
          </>
          )}
       

        </nav>
      </header>


    );
}

