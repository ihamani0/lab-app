
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserInfo() {
  return (
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {/* {getInitials(user.name)} */}
                    Test
                </AvatarFallback>
        </Avatar>
  )
}
export default UserInfo
