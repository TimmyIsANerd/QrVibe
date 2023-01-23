export default function Card({ user }) {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-3 rounded-md border-2 border-primary text-secondary">
        <p>{user?.fullName}</p>
        <p>{user?.emailAddress}</p>
        <p>{user?.accountStatus}</p>
      </div>
    </div>
  )
}
