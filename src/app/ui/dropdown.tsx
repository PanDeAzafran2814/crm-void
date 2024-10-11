import { signOut } from "@/app/utils/logoutActions";

export default function MenuUser() {
  return (
    <div className="z-10 absolute top-[52px] right-[35px] divide-y divide-gray-100 rounded-lg shadow w-44 bg-PrimaryBg">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Users
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Logs
          </a>
        </li>
        <li>
          <a
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
                signOut();
            }}
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
}