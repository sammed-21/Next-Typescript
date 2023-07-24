export default function UserProfile({ params }:any) {
    return (
        <div className="flex flex-col items-center  justify-center min-h-screen py-3 ">
            <h1>Profile</h1>
            <hr />
            <p>profile page</p>
            <span className="bg-red-300 text-black px-6">{params.id}</span>
        </div>
    )
}