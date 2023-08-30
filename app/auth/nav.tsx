import Link from "next/link"
import {  getServerSession  } from "next-auth/next"
import Login from "./login"
import Logged from "./Logout"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function Nav () {
    const session = await getServerSession(authOptions)

    return (
        <nav className="flex justify-between items-center py-8 ">
          <Link href={"/"}>
            <h1 className="font-bold text-lg">SendIt.</h1>
          </Link>
          <ul className="flex items-center gap-6"></ul>
          {!session?.user && <Login />}
          {session?.user && <Logged image={session.user.image || ""} />}
        </nav>
      )
    }