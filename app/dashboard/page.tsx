import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/api/auth/signin');
    }
    
    return (
        <main className="bg-gray-800 min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome Back, {session?.user?.name}
                </h1>
                <p className="text-gray-600 mt-2">
                    Join the conversation and share your feelings with the group!
                </p>
                <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
                    Start Sharing
                </button>
            </div>
        </main>
    );
}
